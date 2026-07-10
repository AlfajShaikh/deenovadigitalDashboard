import {
    Card,
    CardBody,
    Typography,
    Spinner,
    Select,
    Option,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import {
    getPaymentHistory,
    updatePaymentStatus,
} from "../SendPayments/sendPaymentsSlice";

export function Approval() {
    const dispatch = useDispatch();
    const [selectedMonth, setSelectedMonth] = useState("ALL");
    // Track which row's financial details are expanded
    const [expandedRow, setExpandedRow] = useState(null);

    const { paymentHistory, loading } = useSelector(
        (state) => state.sendPayment
    );

    useEffect(() => {
        dispatch(getPaymentHistory());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Spinner className="h-10 w-10 text-blue-600" />
            </div>
        );
    }

    const filteredPayments = [...paymentHistory]
        .filter((item) => {
            if (selectedMonth === "ALL") return true;
            const month = new Date(item.createdAt).getMonth() + 1;
            return month === Number(selectedMonth);
        })
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Metrics calculations
    const totalPool = filteredPayments.reduce((sum, item) => sum + Number(item.finalAmount || 0), 0);
    const pendingCount = filteredPayments.filter(i => !i.status || i.status === "Pending").length;
    const approvedCount = filteredPayments.filter(i => i.status === "Approved" || i.status === "Payment Successfully Done").length;

    const toggleRow = (id) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    const getStatusBadge = (status) => {
        const base = "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide border";
        switch (status) {
            case "Approved":
                return `${base} bg-emerald-50 text-emerald-700 border-emerald-200`;
            case "Payment Successfully Done":
                return `${base} bg-blue-50 text-blue-700 border-blue-200`;
            case "Rejected":
                return `${base} bg-rose-50 text-rose-700 border-rose-200`;
            default:
                return `${base} bg-amber-50 text-amber-700 border-amber-200`;
        }
    };

    return (
        <div className="mx-auto max-w-8xl px-4 py-8 antialiased sm:px-6 lg:px-8 bg-slate-50/50 min-h-screen">
            
            {/* Action Bar Header */}
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <Typography variant="h4" className="font-bold text-slate-900 tracking-tight">
                        Payroll Approvals
                    </Typography>
                    <Typography className="text-sm font-normal text-slate-500 mt-0.5">
                        Manage corporate transactions, verify bank sheets, and release payouts.
                    </Typography>
                </div>
                
                <div className="w-full sm:w-64 bg-white rounded-xl shadow-sm border border-slate-200/80">
                    <Select
                        label="Statement Period"
                        value={selectedMonth}
                        onChange={(value) => setSelectedMonth(value)}
                        className="border-none focus:border-none"
                    >
                        <Option value="ALL">All Available Months</Option>
                        <Option value="1">January</Option>
                        <Option value="2">February</Option>
                        <Option value="3">March</Option>
                        <Option value="4">April</Option>
                        <Option value="5">May</Option>
                        <Option value="6">June</Option>
                        <Option value="7">July</Option>
                        <Option value="8">August</Option>
                        <Option value="9">September</Option>
                        <Option value="10">October</Option>
                        <Option value="11">November</Option>
                        <Option value="12">December</Option>
                    </Select>
                </div>
            </div>

            {/* Micro Analytics Bar */}
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Net Commitments</span>
                    <span className="text-2xl font-bold text-slate-900 mt-2">₹{totalPool.toLocaleString('en-IN')}</span>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Awaiting Signature</span>
                    <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-2xl font-bold text-amber-600">{pendingCount}</span>
                        <span className="text-xs text-slate-400">payments remaining</span>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Cleared Batches</span>
                    <div className="flex items-baseline gap-2 mt-2">
                        <span className="text-2xl font-bold text-emerald-600">{approvedCount}</span>
                        <span className="text-xs text-slate-400">successful runs</span>
                    </div>
                </div>
            </div>

            {/* Core Ledger Data Sheet */}
            <Card className="h-full w-full rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/75 text-xs font-bold uppercase tracking-wider text-slate-500">
                                <th className="p-4">Employee Information</th>
                                <th className="p-4">Pay Cycle</th>
                                <th className="p-4">Disbursal Method</th>
                                <th className="p-4 text-right">Net Salary</th>
                                <th className="p-4 text-center">Status Badge</th>
                                <th className="p-4 text-center">Decision Panel</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {filteredPayments.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-12 text-slate-400 font-medium">
                                        No logs matching criteria encountered.
                                    </td>
                                </tr>
                            ) : (
                                filteredPayments.map((item) => {
                                    const isExpanded = expandedRow === item._id;
                                    return (
                                        <React.Fragment key={item._id}>
                                            {/* Row Master Track */}
                                            <tr 
                                                onClick={() => toggleRow(item._id)}
                                                className={`hover:bg-slate-50/80 transition-colors cursor-pointer ${isExpanded ? 'bg-blue-50/30' : ''}`}
                                            >
                                                <td className="p-4">
                                                    <div className="flex flex-col">
                                                        <span className="font-semibold text-slate-900 flex items-center gap-2">
                                                            {item.employeeName}
                                                            <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono">
                                                                {item.staffId}
                                                            </span>
                                                        </span>
                                                        <span className="text-xs text-slate-400 mt-0.5">{item.designation} • {item.department}</span>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-slate-600 font-medium">
                                                    {item.salaryMonth}/{item.salaryYear}
                                                </td>
                                                <td className="p-4 text-slate-600 text-xs font-medium">
                                                    {item.paymentMode || "Bank Transfer"}
                                                </td>
                                                <td className="p-4 text-right font-bold text-slate-900">
                                                    ₹{Number(item.finalAmount).toLocaleString('en-IN')}
                                                    <span className="block text-[11px] font-normal text-slate-400 tracking-tight">View Details</span>
                                                </td>
                                                <td className="p-4 text-center">
                                                    <span className={getStatusBadge(item.status)}>
                                                        {item.status || "Pending"}
                                                    </span>
                                                </td>
                                                {/* Action Selector stops row collapse bubbling up */}
                                                <td className="p-4 text-center" onClick={(e) => e.stopPropagation()}>
                                                    <div className="w-44 mx-auto">
                                                        <Select
                                                            size="md"
                                                            label="Resolution"
                                                            value={item.status || "Pending"}
                                                            onChange={(value) =>
                                                                dispatch(
                                                                    updatePaymentStatus({
                                                                        staffId: item.staffId,
                                                                        status: value,
                                                                    })
                                                                )
                                                            }
                                                        >
                                                            <Option value="Pending">🕒 Hold / Pending</Option>
                                                            <Option value="Approved">✅ Approve Run</Option>
                                                            <Option value="Payment Successfully Done">⚡ Wire Sent</Option>
                                                            <Option value="Rejected">❌ Reject Code</Option>
                                                        </Select>
                                                    </div>
                                                </td>
                                            </tr>

                                            {/* Sub Ledger Breakdown Drawer */}
                                            {isExpanded && (
                                                <tr className="bg-slate-50/40">
                                                    <td colSpan="6" className="p-6 border-t border-b border-slate-200/60 shadow-inner">
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                                            
                                                            {/* Column 1: Core Base Breakdown */}
                                                            <div>
                                                                <Typography className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Earnings Stack</Typography>
                                                                <div className="space-y-1.5 text-xs text-slate-600">
                                                                    <div className="flex justify-between"><span>Basic Allocation:</span><span className="font-medium">₹{Number(item.basicSalary || 0).toLocaleString('en-IN')}</span></div>
                                                                    <div className="flex justify-between"><span>Gross Track:</span><span className="font-medium">₹{Number(item.grossSalary || 0).toLocaleString('en-IN')}</span></div>
                                                                    <div className="flex justify-between border-t border-slate-200/60 pt-1.5 font-medium text-slate-900"><span>Allowances Sum:</span><span>₹{(Number(item.conveyanceAllowance || 0) + Number(item.medicalAllowance || 0) + Number(item.specialAllowance || 0) + Number(item.otherAllowances || 0)).toLocaleString('en-IN')}</span></div>
                                                                </div>
                                                            </div>

                                                            {/* Column 2: Deductions Block */}
                                                            <div>
                                                                <Typography className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Deductions & Legal holds</Typography>
                                                                <div className="space-y-1.5 text-xs">
                                                                    {item.deductions?.length > 0 ? (
                                                                        item.deductions.map(d => (
                                                                            <div key={d._id} className="flex justify-between text-rose-600"><span>{d.title}:</span><span>-₹{Number(d.amount).toLocaleString('en-IN')}</span></div>
                                                                        ))
                                                                    ) : (
                                                                        <div className="text-slate-400 italic">No deductions assessed.</div>
                                                                    )}
                                                                    {item.tdsApplicable === "YES" && (
                                                                        <div className="flex justify-between text-amber-700 font-medium border-t border-slate-200/60 pt-1.5"><span>TDS Bracket:</span><span>{item.tdsPercentage}% Standard Deduct</span></div>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            {/* Column 3: Corporate Banking Destination Details */}
                                                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                                                <Typography className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Remittance Target</Typography>
                                                                <div className="font-mono text-[11px] text-slate-600 space-y-1">
                                                                    <div><span className="font-sans font-medium text-slate-400">Bank Routing:</span> {item.bankName || "N/A"}</div>
                                                                    <div><span className="font-sans font-medium text-slate-400">Account Line:</span> {item.accountNumber || "-"}</div>
                                                                    <div><span className="font-sans font-medium text-slate-400">IFSC Signpost:</span> {item.ifscCode || "-"}</div>
                                                                    <div><span className="font-sans font-medium text-slate-400">Tax Registration:</span> PAN {item.panNo || "-"} / PF {item.pfNo || "-"}</div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}