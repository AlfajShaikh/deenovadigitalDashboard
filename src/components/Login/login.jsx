import {
    Button,
    Card,
    CardBody,
    Input,
    Checkbox,
    Typography,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./loginSlice";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import logo from "../../assets/images/logo.png"
export function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, success, error: reduxError } = useSelector(
        (state) => state.auth
    );

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [formErrors, setFormErrors] = useState({
        username: "",
        password: "",
    });

    useEffect(() => {
        if (success) {
            navigate("/home");
        }
    }, [success, navigate]);

    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (!formData.username.trim()) {
            errors.username = "Username is required.";
            isValid = false;
        } else if (formData.username.length < 3) {
            errors.username = "Username must be at least 3 characters.";
            isValid = false;
        }

        if (!formData.password) {
            errors.password = "Password is required.";
            isValid = false;
        } else if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters.";
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (validateForm()) {
            dispatch(loginUser(formData));
        }
    };

    return (
        <>
            {/* Elegant Slow-Moving Mesh Gradient Background */}
            <style>
                {`
                    @keyframes meshGradient {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                    .bg-mesh-animated {
                        background: linear-gradient(-45deg, #4f46e5, #7c3aed, #2563eb, #0ea5e9);
                        background-size: 400% 400%;
                        animation: meshGradient 15s ease infinite;
                    }
                `}
            </style>

            <div className="min-h-screen bg-mesh-animated flex items-center justify-center p-4 font-sans">

                {/* Refined Premium Card */}
                <Card className="w-full max-w-[420px] bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border-0">
                    <CardBody className="p-10 flex flex-col gap-6">

                        {/* Branding / Logo Section */}
                        <div className="flex flex-col items-center justify-center mb-4">
                            <div className="w-14 h-14 bg-gradient-to-tr from-indigo-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 mb-4 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                                {/* Abstract Company Logo SVG */}
                                <img src={logo} alt="" />


                            </div>
                            <Typography
                                variant="h4"
                                className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 to-blue-700 tracking-tight"
                            >
                                DEENOVA DIGITAL
                            </Typography>
                            <Typography variant="small" color="gray" className="mt-1 font-medium">
                                Log in to your workspace
                            </Typography>
                        </div>

                        {/* Form Section */}
                        <form className="flex flex-col gap-5" onSubmit={handleLogin}>

                            {/* Username Input with Icon */}
                            <div>
                                <Input
                                    size="lg"
                                    label="Username"
                                    color="indigo"
                                    error={!!formErrors.username}
                                    value={formData.username}
                                    icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-400">
                                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                                        </svg>
                                    }
                                    onChange={(e) => {
                                        setFormData({ ...formData, username: e.target.value });
                                        if (formErrors.username) setFormErrors({ ...formErrors, username: "" });
                                    }}
                                    className="!border-t-blue-gray-200 focus:!border-indigo-500"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                />
                                {formErrors.username && (
                                    <Typography variant="small" color="red" className="mt-1.5 flex items-center gap-1 font-medium text-xs">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                                        </svg>
                                        {formErrors.username}
                                    </Typography>
                                )}
                            </div>

                            {/* Password Input with Icon */}
                            <div>
                                <Input
                                    type="password"
                                    size="lg"
                                    label="Password"
                                    color="indigo"
                                    error={!!formErrors.password}
                                    value={formData.password}
                                    icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-400">
                                            <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                                        </svg>
                                    }
                                    onChange={(e) => {
                                        setFormData({ ...formData, password: e.target.value });
                                        if (formErrors.password) setFormErrors({ ...formErrors, password: "" });
                                    }}
                                    className="!border-t-blue-gray-200 focus:!border-indigo-500"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                />
                                {formErrors.password && (
                                    <Typography variant="small" color="red" className="mt-1.5 flex items-center gap-1 font-medium text-xs">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                                        </svg>
                                        {formErrors.password}
                                    </Typography>
                                )}
                            </div>

                            {/* Utilities (Remember Me / Forgot Password) */}
                            <div className="flex items-center justify-between -mt-1">
                                <Checkbox
                                    label={
                                        <Typography color="blue-gray" className="text-sm font-semibold">
                                            Remember Me
                                        </Typography>
                                    }
                                    color="indigo"
                                    className="w-4 h-4 rounded border-gray-300"
                                    containerProps={{ className: "p-2" }}
                                />
                                <a href="#" className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
                                    Forgot Password?
                                </a>
                            </div>

                            {/* Backend/Redux Error Display */}
                            {reduxError && (
                                <div className="bg-red-50 border-l-4 border-red-500 rounded-r-md p-3">
                                    <Typography variant="small" color="red" className="font-semibold text-sm">
                                        {reduxError.message || "Invalid credentials. Please try again."}
                                    </Typography>
                                </div>
                            )}

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                size="lg"
                                color="indigo"
                                className="mt-2 flex justify-center items-center gap-2 py-3.5 rounded-xl shadow-md hover:shadow-lg hover:shadow-indigo-500/30 transition-all active:scale-[0.98]"
                                fullWidth
                                loading={loading}
                            >
                                {loading ? "Authenticating..." : "Sign In"}
                            </Button>

                            {/* Divider & Social Login (Optional UI Enhancer) */}
                            {/* <div className="mt-4 flex items-center justify-between gap-4">
                                <div className="h-px bg-gray-200 w-full"></div>
                                <Typography variant="small" className="text-gray-400 font-medium whitespace-nowrap">
                                    or continue with
                                </Typography>
                                <div className="h-px bg-gray-200 w-full"></div>
                            </div>

                            <Button
                                size="lg"
                                variant="outlined"
                                color="blue-gray"
                                className="flex justify-center items-center gap-3 py-3.5 rounded-xl border-gray-300 hover:bg-gray-50 focus:ring-0 active:scale-[0.98] transition-all"
                                fullWidth
                            >
                                <img src="https://docs.material-tailwind.com/icons/google.svg" alt="google" className="h-5 w-5" />
                                <span className="font-semibold text-gray-700">Google</span>
                            </Button> */}

                        </form>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}