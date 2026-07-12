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
    ExclamationCircleIcon,
    CalendarDaysIcon,
    ChartBarIcon,
    CheckCircleIcon,
    ClockIcon
} from "@heroicons/react/24/solid";

// Helper function to get initials for avatars
const getInitials = (name) => {
    if (!name) return "NA";
    return name.substring(0, 2).toUpperCase();
};

// Vibrant color palette for avatars
const getAvatarColor = (name) => {
    const colors = [
        "bg-blue-100 text-blue-700 border-blue-200",
        "bg-purple-100 text-purple-700 border-purple-200",
        "bg-pink-100 text-pink-700 border-pink-200",
        "bg-emerald-100 text-emerald-700 border-emerald-200",
        "bg-orange-100 text-orange-700 border-orange-200",
        "bg-cyan-100 text-cyan-700 border-cyan-200",
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
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <div className="relative">
                    <div className="absolute inset-0 rounded-full blur-xl bg-gradient-to-r from-blue-400 to-purple-500 opacity-50 animate-pulse"></div>
                    <Spinner className="h-12 w-12 text-blue-600 relative z-10 mb-4" />
                </div>
                <Typography color="blue-gray" className="font-bold text-lg animate-bounce mt-4">
                    Sparking up your workspace...
                </Typography>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <Card className="w-full max-w-md bg-white shadow-2xl shadow-red-500/20 rounded-3xl border-0">
                    <CardBody className="flex flex-col items-center text-center p-8">
                        <div className="p-4 bg-gradient-to-br from-red-400 to-red-600 rounded-full mb-4 shadow-lg shadow-red-500/40 animate-bounce">
                            <ExclamationCircleIcon className="h-10 w-10 text-white" />
                        </div>
                        <Typography variant="h4" color="blue-gray" className="mb-2 font-black">Oops! Connection Lost</Typography>
                        <Typography className="mb-6 font-medium text-gray-500">{error.message || error}</Typography>
                        <Button 
                            color="red" 
                            variant="gradient"
                            className="w-full rounded-xl shadow-md hover:shadow-lg hover:shadow-red-500/40 transition-all" 
                            onClick={() => dispatch(getDashboard())}
                        >
                            Try Again
                        </Button>
                    </CardBody>
                </Card>
            </div>
        );
    }

    return (
        <>
            {/* CSS for custom animations */}
            <style>
                {`
                    @keyframes float {
                        0%, 100% { transform: translateY(0) scale(1); }
                        50% { transform: translateY(-20px) scale(1.05); }
                    }
                    @keyframes gradientX {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                    .animate-float-slow { animation: float 8s ease-in-out infinite; }
                    .animate-float-fast { animation: float 5s ease-in-out infinite; }
                    .bg-animated-gradient {
                        background-size: 200% 200%;
                        animation: gradientX 10s ease infinite;
                    }
                `}
            </style>

            <div className="relative min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden">
                
                {/* Floating Colorful Orbs Background */}
                <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-purple-400/20 rounded-full mix-blend-multiply filter blur-[100px] animate-float-slow pointer-events-none"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[35rem] h-[35rem] bg-blue-400/20 rounded-full mix-blend-multiply filter blur-[100px] animate-float-fast pointer-events-none" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-[40%] left-[20%] w-[25rem] h-[25rem] bg-pink-400/10 rounded-full mix-blend-multiply filter blur-[80px] animate-float-slow pointer-events-none" style={{ animationDelay: '1s' }}></div>

                <div className="relative z-10 max-w-7xl mx-auto space-y-10">

                    {/* --- HEADER --- */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-2">
                        <div className="group cursor-default">
                            <Typography variant="h2" className="font-black tracking-tight mb-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-600 to-pink-600 transition-all duration-500">
                                Dashboard
                            </Typography>
                            <Typography className="text-sm font-bold text-gray-500 flex items-center gap-2 group-hover:text-gray-700 transition-colors">
                                Deenova Digital Workspace
                                <span className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-400 to-emerald-500 text-white px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm shadow-emerald-500/30">
                                    <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping"></span>
                                    Live
                                </span>
                            </Typography>
                        </div>
                        <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-sm border border-white/40 hover:shadow-md transition-shadow">
                            <div className="p-1.5 bg-blue-50 rounded-lg">
                                <CalendarDaysIcon className="h-5 w-5 text-blue-600" />
                            </div>
                            <Typography className="text-sm font-extrabold text-gray-700">
                                {currentDate}
                            </Typography>
                        </div>
                    </div>

                    {/* --- COLORFUL ACTION BANNER --- */}
                    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-animated-gradient rounded-[2rem] p-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 shadow-xl shadow-purple-500/20 relative overflow-hidden text-white">
                        
                        {/* Decorative internal rings */}
                        <div className="absolute -top-24 -right-24 w-64 h-64 border-[30px] border-white/10 rounded-full pointer-events-none"></div>
                        <div className="absolute -bottom-24 -left-12 w-48 h-48 border-[20px] border-white/10 rounded-full pointer-events-none"></div>

                        <div className="flex items-center gap-5 relative z-10">
                            <div className="p-3.5 bg-white/20 backdrop-blur-md rounded-2xl shadow-inner border border-white/30">
                                <ClockIcon className="h-8 w-8 text-white animate-[spin_4s_linear_infinite]" />
                            </div>
                            <div>
                                <Typography variant="h4" className="font-black drop-shadow-md">Requires Attention</Typography>
                                <Typography className="text-sm text-white/90 font-medium mt-1">
                                    Keep the workflow moving! Review your pending items below.
                                </Typography>
                            </div>
                        </div>
                        
                        <div className="flex flex-wrap lg:flex-nowrap gap-4 w-full lg:w-auto relative z-10">
                            {[
                                { label: "Requirements", count: dashboard?.pending?.requirements || 0 },
                                { label: "Estimates", count: dashboard?.pending?.estimates || 0 },
                                { label: "Payments", count: dashboard?.pending?.payments || 0 },
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white/10 backdrop-blur-lg border border-white/30 px-5 py-3 rounded-2xl flex items-center gap-4 flex-1 lg:flex-none justify-between hover:bg-white/20 hover:scale-105 transition-all cursor-pointer shadow-lg">
                                    <Typography className="text-sm font-bold text-white tracking-wide">{item.label}</Typography>
                                    <Chip 
                                        size="sm" 
                                        className={`${item.count > 0 ? 'bg-white text-purple-700 shadow-md' : 'bg-white/30 text-white'} rounded-lg px-2.5 py-1 font-black`} 
                                        value={item.count} 
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* --- ANIMATED STAT CARDS --- */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Requirements", count: dashboard?.counts?.requirements, icon: DocumentTextIcon, color: "blue", bg: "from-blue-400 to-blue-600" },
                            { title: "Estimates", count: dashboard?.counts?.estimates, icon: CalculatorIcon, color: "purple", bg: "from-purple-400 to-purple-600" },
                            { title: "Payments", count: dashboard?.counts?.payments, icon: CurrencyRupeeIcon, color: "emerald", bg: "from-emerald-400 to-emerald-600" },
                            { title: "Employees", count: dashboard?.counts?.employees, icon: UsersIcon, color: "orange", bg: "from-orange-400 to-orange-600" },
                        ].map((stat, index) => (
                            <Card key={index} className={`bg-white/80 backdrop-blur-xl shadow-lg border border-white hover:-translate-y-2 hover:shadow-2xl hover:shadow-${stat.color}-500/20 transition-all duration-300 rounded-[2rem] overflow-hidden group`}>
                                <CardBody className="p-6 relative">
                                    {/* Subtle hover background glow */}
                                    <div className={`absolute top-0 right-0 w-32 h-32 bg-${stat.color}-400/10 rounded-full blur-2xl -mr-10 -mt-10 transition-opacity opacity-0 group-hover:opacity-100`}></div>
                                    
                                    <div className="flex justify-between items-start mb-6 relative z-10">
                                        <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${stat.bg} shadow-lg shadow-${stat.color}-500/40 text-white group-hover:scale-110 transition-transform duration-300`}>
                                            <stat.icon className="h-6 w-6" />
                                        </div>
                                        <ChartBarIcon className="h-5 w-5 text-gray-300 group-hover:text-gray-400 transition-colors" />
                                    </div>
                                    <div className="relative z-10">
                                        <Typography className="text-3xl font-black text-gray-800 mb-1">
                                            {stat.count || 0}
                                        </Typography>
                                        <Typography className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                            Total {stat.title}
                                        </Typography>
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                    </div>

                    {/* --- DATA LISTS (Recent Activity) --- */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        
                        {/* Recent Requirements */}
                        <Card className="bg-white/80 backdrop-blur-xl shadow-xl shadow-blue-900/5 border border-white rounded-[2rem] overflow-hidden flex flex-col h-full">
                            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-blue-50/50 to-transparent">
                                <Typography variant="h6" color="blue-gray" className="font-extrabold flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
                                        <DocumentTextIcon className="h-5 w-5" />
                                    </div>
                                    New Requirements
                                </Typography>
                                <Button variant="text" size="sm" color="blue" className="text-xs font-bold capitalize p-2 rounded-xl hover:bg-blue-50 group">
                                    View All <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
                                </Button>
                            </div>
                            <CardBody className="p-0 flex-1">
                                <div className="divide-y divide-gray-50/50">
                                    {dashboard?.recent?.requirements?.map((item, i) => (
                                        <div key={item._id} className="p-4 px-6 hover:bg-blue-50/50 hover:pl-8 transition-all duration-300 flex justify-between items-center group cursor-pointer" style={{ animationDelay: `${i * 100}ms` }}>
                                            <div className="flex items-center gap-4">
                                                <div className={`h-11 w-11 rounded-2xl flex items-center justify-center font-bold text-sm border-2 shadow-sm group-hover:rotate-6 transition-transform ${getAvatarColor(item.customerName)}`}>
                                                    {getInitials(item.customerName)}
                                                </div>
                                                <div>
                                                    <Typography color="blue-gray" className="font-extrabold text-sm group-hover:text-blue-600 transition-colors">
                                                        {item.customerName}
                                                    </Typography>
                                                    <Typography className="text-xs text-gray-500 font-semibold">
                                                        {item.companyName}
                                                    </Typography>
                                                </div>
                                            </div>
                                            <Chip variant="ghost" color="blue" size="sm" value="Review" className="rounded-lg px-3 font-bold opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    ))}
                                    {!dashboard?.recent?.requirements?.length && (
                                        <div className="p-12 text-center flex flex-col items-center opacity-60">
                                            <DocumentTextIcon className="h-12 w-12 text-gray-300 mb-2" />
                                            <Typography className="text-sm font-bold text-gray-400">No new requirements found.</Typography>
                                        </div>
                                    )}
                                </div>
                            </CardBody>
                        </Card>

                        {/* Recent Estimates */}
                        <Card className="bg-white/80 backdrop-blur-xl shadow-xl shadow-purple-900/5 border border-white rounded-[2rem] overflow-hidden flex flex-col h-full">
                            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-purple-50/50 to-transparent">
                                <Typography variant="h6" color="blue-gray" className="font-extrabold flex items-center gap-3">
                                    <div className="p-2 bg-purple-100 text-purple-600 rounded-xl">
                                        <CalculatorIcon className="h-5 w-5" />
                                    </div>
                                    Recent Estimates
                                </Typography>
                                <Button variant="text" size="sm" color="purple" className="text-xs font-bold capitalize p-2 rounded-xl hover:bg-purple-50 group">
                                    View All <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
                                </Button>
                            </div>
                            <CardBody className="p-0 flex-1">
                                <div className="divide-y divide-gray-50/50">
                                    {dashboard?.recent?.estimates?.map((item) => (
                                        <div key={item._id} className="p-4 px-6 hover:bg-purple-50/50 hover:pl-8 transition-all duration-300 flex justify-between items-center group cursor-pointer">
                                            <div className="flex items-center gap-4">
                                                <div className={`h-11 w-11 rounded-2xl flex items-center justify-center font-bold text-sm border-2 shadow-sm group-hover:rotate-6 transition-transform ${getAvatarColor(item.customerName)}`}>
                                                    {getInitials(item.customerName)}
                                                </div>
                                                <div>
                                                    <Typography color="blue-gray" className="font-extrabold text-sm group-hover:text-purple-600 transition-colors">
                                                        {item.customerName}
                                                    </Typography>
                                                    <Typography className="text-xs text-gray-500 font-semibold">
                                                        Estimate Generated
                                                    </Typography>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <Typography color="purple" className="font-black text-sm bg-white px-3 py-1 rounded-lg border border-purple-100 shadow-sm">
                                                    ₹{item.grandTotal?.toLocaleString()}
                                                </Typography>
                                            </div>
                                        </div>
                                    ))}
                                    {!dashboard?.recent?.estimates?.length && (
                                        <div className="p-12 text-center flex flex-col items-center opacity-60">
                                            <CalculatorIcon className="h-12 w-12 text-gray-300 mb-2" />
                                            <Typography className="text-sm font-bold text-gray-400">No recent estimates generated.</Typography>
                                        </div>
                                    )}
                                </div>
                            </CardBody>
                        </Card>

                    </div>
                </div>
            </div>
        </>
    );
}