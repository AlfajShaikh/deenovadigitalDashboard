import {
    Card,
    CardBody,
    Typography,
    Select,
    Option,
    Input,
    Button,
} from "@material-tailwind/react";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addPayment, getPaymentHistory, getStaffList } from "./sendPaymentsSlice";
import { UpdatePaymentDialog } from "./UpdatePaymentDialog/updatePaymentDialog";

export function SendPayments() {
    const dispatch = useDispatch();

    const {
        staffList,
        paymentHistory,
        loading,
        paymentLoading,
        paymentSuccess,
    } = useSelector(
        (state) => state.sendPayment
    );
    const [selectedStaff, setSelectedStaff] = useState(null);

    const [openUpdate, setOpenUpdate] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);

    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const currentPayment = paymentHistory.find(
        (item) =>
            item.staffId === selectedStaff?.staffId &&
            Number(item.salaryMonth) === currentMonth &&
            Number(item.salaryYear) === currentYear
    );

    useEffect(() => {
        dispatch(getStaffList());
        dispatch(getPaymentHistory());
    }, [dispatch]);

    const [deductions, setDeductions] = useState([
        {
            title: "",
            amount: "",
        },
    ]);


    const addDeduction = () => {
        setDeductions([
            ...deductions,
            {
                title: "",
                amount: "",
            },
        ]);
    };

    const removeDeduction = (index) => {
        setDeductions(
            deductions.filter((_, i) => i !== index)
        );
    };

    const updateDeduction = (index, field, value) => {
        const data = [...deductions];

        data[index][field] = value;

        setDeductions(data);
    };

    const currentDate = new Date();

    const [paymentData, setPaymentData] = useState({
        staffId: "",
        employeeName: "",
        department: "",
        designation: "",
        employeeType: "",
        joiningDate: "",
        salaryEffectiveFrom: "",
        salaryType: "MONTHLY",

        basicSalary: "",
        hra: "",
        da: "",
        specialAllowance: "",
        conveyanceAllowance: "",
        medicalAllowance: "",
        otherAllowances: "",
        grossSalary: "",

        // New Fields
        salaryMonth: currentDate.getMonth() + 1,
        salaryYear: currentDate.getFullYear(),

        paymentStatus: "Pending",
        paymentDate: "",
        transactionId: "",
        paymentMode: "Bank Transfer",
        invoiceNo: "",

        bankName: "",
        accountNumber: "",
        ifscCode: "",
        upiId: "",
        panNo: "",
        aadhaarNo: "",
        pfNo: "",
        esicNo: "",

        tdsApplicable: "NO",

        totalAmount: "",
        finalAmount: "",
    });





    useEffect(() => {

        const gross = Number(paymentData.grossSalary) || 0;

        const special = Number(paymentData.specialAllowance) || 0;
        const conveyance = Number(paymentData.conveyanceAllowance) || 0;
        const medical = Number(paymentData.medicalAllowance) || 0;
        const other = Number(paymentData.otherAllowances) || 0;

        const allowanceTotal =
            special +
            conveyance +
            medical +
            other;

        const deductionTotal = deductions.reduce(
            (sum, item) => sum + (Number(item.amount) || 0),
            0
        );

        // TDS only on Gross Salary
        let tds = 0;

        if (paymentData.tdsApplicable === "YES") {
            tds =
                (gross * (Number(paymentData.tdsPercentage) || 0)) / 100;
        }

        // Gross after TDS
        const grossAfterTds = gross - tds;

        // Final Amount
        const finalAmount =
            grossAfterTds +
            allowanceTotal -
            deductionTotal;

        // Total before TDS
        const totalAmount =
            gross +
            allowanceTotal;

        setPaymentData((prev) => ({
            ...prev,
            totalAmount: totalAmount.toFixed(2),
            finalAmount: finalAmount.toFixed(2),
        }));

    }, [
        paymentData.grossSalary,
        paymentData.specialAllowance,
        paymentData.conveyanceAllowance,
        paymentData.medicalAllowance,
        paymentData.otherAllowances,
        paymentData.tdsApplicable,
        paymentData.tdsPercentage,
        deductions,
    ]);



    const handleSubmit = () => {

        const payload = {
            ...paymentData,
            deductions,
        };

        console.log(payload);

        dispatch(addPayment(payload));
    };

    useEffect(() => {

        if (paymentSuccess) {

            alert("Payment Added Successfully");

        }

    }, [paymentSuccess]);



    return (
        <div className="max-w-5xl mx-auto p-5">

            <Card>

                <CardBody>

                    <Typography variant="h4">
                        Send Employee Payment
                    </Typography>

                    <div className="mt-5">

                        <Select
                            label="Select Employee"
                            value={selectedStaff?.staffId || ""}
                            onChange={(value) => {
                                const staff = staffList.find(
                                    (item) => item.staffId === value
                                );

                                setSelectedStaff(staff);

                                if (staff) {
                                    setPaymentData({
                                        staffId: staff.staffId,
                                        employeeName: `${staff.firstName} ${staff.lastName}`,
                                        department: staff.department,
                                        designation: staff.designation,
                                        employeeType: staff.employeeType,
                                        joiningDate: staff.joiningDate?.substring(0, 10),
                                        salaryEffectiveFrom: "",
                                        salaryType: "MONTHLY",
                                        basicSalary: staff.salary || "",
                                        hra: "",
                                        da: "",
                                        specialAllowance: "",
                                        conveyanceAllowance: "",
                                        medicalAllowance: "",
                                        otherAllowances: "",
                                        grossSalary: "",
                                        bankName: staff.bankName || "",
                                        accountNumber: staff.accountNumber || "",
                                        ifscCode: staff.ifscCode || "",
                                        upiId: staff.upiId || "",
                                        panNo: staff.panNo || "",
                                        aadhaarNo: staff.aadhaarNo || "",
                                        pfNo: staff.pfNo || "",
                                        esicNo: staff.esicNo || "",
                                        tdsApplicable: "NO",
                                        status: "Sending"
                                    });


                                }
                            }}
                        >
                            {staffList.map((staff) => (
                                <Option
                                    key={staff._id}
                                    value={staff.staffId}
                                >
                                    {staff.staffId} - {staff.firstName} {staff.lastName}
                                </Option>
                            ))}
                        </Select>

                    </div>

                    {selectedStaff && (

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">

                            <Input label="Employee ID" value={paymentData.staffId} disabled />

                            <Input label="Employee Name" value={paymentData.employeeName} disabled />

                            <Input label="Department" value={paymentData.department} disabled />

                            <Input label="Designation" value={paymentData.designation} disabled />

                            <Input label="Employment Type" value={paymentData.employeeType} disabled />

                            <Input label="Joining Date" value={paymentData.joiningDate} disabled />

                            <Input
                                label="Salary Effective From"
                                type="date"
                                value={paymentData.salaryEffectiveFrom}
                                onChange={(e) =>
                                    setPaymentData({
                                        ...paymentData,
                                        salaryEffectiveFrom: e.target.value
                                    })
                                }
                            />

                            <Select
                                label="Salary Type"
                                value={paymentData.salaryType}
                                onChange={(val) =>
                                    setPaymentData({
                                        ...paymentData,
                                        salaryType: val
                                    })
                                }
                            >
                                <Option value="MONTHLY">Monthly</Option>
                                <Option value="WEEKLY">Weekly</Option>
                                <Option value="DAILY">Daily</Option>
                                <Option value="HOURLY">Hourly</Option>
                            </Select>

                            <Input
                                label="Basic Salary"
                                value={paymentData.basicSalary}
                                onChange={(e) => setPaymentData({ ...paymentData, basicSalary: e.target.value })}
                            />

                            <Input
                                label="Gross Salary"
                                type="number"
                                value={paymentData.grossSalary}
                                onChange={(e) =>
                                    setPaymentData({
                                        ...paymentData,
                                        grossSalary: e.target.value,
                                    })
                                }
                            />
                            <Input
                                label="HRA"
                                value={paymentData.hra}
                                onChange={(e) => setPaymentData({ ...paymentData, hra: e.target.value })}
                            />

                            <Input
                                label="DA"
                                value={paymentData.da}
                                onChange={(e) => setPaymentData({ ...paymentData, da: e.target.value })}
                            />

                            <Input
                                label="Special Allowance"
                                value={paymentData.specialAllowance}
                                onChange={(e) => setPaymentData({ ...paymentData, specialAllowance: e.target.value })}
                            />

                            <Input
                                label="Conveyance Allowance"
                                value={paymentData.conveyanceAllowance}
                                onChange={(e) => setPaymentData({ ...paymentData, conveyanceAllowance: e.target.value })}
                            />

                            <Input
                                label="Medical Allowance"
                                value={paymentData.medicalAllowance}
                                onChange={(e) => setPaymentData({ ...paymentData, medicalAllowance: e.target.value })}
                            />

                            <Input
                                label="Other Allowances"
                                value={paymentData.otherAllowances}
                                onChange={(e) => setPaymentData({ ...paymentData, otherAllowances: e.target.value })}
                            />



                            <Input
                                label="Bank Name"
                                value={paymentData.bankName}
                                onChange={(e) => setPaymentData({ ...paymentData, bankName: e.target.value })}
                            />

                            <Input
                                label="Account Number"
                                value={paymentData.accountNumber}
                                onChange={(e) => setPaymentData({ ...paymentData, accountNumber: e.target.value })}
                            />

                            <Input
                                label="IFSC Code"
                                value={paymentData.ifscCode}
                                onChange={(e) => setPaymentData({ ...paymentData, ifscCode: e.target.value })}
                            />

                            <Input
                                label="UPI ID"
                                value={paymentData.upiId}
                                onChange={(e) => setPaymentData({ ...paymentData, upiId: e.target.value })}
                            />

                            <Input
                                label="PAN Number"
                                value={paymentData.panNo}
                                onChange={(e) => setPaymentData({ ...paymentData, panNo: e.target.value })}
                            />

                            <Input
                                label="Aadhaar Number"
                                value={paymentData.aadhaarNo}
                                onChange={(e) => setPaymentData({ ...paymentData, aadhaarNo: e.target.value })}
                            />

                            <Input
                                label="PF Number"
                                value={paymentData.pfNo}
                                onChange={(e) => setPaymentData({ ...paymentData, pfNo: e.target.value })}
                            />

                            <Input
                                label="ESIC Number"
                                value={paymentData.esicNo}
                                onChange={(e) => setPaymentData({ ...paymentData, esicNo: e.target.value })}
                            />

                            <Select
                                label="TDS Applicable"
                                value={paymentData.tdsApplicable}
                                onChange={(val) =>
                                    setPaymentData({
                                        ...paymentData,
                                        tdsApplicable: val,
                                        tdsPercentage: val === "NO" ? 0 : paymentData.tdsPercentage,
                                    })
                                }
                            >
                                <Option value="YES">Yes</Option>
                                <Option value="NO">No</Option>
                            </Select>



                            {paymentData.tdsApplicable === "YES" && (
                                <Select
                                    label="TDS Percentage"
                                    value={String(paymentData.tdsPercentage)}
                                    onChange={(val) =>
                                        setPaymentData({
                                            ...paymentData,
                                            tdsPercentage: Number(val),
                                        })
                                    }
                                >
                                    <Option value="10">10%</Option>
                                    <Option value="20">20%</Option>
                                </Select>
                            )}

                            <div className="md:col-span-2">

                                <Typography
                                    variant="h6"
                                    className="mb-3"
                                >
                                    Salary Deductions
                                </Typography>

                                {deductions.map((item, index) => (

                                    <div
                                        key={index}
                                        className="grid grid-cols-12 gap-3 mb-3"
                                    >

                                        <div className="col-span-6">

                                            <Input
                                                label="Deduction Title"
                                                value={item.title}
                                                onChange={(e) =>
                                                    updateDeduction(
                                                        index,
                                                        "title",
                                                        e.target.value
                                                    )
                                                }
                                            />

                                        </div>

                                        <div className="col-span-4">

                                            <Input
                                                label="Amount"
                                                type="number"
                                                value={item.amount}
                                                onChange={(e) =>
                                                    updateDeduction(
                                                        index,
                                                        "amount",
                                                        e.target.value
                                                    )
                                                }
                                            />

                                        </div>

                                        <div className="col-span-2 flex items-center">

                                            <Button
                                                color="red"
                                                onClick={() =>
                                                    removeDeduction(index)
                                                }
                                            >
                                                X
                                            </Button>

                                        </div>

                                    </div>

                                ))}

                                <Button
                                    color="blue"
                                    variant="outlined"
                                    onClick={addDeduction}
                                >
                                    + Add Deduction
                                </Button>

                            </div>

                            <div>
                                <p>Total Amount</p>
                                <Input
                                    label="Total Amount"
                                    value={paymentData.totalAmount}
                                    disabled
                                />
                            </div>
                            <div>
                                <p>Final Amount</p>

                                <Input
                                    label="Final Amount"
                                    value={paymentData.finalAmount}
                                    disabled
                                />
                            </div>






                        </div>



                    )}


                </CardBody>
                <div className="md:col-span-2 flex justify-end mt-5">

                    <Button
                        color="green"
                        loading={paymentLoading}
                        onClick={handleSubmit}
                    >
                        Submit Payment
                    </Button>

                    <div className="flex justify-end mb-5">
                        {currentPayment ? (
                            <Button
                                color="blue"
                                onClick={() => {
                                    setSelectedPayment(currentPayment);
                                    setOpenUpdate(true);
                                }}
                            >
                                Update Payment
                            </Button>
                        ) : (
                            <Typography color="red">
                                No payment found for this month
                            </Typography>
                        )}
                    </div>

                </div>
            </Card>

            <UpdatePaymentDialog
                open={openUpdate}
                setOpen={setOpenUpdate}
                payment={selectedPayment}
            />
        </div>
    );
}