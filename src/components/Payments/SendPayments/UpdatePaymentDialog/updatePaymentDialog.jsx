import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Input,
    Typography,
} from "@material-tailwind/react";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPaymentHistory, updatePayment } from "../sendPaymentsSlice";

export function UpdatePaymentDialog({
    open,
    setOpen,
    payment,
}) {
    const [form, setForm] = useState({});
    const dispatch = useDispatch();


    useEffect(() => {
        if (payment) {
            setForm(payment);
        }
    }, [payment]);

    const handleChange = (key, value) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSave = async () => {
        await dispatch(updatePayment(form));

        await dispatch(getPaymentHistory());

        setOpen(false);
    };



    return (
        <Dialog
            open={open}
            handler={() => setOpen(false)}
            size="xl"
        >
            <DialogHeader>
                Update Payment
            </DialogHeader>

            <DialogBody divider>

                <div className="grid grid-cols-2 gap-4">

                    <Input
                        label="Employee Name"
                        value={form.employeeName || ""}
                        disabled
                    />

                    <Input
                        label="Staff ID"
                        value={form.staffId || ""}
                        disabled
                    />

                    <Input
                        label="Basic Salary"
                        value={form.basicSalary || ""}
                        onChange={(e) =>
                            handleChange(
                                "basicSalary",
                                e.target.value
                            )
                        }
                    />

                    <Input
                        label="Gross Salary"
                        value={form.grossSalary || ""}
                        onChange={(e) =>
                            handleChange(
                                "grossSalary",
                                e.target.value
                            )
                        }
                    />

                    <Input
                        label="Conveyance"
                        value={form.conveyanceAllowance || ""}
                        onChange={(e) =>
                            handleChange(
                                "conveyanceAllowance",
                                e.target.value
                            )
                        }
                    />

                    <Input
                        label="Special Allowance"
                        value={form.specialAllowance || ""}
                        onChange={(e) =>
                            handleChange(
                                "specialAllowance",
                                e.target.value
                            )
                        }
                    />

                    <Input
                        label="Medical"
                        value={form.medicalAllowance || ""}
                        onChange={(e) =>
                            handleChange(
                                "medicalAllowance",
                                e.target.value
                            )
                        }
                    />

                    <Input
                        label="Other Allowance"
                        value={form.otherAllowances || ""}
                        onChange={(e) =>
                            handleChange(
                                "otherAllowances",
                                e.target.value
                            )
                        }
                    />

                    <Input
                        label="Total Amount"
                        value={form.totalAmount || ""}
                        onChange={(e) =>
                            handleChange(
                                "totalAmount",
                                e.target.value
                            )
                        }
                    />

                    <Input
                        label="Final Amount"
                        value={form.finalAmount || ""}
                        onChange={(e) =>
                            handleChange(
                                "finalAmount",
                                e.target.value
                            )
                        }
                    />

                </div>

                <div className="mt-6">

                    <Typography variant="h6">
                        Deductions
                    </Typography>

                    {form.deductions?.map((d, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-2 gap-3 mt-3"
                        >
                            <Input
                                label="Title"
                                value={d.title}
                                onChange={(e) => {
                                    const list = [...form.deductions];
                                    list[index].title =
                                        e.target.value;

                                    setForm({
                                        ...form,
                                        deductions: list,
                                    });
                                }}
                            />

                            <Input
                                label="Amount"
                                value={d.amount}
                                onChange={(e) => {
                                    const list = [...form.deductions];
                                    list[index].amount =
                                        e.target.value;

                                    setForm({
                                        ...form,
                                        deductions: list,
                                    });
                                }}
                            />
                        </div>
                    ))}
                </div>

            </DialogBody>

            <DialogFooter>

                <Button
                    variant="text"
                    color="red"
                    onClick={() => setOpen(false)}
                >
                    Cancel
                </Button>

                <Button
                    color="green"
                    onClick={handleSave}
                >
                    Update Payment
                </Button>

            </DialogFooter>
        </Dialog>
    );
}