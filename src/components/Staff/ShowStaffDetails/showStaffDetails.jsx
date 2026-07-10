import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Typography, Spinner, Input, Select, Option, Dialog, DialogHeader, DialogBody, DialogFooter, Button, IconButton } from "@material-tailwind/react";
import { deleteStaff, getAllStaff, getStaffById, updateStaff } from "../StaffEntry/staffEntrySlice";
import { useNavigate } from "react-router-dom";

export function ShowStaffDetails() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { staffList, selectedStaff, loading } = useSelector(
        (state) => state.staffEntry
    );

    const [editStaff, setEditStaff] = useState(null);

    useEffect(() => {
        if (selectedStaff) {
            setEditStaff(selectedStaff);
        }
    }, [selectedStaff]);
    const [open, setOpen] = useState(false);

    // Filter States
    const [searchTerm, setSearchTerm] = useState("");
    const [deptFilter, setDeptFilter] = useState("ALL");
    const [roleFilter, setRoleFilter] = useState("ALL");
    const [typeFilter, setTypeFilter] = useState("ALL");

    useEffect(() => {
        dispatch(getAllStaff());
    }, [dispatch]);

    // Computed Filter Logic
    const filteredStaff = staffList.filter((staff) => {
        const matchesSearch =
            `${staff.firstName || ""} ${staff.lastName || ""}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (staff.staffId || "").toLowerCase().includes(searchTerm.toLowerCase());

        const matchesDept = deptFilter === "ALL" || staff.department?.toUpperCase() === deptFilter.toUpperCase();
        const matchesRole = roleFilter === "ALL" || staff.role?.toUpperCase() === roleFilter.toUpperCase();
        const matchesType = typeFilter === "ALL" || staff.employeeType?.toUpperCase() === typeFilter.toUpperCase();

        return matchesSearch && matchesDept && matchesRole && matchesType;
    });

    const handleOpen = async (staffId) => {
        const result = await dispatch(getStaffById(staffId));

        if (getStaffById.fulfilled.match(result)) {
            setOpen(true);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
                <Spinner className="h-10 w-10 text-blue-500" />
                <Typography color="gray" className="font-medium animate-pulse">
                    Retrieving staff directory...
                </Typography>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 animate-fade-in">

            {/* Header Section with Integrated Back Navigation */}
            <div className="mb-8 pb-4 border-b border-gray-100">
                <button
                    type="button"
                    onClick={() => navigate("/staff")}
                    className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors mb-2 group"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    Back to Management
                </button>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <Typography variant="h2" color="blue-gray" className="font-black tracking-tight text-3xl md:text-4xl">
                            Staff Directory
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal text-gray-500 text-base">
                            View, monitor, and manage active records for all registered company personnel.
                        </Typography>
                    </div>
                </div>
            </div>

            {/* Filter Control Center */}
            <div className="bg-white p-5 border border-gray-100 rounded-2xl shadow-sm mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
                <div>
                    <Input
                        label="Search Name or ID"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div>
                    <Select label="Filter Department" value={deptFilter} onChange={(val) => setDeptFilter(val || "ALL")}>
                        <Option value="ALL">All Departments</Option>
                        <Option value="DEVELOPMENT">Development</Option>
                        <Option value="HR">HR</Option>
                        <Option value="SALES">Sales</Option>
                        <Option value="SUPPORT">Support</Option>
                    </Select>
                </div>
                <div>
                    <Select label="Filter Role" value={roleFilter} onChange={(val) => setRoleFilter(val || "ALL")}>
                        <Option value="ALL">All Roles</Option>
                        <Option value="EMPLOYEE">Employee</Option>
                        <Option value="FRONT END DEVELOPER">Front End Developer</Option>
                        <Option value="BACKEND DEVELOPER">Backend Developer</Option>
                        <Option value="ANDROID DEVELOPER">Android Developer</Option>
                        <Option value="CLOUD DEVELOPER">Cloud Developer</Option>
                    </Select>
                </div>
                <div>
                    <Select label="Employee Type" value={typeFilter} onChange={(val) => setTypeFilter(val || "ALL")}>
                        <Option value="ALL">All Status Types</Option>
                        <Option value="PERMANENT">Permanent</Option>
                        <Option value="CONTRACT">Contract</Option>
                        <Option value="INTERN">Intern</Option>
                    </Select>
                </div>
            </div>

            {/* Table Container Card */}
            <Card className="h-full w-full overflow-hidden shadow-xl border border-gray-100 rounded-2xl bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-max table-auto text-left">

                        {/* Table Header */}
                        <thead className="bg-gray-50/80 border-b border-gray-100">
                            <tr>
                                {["Staff ID", "Name", "Contact Details", "Work Profile", "Location & Type", "Status", "Action"].map((head) => (
                                    <th key={head} className="p-4 lg:p-5">
                                        <Typography variant="small" color="blue-gray" className="font-bold leading-none opacity-80">
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody className="divide-y divide-gray-50">
                            {filteredStaff.length > 0 ? (
                                filteredStaff.map((staff) => {
                                    const isTemplateActive = staff.status?.toLowerCase() === "active";

                                    return (
                                        <tr key={staff._id} className="hover:bg-gray-50/70 transition-colors duration-200">

                                            {/* Staff ID */}
                                            <td className="p-4 lg:p-5">
                                                <Typography
                                                    variant="small"
                                                    className="font-mono font-bold text-blue-600 bg-blue-50/50 hover:bg-blue-100 px-2 py-1 rounded-md inline-block cursor-pointer transition-colors"
                                                    onClick={() => handleOpen(staff.staffId)}
                                                >
                                                    {staff.staffId}
                                                </Typography>
                                            </td>

                                            {/* Name */}
                                            <td className="p-4 lg:p-5">
                                                <Typography variant="small" color="blue-gray" className="font-bold uppercase">
                                                    {staff.firstName} {staff.lastName}
                                                </Typography>
                                            </td>

                                            {/* Contact Details Grouped */}
                                            <td className="p-4 lg:p-5">
                                                <div className="flex flex-col">
                                                    <Typography variant="small" color="blue-gray" className="font-medium break-all">
                                                        {staff.email || "—"}
                                                    </Typography>
                                                    <Typography variant="small" className="text-gray-400 text-xs mt-0.5">
                                                        {staff.mobile || "—"}
                                                    </Typography>
                                                </div>
                                            </td>

                                            {/* Work Profile (Dept / Desg / Role Combined) */}
                                            <td className="p-4 lg:p-5">
                                                <div className="flex flex-col">
                                                    <Typography variant="small" color="blue-gray" className="font-bold uppercase">
                                                        {staff.department || "—"}
                                                    </Typography>
                                                    <Typography variant="small" className="text-gray-600 text-xs mt-0.5 uppercase">
                                                        {staff.designation || "—"} ({staff.role || "—"})
                                                    </Typography>
                                                </div>
                                            </td>

                                            {/* Location & Employment Type Grouped */}
                                            <td className="p-4 lg:p-5">
                                                <div className="flex flex-col">
                                                    <Typography variant="small" color="blue-gray" className="font-normal uppercase">
                                                        {staff.workLocation || "—"}
                                                    </Typography>
                                                    <Typography variant="small" className="text-blue-500 font-medium text-xs mt-0.5 uppercase">
                                                        {staff.employeeType || "—"}
                                                    </Typography>
                                                </div>
                                            </td>

                                            {/* Status Badge */}
                                            <td className="p-4 lg:p-5">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase ${isTemplateActive
                                                    ? "bg-green-50 text-green-700 border border-green-100"
                                                    : "bg-gray-50 text-gray-600 border border-gray-200"
                                                    }`}>
                                                    <span className={`h-1.5 w-1.5 rounded-full ${isTemplateActive ? "bg-green-600" : "bg-gray-400"}`} />
                                                    {staff.status || "Inactive"}
                                                </span>
                                            </td>

                                            {/* Action Delete Button */}
                                            <td className="p-4 lg:p-5">
                                                <IconButton
                                                    color="red"
                                                    variant="text"
                                                    className="rounded-lg"
                                                    onClick={() => {
                                                        if (window.confirm("Delete this staff?")) {
                                                            dispatch(deleteStaff(staff.staffId));
                                                            setOpen(false);
                                                        }
                                                    }}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                    </svg>
                                                </IconButton>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                /* Empty Filter Table State Fallback */
                                <tr>
                                    <td colSpan={7} className="p-16 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-400 gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 opacity-60">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                            <Typography variant="h6" color="blue-gray" className="mt-2 font-bold">
                                                No Matching Records
                                            </Typography>
                                            <Typography variant="small" className="text-gray-400">
                                                Try adjusting your filter settings or search terms.
                                            </Typography>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>
            </Card>

            {/* Premium Staff Profile Update Modal/Dialog */}
            <Dialog
                open={open}
                handler={() => setOpen(false)}
                size="md"
                className="rounded-2xl overflow-hidden"
            >
                <DialogHeader className="border-b border-gray-100 px-6 py-4">
                    <div className="flex flex-col">
                        <Typography variant="h4" color="blue-gray" className="font-bold tracking-tight">
                            Staff Details
                        </Typography>
                        <Typography variant="small" color="gray" className="font-normal mt-0.5">
                            Modify primary communication parameters or review fixed organizational variables.
                        </Typography>
                    </div>
                </DialogHeader>

                <DialogBody className="overflow-y-auto max-h-[calc(100vh-200px)] p-6">
                    {editStaff ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <Input
                                label="Staff ID"
                                value={editStaff?.staffId || ""}
                                disabled
                            />
                            <Input
                                label="First Name"
                                value={editStaff?.firstName || ""}
                                onChange={(e) =>
                                    setEditStaff({
                                        ...editStaff,
                                        firstName: e.target.value,
                                    })
                                }
                            />
                            <Input
                                label="Last Name"
                                value={editStaff.lastName || ""}
                                onChange={(e) =>
                                    setEditStaff({
                                        ...editStaff,
                                        lastName: e.target.value
                                    })
                                }
                            />
                            <Input
                                label="Email"
                                value={editStaff?.email || ""}
                                onChange={(e) =>
                                    setEditStaff({
                                        ...editStaff,
                                        email: e.target.value,
                                    })
                                }
                            />
                            <Input
                                label="Mobile"
                                value={editStaff?.mobile || ""}
                                onChange={(e) =>
                                    setEditStaff({
                                        ...editStaff,
                                        mobile: e.target.value,
                                    })
                                }
                            />
                            <Input
                                label="Department"
                                value={editStaff?.department || ""}
                             

                                 onChange={(e) =>
                                    setEditStaff({
                                        ...editStaff,
                                        department: e.target.value,
                                    })
                                }
                            />
                            <Input
                                label="Designation"
                                value={editStaff?.designation || ""}
                             
                                
                                 onChange={(e) =>
                                    setEditStaff({
                                        ...editStaff,
                                        designation: e.target.value,
                                    })
                                }
                                
                            />
                            <Input
                                label="Role"
                                value={editStaff?.role || ""}
                                  onChange={(e) =>
                                    setEditStaff({
                                        ...editStaff,
                                        role: e.target.value,
                                    })
                                }
                            />
                            <Input
                                label="Joining Date"
                                value={editStaff?.joiningDate || ""}
                                disabled
                            />
                            <Input
                                label="Salary"
                                value={editStaff?.salary || ""}
                                disabled
                            />
                            <Input
                                label="Status"
                                value={editStaff?.status || ""}
                                disabled
                            />
                        </div>
                    ) : (
                        <div className="flex justify-center items-center py-10 gap-2">
                            <Spinner className="h-6 w-6 text-blue-500" />
                            <Typography color="gray" className="font-medium">Loading parameters...</Typography>
                        </div>
                    )}
                </DialogBody>

                <DialogFooter className="border-t border-gray-100 px-6 py-4 gap-3">
                    <Button
                        variant="text"
                        color="red"
                        onClick={() => setOpen(false)}
                        className="capitalize font-bold tracking-wide rounded-xl text-sm"
                    >
                        Close
                    </Button>
                    <Button
                        color="green"
                        className="capitalize font-bold tracking-wide rounded-xl text-sm shadow-md shadow-green-100 hover:shadow-lg"
                        onClick={() => {
                            if (window.confirm("Are you sure you want to update this staff?")) {
                                if (!editStaff) return;
                                dispatch(
                                    updateStaff({
                                        staffId: editStaff.staffId,
                                        data: editStaff,
                                    })
                                );
                                setOpen(false);
                            }
                        }}
                    >
                        Update
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
}