import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboard } from "./homeSlice";
import {
    Card,
    CardBody,
    Typography,
    Chip,
    Spinner,
    Button,
} from "@material-tailwind/react";
import {
    DocumentTextIcon,
    CalculatorIcon,
    CurrencyRupeeIcon,
    UsersIcon,
    ClockIcon,
    ExclamationCircleIcon,
    ArrowRightIcon,
    CalendarDaysIcon,
    BoltIcon
} from "@heroicons/react/24/solid";

// Helper function to get initials for avatars
const getInitials = (name) => {
    if (!name) return "U";
    return name.substring(0, 2).toUpperCase();
};

// Helper function to generate a consistent color based on name string
const getAvatarColor = (name) => {
    const colors = [
        "bg-blue-100 text-blue-700",
        "bg-indigo-100 text-indigo-700",
        "bg-purple-100 text-purple-700",
        "bg-pink-100 text-pink-700",
        "bg-emerald-100 text-emerald-700",
        "bg-orange-100 text-orange-700",
    ];
    if (!name) return colors[0];
    const charCode = name.charCodeAt(0) + (name.charCodeAt(1) || 0);
    return colors[charCode % colors.length];
};

export function Home() {
    const dispatch = useDispatch();
    const { dashboard, loading, error } = useSelector((state) => state.home);

    useEffect(() => {
        dispatch(getDashboard());
    }, [dispatch]);

    // Format current date
    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    });

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50/50">
                <Spinner className="h-12 w-12 text-indigo-600" />
                <Typography color="gray" className="mt-6 font-semibold animate-pulse text-lg">
                    Preparing your workspace...
                </Typography>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <Card className="w-full max-w-md bg-white border border-red-100 shadow-xl shadow-red-100/50 rounded-3xl">
                    <CardBody className="flex flex-col items-center text-center p-10">
                        <div className="p-4 bg-red-50 rounded-full mb-6">
                            <ExclamationCircleIcon className="h-12 w-12 text-red-500" />
                        </div>
                        <Typography variant="h4" color="blue-gray" className="mb-2">Oops! Something went wrong</Typography>
                        <Typography color="gray" className="mb-8 font-normal">{error.message || error}</Typography>
                        <Button 
                            color="gray" 
                            variant="outlined" 
                            className="w-full rounded-full" 
                            onClick={() => dispatch(getDashboard())}
                        >
                            Try Loading Again
                        </Button>
                    </CardBody>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] py-10 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto space-y-10">

                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <Typography variant="h2" color="blue-gray" className="font-black tracking-tight text-4xl mb-2">
                            Dashboard
                        </Typography>
                        <Typography color="gray" className="font-medium text-lg flex items-center gap-2">
                            Welcome back to Deenova Digital 
                            <span className="relative flex h-3 w-3 ml-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                        </Typography>
                    </div>
                    <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-full shadow-sm border border-gray-100">
                        <CalendarDaysIcon className="h-5 w-5 text-indigo-500" />
                        <Typography variant="small" className="font-semibold text-gray-700">
                            {currentDate}
                        </Typography>
                    </div>
                </div>

                {/* --- PENDING ACTION BANNER (Dark Mode Theme) --- */}
                <div className="bg-gray-900 rounded-3xl p-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 shadow-2xl shadow-gray-900/20 relative overflow-hidden">
                    {/* Abstract decorative shapes */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                    <div className="absolute bottom-0 right-64 w-48 h-48 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-y-1/2 pointer-events-none"></div>

                    <div className="flex items-start sm:items-center gap-5 relative z-10">
                        <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md text-white shrink-0">
                            <BoltIcon className="h-8 w-8 text-yellow-400" />
                        </div>
                        <div>
                            <Typography variant="h4" color="white" className="font-bold">Needs Attention</Typography>
                            <Typography color="white" className="opacity-80 font-medium mt-1">
                                You have pending items waiting for your review and approval.
                            </Typography>
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap lg:flex-nowrap gap-4 w-full lg:w-auto relative z-10">
                        <div className="bg-white/10 backdrop-blur-md px-5 py-4 rounded-2xl border border-white/10 flex items-center gap-4 flex-1 lg:flex-none justify-between transition-all hover:bg-white/20 cursor-pointer">
                            <Typography variant="small" className="font-semibold text-white">Requirements</Typography>
                            <Chip size="sm" className="bg-yellow-400 text-yellow-900" value={dashboard?.pending?.requirements || 0} />
                        </div>
                        <div className="bg-white/10 backdrop-blur-md px-5 py-4 rounded-2xl border border-white/10 flex items-center gap-4 flex-1 lg:flex-none justify-between transition-all hover:bg-white/20 cursor-pointer">
                            <Typography variant="small" className="font-semibold text-white">Estimates</Typography>
                            <Chip size="sm" className="bg-yellow-400 text-yellow-900" value={dashboard?.pending?.estimates || 0} />
                        </div>
                        <div className="bg-white/10 backdrop-blur-md px-5 py-4 rounded-2xl border border-white/10 flex items-center gap-4 flex-1 lg:flex-none justify-between transition-all hover:bg-white/20 cursor-pointer">
                            <Typography variant="small" className="font-semibold text-white">Payments</Typography>
                            <Chip size="sm" className="bg-yellow-400 text-yellow-900" value={dashboard?.pending?.payments || 0} />
                        </div>
                    </div>
                </div>

                {/* --- TOTAL COUNTS (Overview) --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { title: "Requirements", count: dashboard?.counts?.requirements, icon: DocumentTextIcon, color: "blue" },
                        { title: "Estimates", count: dashboard?.counts?.estimates, icon: CalculatorIcon, color: "indigo" },
                        { title: "Payments", count: dashboard?.counts?.payments, icon: CurrencyRupeeIcon, color: "emerald" },
                        { title: "Employees", count: dashboard?.counts?.employees, icon: UsersIcon, color: "purple" },
                    ].map((stat, index) => (
                        <Card key={index} className="shadow-sm border border-gray-100 rounded-3xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <CardBody className="p-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <Typography variant="small" className="font-bold text-gray-400 uppercase tracking-widest mb-2">
                                            {stat.title}
                                        </Typography>
                                        <Typography variant="h2" color="blue-gray" className="font-black">
                                            {stat.count || 0}
                                        </Typography>
                                    </div>
                                    <div className={`p-4 bg-${stat.color}-50 rounded-2xl text-${stat.color}-600`}>
                                        <stat.icon className="h-7 w-7" />
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </div>

                {/* --- RECENT ACTIVITY GRIDS --- */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    
                    {/* Recent Requirements */}
                    <Card className="shadow-sm border border-gray-100 rounded-3xl overflow-hidden flex flex-col h-full">
                        <div className="bg-white p-6 border-b border-gray-50 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600">
                                    <DocumentTextIcon className="h-5 w-5" />
                                </div>
                                <Typography variant="h5" color="blue-gray" className="font-bold">Recent Requirements</Typography>
                            </div>
                            <Button variant="text" size="sm" color="blue" className="flex items-center gap-2 rounded-full hidden sm:flex">
                                View All <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                            </Button>
                        </div>
                        <CardBody className="p-0 flex-1">
                            <div className="divide-y divide-gray-50">
                                {dashboard?.recent?.requirements?.map((item) => (
                                    <div key={item._id} className="p-5 hover:bg-gray-50 transition-colors flex justify-between items-center group cursor-pointer">
                                        <div className="flex items-center gap-5">
                                            <div className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-sm shadow-inner ${getAvatarColor(item.customerName)}`}>
                                                {getInitials(item.customerName)}
                                            </div>
                                            <div>
                                                <Typography color="blue-gray" className="font-bold text-base group-hover:text-blue-600 transition-colors">
                                                    {item.customerName}
                                                </Typography>
                                                <Typography variant="small" className="text-gray-500 font-medium">
                                                    {item.companyName}
                                                </Typography>
                                            </div>
                                        </div>
                                        <Chip variant="ghost" color="blue" size="sm" value="New" className="rounded-full" />
                                    </div>
                                ))}
                                {!dashboard?.recent?.requirements?.length && (
                                    <div className="p-12 text-center flex flex-col items-center">
                                        <DocumentTextIcon className="h-12 w-12 text-gray-200 mb-3" />
                                        <Typography color="gray" className="font-medium">No recent requirements found.</Typography>
                                    </div>
                                )}
                            </div>
                        </CardBody>
                    </Card>

                    {/* Recent Estimates */}
                    <Card className="shadow-sm border border-gray-100 rounded-3xl overflow-hidden flex flex-col h-full">
                        <div className="bg-white p-6 border-b border-gray-50 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="bg-indigo-50 p-2.5 rounded-xl text-indigo-600">
                                    <CalculatorIcon className="h-5 w-5" />
                                </div>
                                <Typography variant="h5" color="blue-gray" className="font-bold">Recent Estimates</Typography>
                            </div>
                            <Button variant="text" size="sm" color="indigo" className="flex items-center gap-2 rounded-full hidden sm:flex">
                                View All <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                            </Button>
                        </div>
                        <CardBody className="p-0 flex-1">
                            <div className="divide-y divide-gray-50">
                                {dashboard?.recent?.estimates?.map((item) => (
                                    <div key={item._id} className="p-5 hover:bg-gray-50 transition-colors flex justify-between items-center group cursor-pointer">
                                        <div className="flex items-center gap-5">
                                            <div className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-sm shadow-inner ${getAvatarColor(item.customerName)}`}>
                                                {getInitials(item.customerName)}
                                            </div>
                                            <div>
                                                <Typography color="blue-gray" className="font-bold text-base group-hover:text-indigo-600 transition-colors">
                                                    {item.customerName}
                                                </Typography>
                                                <Typography variant="small" className="text-gray-500 font-medium">
                                                    Estimate Generated
                                                </Typography>
                                            </div>
                                        </div>
                                        <div className="text-right bg-gray-50 group-hover:bg-white px-4 py-2 rounded-xl border border-gray-100 transition-colors">
                                            <Typography color="blue-gray" className="font-bold">
                                                ₹ {item.grandTotal?.toLocaleString()}
                                            </Typography>
                                        </div>
                                    </div>
                                ))}
                                {!dashboard?.recent?.estimates?.length && (
                                    <div className="p-12 text-center flex flex-col items-center">
                                        <CalculatorIcon className="h-12 w-12 text-gray-200 mb-3" />
                                        <Typography color="gray" className="font-medium">No recent estimates found.</Typography>
                                    </div>
                                )}
                            </div>
                        </CardBody>
                    </Card>

                </div>
            </div>
        </div>
    );
}