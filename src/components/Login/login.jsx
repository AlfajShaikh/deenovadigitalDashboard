import {
    Button,
    Card,
    CardBody,
    Input,
    Checkbox,
} from "@material-tailwind/react";

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./loginSlice";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    

    const { loading, success, error } = useSelector(
        (state) => state.auth
    );

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    useEffect(() => {
        if (success) {
            navigate("/home");
        }
    }, [success, navigate]);

    const handleLogin = () => {
        dispatch(loginUser(formData));
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center">

            <Card className="w-full max-w-md">
                <CardBody>

                    <Input
                        label="Username"
                        value={formData.username}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                username: e.target.value,
                            })
                        }
                    />

                    <div className="mt-5">

                        <Input
                            type="password"
                            label="Password"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    password: e.target.value,
                                })
                            }
                        />

                    </div>

                    <div className="mt-5">

                        <Checkbox label="Remember Me" />

                    </div>

                    {error && (
                        <p className="text-red-500 text-sm mt-2">
                            {error.message || "Login Failed"}
                        </p>
                    )}

                    <Button
                        className="mt-5"
                        fullWidth
                        loading={loading}
                        onClick={handleLogin}
                    >
                        Login
                    </Button>

                </CardBody>
            </Card>

        </div>
    );
}