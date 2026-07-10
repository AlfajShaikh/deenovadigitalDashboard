import {
    Card,
    CardBody,
    Typography,
    Input,
    Select,
    Option,
    Button,
} from "@material-tailwind/react";
import { createStaff } from "./staffEntrySlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Imported for navigation

export function StaffEntry() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Hook initialization

    const [errors, setErrors] = useState([]);
    const validate = () => {
        const validationErrors = [];

        if (!staff.staffId.trim())
            validationErrors.push("Staff ID is required.");

        if (!staff.firstName.trim())
            validationErrors.push("First Name is required.");

        if (!staff.lastName.trim())
            validationErrors.push("Last Name is required.");

        if (!staff.mobile.trim())
            validationErrors.push("Mobile Number is required.");

        if (staff.mobile.length !== 10)
            validationErrors.push("Mobile Number must be 10 digits.");

        if (!staff.email.trim())
            validationErrors.push("Email is required.");

        if (
            staff.email &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(staff.email)
        )
            validationErrors.push("Invalid Email Address.");

        if (!staff.department)
            validationErrors.push("Department is required.");

        if (!staff.role)
            validationErrors.push("Role is required.");

        if (!staff.username.trim())
            validationErrors.push("Username is required.");

        if (!staff.password)
            validationErrors.push("Password is required.");

        if (staff.password !== staff.confirmPassword)
            validationErrors.push("Passwords do not match.");

        setErrors(validationErrors);

        return validationErrors.length === 0;
    };

    const { loading } = useSelector((state) => state.staffEntry);

    const [staff, setStaff] = useState({
        staffId: "",
        firstName: "",
        lastName: "",
        mobile: "",
        email: "",
        gender: "",
        dob: "",
        department: "",
        designation: "",
        role: "",
        joiningDate: "",
        workLocation: "",
        employeeType: "",
        address: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        salary: "",
        bankName: "",
        accountNumber: "",
        ifscCode: "",
        panNo: "",
        aadhaarNo: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        const bypassFields = ["username", "password", "confirmPassword", "email"];
        const shouldNormalize = !bypassFields.includes(name) && type !== "date" && type !== "number";

        setStaff({
            ...staff,
            [name]: shouldNormalize ? value.toUpperCase() : value,
        });
    };

    const handleSelect = (name, value) => {
        setStaff({
            ...staff,
            [name]: value ? value.toUpperCase() : "",
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) return;

        dispatch(createStaff(staff));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 animate-fade-in">

            {/* Master Header Block */}
            <div className="mb-10 pb-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    {/* Interactive Back Button above the heading */}
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
                    <Typography variant="h2" color="blue-gray" className="font-black tracking-tight text-3xl md:text-4xl">
                        Onboard New Staff
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal text-gray-500 text-base">
                        Register centralized workforce credentials, banking details, and core placement metrics.
                    </Typography>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">

                {/* STICKY LEFT RAIL: Form Navigation Outline */}
                <div className="hidden lg:block lg:sticky lg:top-24 space-y-6 border-l border-gray-200 pl-4 py-2">
                    {[
                        { num: "01", label: "Personal Info" },
                        { num: "02", label: "Professional Profile" },
                        { num: "03", label: "Address Details" },
                        { num: "04", label: "Financials & Identity" },
                        { num: "05", label: "Access Credentials" }
                    ].map((step, idx) => (
                        <div key={idx} className="flex items-center gap-3 group">
                            <span className="text-xs font-mono font-bold text-blue-500 bg-blue-50/80 px-2 py-0.5 rounded">
                                {step.num}
                            </span>
                            <span className="text-sm font-semibold text-gray-600 group-hover:text-blue-600 transition-colors">
                                {step.label}
                            </span>
                        </div>
                    ))}



                    {errors.length > 0 && (
                        <Card className="mb-6 border border-red-300 bg-red-50">
                            <CardBody>
                                <Typography
                                    variant="h6"
                                    color="red"
                                    className="mb-2"
                                >
                                    Please fix the following errors:
                                </Typography>

                                <ul className="list-disc list-inside text-red-700 space-y-1">
                                    {errors.map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                                </ul>
                            </CardBody>
                        </Card>
                    )}

                </div>

                {/* RIGHT MAIN CORE: Form Sections */}
                <div className="lg:col-span-3 space-y-8">

                    <Card className="shadow-xl border border-gray-100/70 rounded-2xl overflow-hidden bg-white">
                        <CardBody className="p-6 sm:p-10 space-y-12">

                            {/* SECTION 1: Personal Details */}
                            <section className="space-y-6">
                                <div className="border-b border-gray-50 pb-2">
                                    <Typography variant="h5" color="blue-gray" className="font-bold tracking-tight">
                                        Personal Information
                                    </Typography>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                                    <Input label="Staff ID" name="staffId" value={staff.staffId} onChange={handleChange} required />
                                    <Input label="First Name *" name="firstName" value={staff.firstName} onChange={handleChange} required />
                                    <Input label="Last Name *" name="lastName" value={staff.lastName} onChange={handleChange} required />
                                    <Input label="Mobile Number" name="mobile" value={staff.mobile} onChange={handleChange} />
                                    <Input type="email" label="Email Address" name="email" value={staff.email} onChange={handleChange} />
                                    <Select label="Gender" value={staff.gender} onChange={(val) => handleSelect("gender", val)}>
                                        <Option value="Male">Male</Option>
                                        <Option value="Female">Female</Option>
                                        <Option value="Other">Other</Option>
                                    </Select>
                                    <Input type="date" label="Date of Birth" name="dob" value={staff.dob} onChange={handleChange} shrink />
                                </div>
                            </section>

                            {/* SECTION 2: Work Profile */}
                            <section className="space-y-6">
                                <div className="border-b border-gray-50 pb-2">
                                    <Typography variant="h5" color="blue-gray" className="font-bold tracking-tight">
                                        Professional Profile
                                    </Typography>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                                    <Select label="Department" value={staff.department} onChange={(val) => handleSelect("department", val)}>
                                        <Option value="Master department">Master Department</Option>
                                        <Option value="Design">Design</Option>
                                        <Option value="Development">Development</Option>
                                        <Option value="HR">HR</Option>
                                        <Option value="Sales">Sales</Option>
                                        <Option value="Support">Support</Option>
                                    </Select>
                                    <Input label="Designation" name="designation" value={staff.designation} onChange={handleChange} />

                                    <Select label="Role" value={staff.role} onChange={(val) => handleSelect("role", val)}>
                                        <Option value="Master Role">Master Role</Option>
                                        <Option value="UI / UX">UI/UX</Option>

                                        <Option value="Front end developer">Front end developer</Option>
                                        <Option value="Backend developer">Backend developer</Option>
                                        <Option value="Android developer">Android developer</Option>
                                        <Option value="Cloud developer">Cloud developer</Option>
                                    </Select>

                                    <Input type="date" label="Joining Date" name="joiningDate" value={staff.joiningDate} onChange={handleChange} shrink />
                                    <Input label="Work Location" name="workLocation" value={staff.workLocation} onChange={handleChange} />
                                    <Select label="Employee Type" value={staff.employeeType} onChange={(val) => handleSelect("employeeType", val)}>
                                        <Option value="Permanent">Main</Option>
                                        <Option value="Permanent">Permanent</Option>
                                        <Option value="Contract">Contract</Option>
                                        <Option value="Intern">Intern</Option>
                                    </Select>
                                </div>
                            </section>

                            {/* SECTION 3: Address Info */}
                            <section className="space-y-6">
                                <div className="border-b border-gray-50 pb-2">
                                    <Typography variant="h5" color="blue-gray" className="font-bold tracking-tight">
                                        Address Details
                                    </Typography>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                                    <div className="md:col-span-2">
                                        <Input label="Street Address" name="address" value={staff.address} onChange={handleChange} />
                                    </div>
                                    <Input label="City" name="city" value={staff.city} onChange={handleChange} />
                                    <Input label="State" name="state" value={staff.state} onChange={handleChange} />
                                    <Input label="Country" name="country" value={staff.country} onChange={handleChange} />
                                    <Input label="Pincode" name="pincode" value={staff.pincode} onChange={handleChange} />
                                </div>
                            </section>

                            {/* SECTION 4: Financials & Legal */}
                            <section className="space-y-6">
                                <div className="border-b border-gray-50 pb-2">
                                    <Typography variant="h5" color="blue-gray" className="font-bold tracking-tight">
                                        Financials & Identity
                                    </Typography>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                                    <Input label="Basic Salary" name="salary" type="number" value={staff.salary} onChange={handleChange} />
                                    <Input label="Bank Name" name="bankName" value={staff.bankName} onChange={handleChange} />
                                    <Input label="Account Number" name="accountNumber" value={staff.accountNumber} onChange={handleChange} />
                                    <Input label="IFSC Code" name="ifscCode" value={staff.ifscCode} onChange={handleChange} />
                                    <Input label="PAN Number" name="panNo" value={staff.panNo} onChange={handleChange} />
                                    <Input label="Aadhaar Number" name="aadhaarNo" value={staff.aadhaarNo} onChange={handleChange} />
                                </div>
                            </section>

                            {/* SECTION 5: Credentials */}
                            <section className="space-y-6">
                                <div className="border-b border-gray-50 pb-2">
                                    <Typography variant="h5" color="blue-gray" className="font-bold tracking-tight">
                                        Access Credentials
                                    </Typography>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                                    <Input label="Username" name="username" value={staff.username} onChange={handleChange} required />
                                    <Input type="password" label="Password" name="password" value={staff.password} onChange={handleChange} required />
                                    <Input type="password" label="Confirm Password" name="confirmPassword" value={staff.confirmPassword} onChange={handleChange} required />
                                </div>
                            </section>

                        </CardBody>
                    </Card>

                    {/* Footer Actions */}
                    <div className="flex justify-end items-center gap-4 bg-gray-50 border border-gray-100 p-4 rounded-xl">
                        {/* Cancel button also links cleanly back to the /staff directory home */}
                        <Button
                            variant="text"
                            color="red"
                            className="px-6 font-bold capitalize tracking-wide text-sm"
                            onClick={() => navigate("/staff")}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            color="blue"
                            loading={loading}
                            className="px-8 font-bold capitalize tracking-wide text-sm shadow-md hover:shadow-lg active:scale-95 transition-transform rounded-xl"
                        >
                            Save Profile
                        </Button>
                    </div>

                </div>
            </form>
        </div>
    );
}