import {
    Card,
    CardBody,
    Typography,
    Spinner,
} from "@material-tailwind/react";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPaymentHistory } from "../SendPayments/sendPaymentsSlice";

export function PaymentHistory() {

    const dispatch = useDispatch();

    const {
        paymentHistory,
        loading,
    } = useSelector(
        (state) => state.sendPayment
    );

    useEffect(() => {
        dispatch(getPaymentHistory());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="flex justify-center mt-10">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-10">

            {(paymentHistory || []).map((item) => (

                <Card key={item._id} className="shadow-lg border">

                    <CardBody>

                        {/* Header */}

                        <div className="flex justify-between items-center">

                            <div>

                                <Typography variant="h5" color="blue">
                                    {item.employeeName}
                                </Typography>

                                <Typography className="text-gray-600">
                                    {item.staffId}
                                </Typography>

                            </div>

                            <span
                                className={`px-3 py-1 rounded-full text-white text-sm
                            ${item.status === "Payment Successfully Done"
                                        ? "bg-green-600"
                                        : item.status === "Pending"
                                            ? "bg-orange-500"
                                            : "bg-red-600"
                                    }`}
                            >
                                {item.status}
                            </span>

                        </div>

                        <hr className="my-4" />

                        {/* Employee */}

                        <Typography variant="h6">
                            Employee Details
                        </Typography>

                        <div className="grid grid-cols-2 gap-3 mt-2">

                            <Typography>
                                <b>Department</b>
                            </Typography>

                            <Typography>{item.department}</Typography>

                            <Typography>
                                <b>Designation</b>
                            </Typography>

                            <Typography>{item.designation}</Typography>

                            <Typography>
                                <b>Employee Type</b>
                            </Typography>

                            <Typography>{item.employeeType}</Typography>

                            <Typography>
                                <b>Salary Type</b>
                            </Typography>

                            <Typography>{item.salaryType}</Typography>

                            <Typography>
                                <b>Salary Month</b>
                            </Typography>

                            <Typography>{item.salaryMonth}</Typography>

                            <Typography>
                                <b>Salary Year</b>
                            </Typography>

                            <Typography>{item.salaryYear}</Typography>

                        </div>

                        <hr className="my-4" />

                        {/* Salary */}

                        <Typography variant="h6">
                            Salary Details
                        </Typography>

                        <div className="grid grid-cols-2 gap-3 mt-2">

                            <Typography>
                                Basic Salary
                            </Typography>

                            <Typography>
                                ₹ {item.basicSalary}
                            </Typography>

                            <Typography>
                                Gross Salary
                            </Typography>

                            <Typography>
                                ₹ {item.grossSalary}
                            </Typography>

                            <Typography>
                                Conveyance
                            </Typography>

                            <Typography>
                                ₹ {item.conveyanceAllowance || 0}
                            </Typography>

                            <Typography>
                                Special Allowance
                            </Typography>

                            <Typography>
                                ₹ {item.specialAllowance || 0}
                            </Typography>

                            <Typography>
                                Medical
                            </Typography>

                            <Typography>
                                ₹ {item.medicalAllowance || 0}
                            </Typography>

                            <Typography>
                                Other Allowance
                            </Typography>

                            <Typography>
                                ₹ {item.otherAllowances || 0}
                            </Typography>

                        </div>

                        <hr className="my-4" />

                        {/* Deductions */}

                        <Typography variant="h6">
                            Salary Deductions
                        </Typography>

                        {item.deductions?.length > 0 ? (

                            item.deductions.map((d, index) => (

                                <div
                                    key={index}
                                    className="flex justify-between border-b py-2"
                                >

                                    <Typography>
                                        {d.title}
                                    </Typography>

                                    <Typography color="red">
                                        - ₹ {d.amount}
                                    </Typography>

                                </div>

                            ))

                        ) : (

                            <Typography>No Deductions</Typography>

                        )}

                        <hr className="my-4" />

                        {/* Summary */}

                        <Typography variant="h6">
                            Payment Summary
                        </Typography>

                        <div className="grid grid-cols-2 gap-3 mt-2">

                            <Typography>
                                Total Amount
                            </Typography>

                            <Typography color="blue">
                                ₹ {item.totalAmount}
                            </Typography>

                            <Typography>
                                TDS
                            </Typography>

                            <Typography>
                                {item.tdsApplicable}
                                {item.tdsApplicable === "YES"
                                    ? ` (${item.tdsPercentage}%)`
                                    : ""}
                            </Typography>

                            <Typography className="font-bold">
                                Final Amount
                            </Typography>

                            <Typography
                                className="font-bold text-green-700"
                            >
                                ₹ {item.finalAmount}
                            </Typography>

                        </div>

                        <hr className="my-4" />

                        {/* Bank */}

                        <Typography variant="h6">
                            Bank Details
                        </Typography>

                        <div className="grid grid-cols-2 gap-3 mt-2">

                            <Typography>
                                Bank
                            </Typography>

                            <Typography>
                                {item.bankName}
                            </Typography>

                            <Typography>
                                IFSC
                            </Typography>

                            <Typography>
                                {item.ifscCode || "-"}
                            </Typography>

                            <Typography>
                                Account
                            </Typography>

                            <Typography>
                                {item.accountNumber || "-"}
                            </Typography>

                        </div>

                        <hr className="my-4" />

                        <Typography className="text-sm text-gray-500">

                            Created :
                            {new Date(item.createdAt).toLocaleString()}

                        </Typography>

                    </CardBody>

                </Card>

            ))}

        </div>
    );
}