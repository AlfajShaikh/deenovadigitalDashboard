import {
    Card,
    CardBody,
    Typography,
    Button,
    Chip,
    Input,
    IconButton,
} from "@material-tailwind/react";
import {
    ClockIcon,
    UserGroupIcon,
    CalendarDaysIcon,
    CurrencyRupeeIcon,
    CheckCircleIcon,
    InboxIcon,
    TrashIcon,
    PlusIcon,
} from "@heroicons/react/24/solid";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import signature from "../../../../assets/images/signature.png";
import logo from "../../../../assets/images/logo.png";

// Adjust path as needed
import { getAllRequirementEnquiry } from "../RequirementEnquiry/requirementEnquirySlice";
import { createEstimate, getEstimateByRequirementId } from "./estimationSlice";

export function Estimation() {
    const dispatch = useDispatch();
    const { enquiryList } = useSelector((state) => state.requirementEnquiry);
    const {
        createLoading,
        success,
        estimate,
    } = useSelector((state) => state.estimate);
    const [customerRules, setCustomerRules] = useState({});
    const [hourlyRates, setHourlyRates] = useState({});
    const [projectSettings, setProjectSettings] = useState({});



    const handleSaveEstimate = (
        req,
        rules,
        settings,
        rate,
        totalRuleHours,
        totalCost,
        requiredDevelopers
    ) => {

        const estimateItems = rules.map((rule, index) => ({
            id: index + 1,
            serviceName: rule.keyword,
            description: `${rule.days} Days × ${rule.hoursPerDay} Hours`,
            quantity: 1,
            unit: "Project",
            price: rule.hours * rate,
            discount: 0,
            gst: 18,
            amount: rule.hours * rate,
        }));

        const subTotal = estimateItems.reduce(
            (sum, item) => sum + item.amount,
            0
        );

        const gstAmount = subTotal * 18 / 100;

        const grandTotal = subTotal + gstAmount;

        const estimateData = {
            estimateId: req.requirementId,      // or generate EST-1001
            estimateDate: new Date(),
            validTill: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),

            customerName: req.customerName,
            companyName: req.companyName,

            contactPerson: "",
            mobile: "",
            email: "",
            address: "",

            projectName: req.projectName || "Software Development",
            projectType: "Web Application",

            status: "Pending",

            estimateItems,

            subTotal,
            discount: 0,
            gstAmount,
            grandTotal,

            notes: `Timeline ${settings.months} Months`,
            termsConditions: "50% Advance, 50% Before Delivery",
        };

        console.log(estimateData);

        dispatch(createEstimate(estimateData));
    };

    useEffect(() => {
        dispatch(getAllRequirementEnquiry());
    }, [dispatch]);

    const approvedRequirements = enquiryList?.filter(
        (item) => item.status === "Approved"
    ) || [];

    const DEFAULT_RULES = [
        { keyword: "login", days: 2, hoursPerDay: 8, hours: 16 },
        { keyword: "dashboard", days: 4, hoursPerDay: 8, hours: 32 },
        { keyword: "inventory", days: 6, hoursPerDay: 8, hours: 48 },
        { keyword: "api", days: 2, hoursPerDay: 8, hours: 16 },
    ];

    useEffect(() => {
        if (!approvedRequirements.length) return;
        const rules = {};
        approvedRequirements.forEach(req => {
            rules[req.requirementId] = customerRules[req.requirementId] ?? DEFAULT_RULES;
        });

        if (JSON.stringify(rules) !== JSON.stringify(customerRules)) {
            setCustomerRules(rules);
        }
    }, [enquiryList, customerRules, DEFAULT_RULES]);




    useEffect(() => {
        if (success) {
            alert("Estimate Saved Successfully");
        }
    }, [success]);


    useEffect(() => {
    if (success && estimate) {
        dispatch(getEstimateByRequirementId(estimate.estimateId));
    }
}, [success, estimate, dispatch]);

    const addRule = (reqId) => {
        setCustomerRules(prev => ({
            ...prev,
            [reqId]: [
                ...(prev[reqId] || DEFAULT_RULES),
                { keyword: "", days: 0, hoursPerDay: 8, hours: 0 }
            ]
        }));
    };

    const updateRule = (reqId, index, field, value) => {
        setCustomerRules(prev => {
            const rules = [...(prev[reqId] || DEFAULT_RULES)];
            rules[index] = { ...rules[index], [field]: value };
            rules[index].hours = Number(rules[index].days || 0) * Number(rules[index].hoursPerDay || 0);
            return { ...prev, [reqId]: rules };
        });
    };

    const removeRule = (reqId, index) => {
        setCustomerRules(prev => ({
            ...prev,
            [reqId]: (prev[reqId] || DEFAULT_RULES).filter((_, i) => i !== index)
        }));
    };

    // --- ENHANCED PDF GENERATION LOGIC ---
    const generatePDF = async (req, rules, settings, totalCost) => {
        const doc = new jsPDF();

        // Helper to load images securely
        const loadImage = (src) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = src;
                img.onload = () => resolve(img);
                img.onerror = (err) => reject(err);
            });
        };

        try {
            const logoImg = await loadImage(logo);
            const signImg = await loadImage(signature);

            // Calculate aspect ratio to prevent logo distortion
            const maxWidth = 45;
            const maxHeight = 20;
            const ratio = Math.min(maxWidth / logoImg.width, maxHeight / logoImg.height);
            const logoW = logoImg.width * ratio;
            const logoH = logoImg.height * ratio;

            doc.addImage(logoImg, "PNG", 14, 12, logoW, logoH);

            // Company Info on Right
            doc.setFontSize(22);
            doc.setTextColor(33, 33, 33);
            doc.setFont("helvetica", "bold");
            doc.text("DEENOVA DIGITAL", 196, 18, { align: "right" });

            doc.setFontSize(9);
            doc.setTextColor(100, 100, 100);
            doc.setFont("helvetica", "normal");
            doc.text("Software, Website & Android Development", 196, 23, { align: "right" });
            doc.text("Sangli, Maharashtra", 196, 28, { align: "right" });
            doc.text("deenovadigital@gmail.com", 196, 33, { align: "right" });

            // Divider Line
            doc.setDrawColor(220, 220, 220);
            doc.line(14, 38, 196, 38);

            // Proposal Title & Client Details
            doc.setFontSize(16);
            doc.setTextColor(41, 128, 185);
            doc.setFont("helvetica", "bold");
            doc.text("PROJECT ESTIMATION PROPOSAL", 14, 50);

            doc.setTextColor(60, 60, 60);
            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            doc.text(`Prepared For:`, 14, 60);
            doc.setFont("helvetica", "bold");
            doc.text(`${req.customerName} | ${req.companyName}`, 14, 65);

            doc.setFont("helvetica", "normal");
            doc.text(`Project ID:`, 140, 60);
            doc.text(`Date:`, 140, 65);
            doc.text(`Timeline:`, 140, 70);

            doc.setFont("helvetica", "bold");
            doc.text(`${req.requirementId}`, 165, 60);
            doc.text(`${new Date().toLocaleDateString()}`, 165, 65);
            doc.text(`${settings.months} Months`, 165, 70);

            // Project Overview
            doc.setFontSize(11);
            doc.setTextColor(33, 33, 33);
            doc.text("Project Overview", 14, 82);
            doc.setFontSize(9);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(80, 80, 80);
            const overviewText = `Thank you for choosing Deenova Digital. Based on our discussions, we have outlined the required modules and estimated effort to successfully deliver your project. The timeline below reflects dedicated development phases to ensure high-quality standards.`;
            const splitOverview = doc.splitTextToSize(overviewText, 182);
            doc.text(splitOverview, 14, 88);

            // Scope Breakdown Table
            const tableColumn = ["Module / Feature", "Estimated Effort"];
            const tableRows = rules.map((rule) => [
                rule.keyword ? rule.keyword.charAt(0).toUpperCase() + rule.keyword.slice(1) : "General Feature",
                `${rule.days} Days`
            ]);

            autoTable(doc, {
                startY: 105,
                head: [tableColumn],
                body: tableRows,
                theme: "grid",
                headStyles: { fillColor: [33, 33, 33], textColor: 255, fontStyle: "bold" },
                alternateRowStyles: { fillColor: [249, 250, 251] },
                styles: { fontSize: 9, cellPadding: 6 },
            });

            const finalY = doc.lastAutoTable?.finalY || 105;

            // Total Cost Highlight
            doc.setFillColor(235, 248, 240);
            doc.rect(14, finalY + 10, 182, 16, "F");
            doc.setTextColor(39, 174, 96);
            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            doc.text(`Total Estimated Investment: Rs. ${totalCost.toLocaleString()}`, 20, finalY + 21);

            // Payment Milestones & Terms
            doc.setTextColor(33, 33, 33);
            doc.setFontSize(11);
            doc.text("Payment Milestones & Terms:", 14, finalY + 38);

            doc.setFontSize(9);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(80, 80, 80);
            const terms = [
                "• 50% Advance - Project Initiation & UI/UX Design phase.",
                "• 25% Milestone 1 - Core Development & Beta testing.",
                "• 25% Final Delivery - Project handover and live deployment.",
                "• Validity: This estimation is valid for 15 days from the date of issue.",
                "• Maintenance: Includes 30 days of free bug-fixing support post-launch.",
                "• Exclusions: Domain, hosting, and premium 3rd-party API costs are billed separately."
            ];

            let termY = finalY + 45;
            terms.forEach(term => {
                doc.text(term, 14, termY);
                termY += 5.5;
            });

            // Signatures Footer
            const footerY = termY + 25;

            // Client Signature
            doc.setDrawColor(150, 150, 150);
            doc.line(14, footerY, 70, footerY);
            doc.setFontSize(10);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(33, 33, 33);
            doc.text("Client Approval", 14, footerY + 6);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(8);
            doc.setTextColor(100, 100, 100);
            doc.text("Signature & Date", 14, footerY + 10);

            // Deenova Signature
            doc.addImage(signImg, "PNG", 140, footerY - 18, 35, 15);
            doc.line(140, footerY, 196, footerY);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.setTextColor(33, 33, 33);
            doc.text("Authorized Signatory", 140, footerY + 6);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(8);
            doc.setTextColor(100, 100, 100);
            doc.text("Deenova Digital", 140, footerY + 10);

            // Save PDF
            doc.save(`${req.companyName.replace(/\s+/g, '_')}_Estimation.pdf`);

        } catch (error) {
            console.error("Error generating PDF. Make sure images exist.", error);
            alert("Failed to generate PDF. Check console.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50 py-8 px-4 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div>
                        <Typography variant="h4" color="blue-gray" className="font-bold">
                            Estimation & Planning
                        </Typography>
                        <Typography color="gray" className="font-normal mt-1">
                            Review requirements and generate project quotes.
                        </Typography>
                    </div>
                    <Chip color="blue" value={`${approvedRequirements.length} Approved Projects`} />
                </div>

                {/* --- EMPTY STATE --- */}
                {approvedRequirements.length === 0 && (
                    <div className="py-20 flex flex-col items-center justify-center bg-white rounded-xl border border-dashed border-gray-300">
                        <InboxIcon className="h-16 w-16 text-gray-300 mb-4" />
                        <Typography variant="h5" color="blue-gray">No Pending Estimations</Typography>
                        <Typography color="gray">Approve requirements first to see them here.</Typography>
                    </div>
                )}

                {/* --- PROJECTS LIST --- */}
                {approvedRequirements.map((req) => {
                    const reqId = req.requirementId;
                    const rate = hourlyRates[reqId] || 2000;
                    const rules = customerRules[reqId] || DEFAULT_RULES;
                    const settings = projectSettings[reqId] || { months: 3, workingDays: 26, workingHours: 8 };

                    const totalRuleHours = rules.reduce((sum, rule) => sum + Number(rule.hours || 0), 0);
                    const totalCost = totalRuleHours * rate;

                    const totalDays = settings.months * settings.workingDays;
                    const availableHours = totalDays * settings.workingHours;
                    const requiredDevelopers = Math.ceil(totalRuleHours / availableHours) || 0;

                    const hourDifference = availableHours - totalRuleHours;
                    const isHoursMatched = totalRuleHours === availableHours;

                    return (
                        <Card key={req._id} className="w-full shadow-md border border-gray-200 overflow-hidden">
                            {/* Project Header */}
                            <div className="bg-black p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <Typography variant="h5" color="white">{req.customerName}</Typography>
                                    <Typography color="gray" className="text-sm font-medium">{req.companyName}</Typography>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Chip value={`ID: ${reqId}`} color="gray" className="bg-white text-black border border-gray-300" />
                                    <Button color="green" onClick={() => generatePDF(req, rules, settings, totalCost)}>
                                        Generate PDF
                                    </Button>

                                    <Button
                                        color="green"
                                        loading={createLoading}
                                        onClick={() =>
                                            handleSaveEstimate(
                                                req,
                                                rules,
                                                settings,
                                                rate,
                                                totalRuleHours,
                                                totalCost,
                                                requiredDevelopers
                                            )
                                        }
                                    >
                                        {createLoading ? "Saving..." : "Save Estimate"}
                                    </Button>
                                </div>
                            </div>

                            <CardBody className="p-0">
                                <div className="grid grid-cols-1 xl:grid-cols-3 divide-y xl:divide-y-0 xl:divide-x divide-gray-200">

                                    {/* LEFT COLUMN: Scope & Planning */}
                                    <div className="p-6 bg-gray-50 h-full">
                                        <Typography variant="h6" color="blue-gray" className="mb-6">Resource Planning</Typography>

                                        {/* FIXED: Replaced grid with flex wrap and explicit small widths */}
                                        <div className="flex flex-wrap gap-4 mb-6">
                                            <div className="w-24">
                                                <Input type="number" label="Months" value={settings.months} color="blue"
                                                    containerProps={{ className: "min-w-6" }}
                                                    onChange={(e) => setProjectSettings(prev => ({ ...prev, [reqId]: { ...settings, months: Number(e.target.value) } }))} />
                                            </div>
                                            <div className="w-28">
                                                <Input type="number" label="Work Days" value={settings.workingDays} color="blue"
                                                    containerProps={{ className: "min-w-6" }}
                                                    onChange={(e) => setProjectSettings(prev => ({ ...prev, [reqId]: { ...settings, workingDays: Number(e.target.value) } }))} />
                                            </div>
                                            <div className="w-24">
                                                <Input type="number" label="Hrs/Day" value={settings.workingHours} color="blue"
                                                    containerProps={{ className: "min-w-6" }}
                                                    onChange={(e) => setProjectSettings(prev => ({ ...prev, [reqId]: { ...settings, workingHours: Number(e.target.value) } }))} />
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center bg-blue-50 p-4 rounded-lg border border-blue-100 mb-8">
                                            <Typography variant="small" color="blue-gray" className="font-bold">Total Capacity:</Typography>
                                            <Typography variant="h6" color="blue" className="font-bold">{availableHours} hrs / dev</Typography>
                                        </div>

                                        <div className={`mb-6 rounded-lg p-3 border ${isHoursMatched ? "bg-green-50 border-green-300" : "bg-red-50 border-red-300"}`}>
                                            <Typography variant="small" color={isHoursMatched ? "green" : "red"} className="font-bold">
                                                Rule Hours : {totalRuleHours} hrs
                                            </Typography>
                                            {!isHoursMatched && (
                                                <Typography variant="small" color="red">
                                                    Remaining Hours: {hourDifference} hrs. Total Rule Hours must equal Total Capacity ({availableHours} hrs).
                                                </Typography>
                                            )}
                                            {isHoursMatched && (
                                                <Typography variant="small" color="green">
                                                    ✓ Total Rule Hours exactly match the project capacity.
                                                </Typography>
                                            )}
                                        </div>

                                        <Typography variant="h6" color="blue-gray" className="mb-4">Approved Scope</Typography>
                                        <ul className="space-y-3">
                                            {req.requirementPoints.map((item) => (
                                                <li key={item.id} className="flex items-start gap-3 bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                                                    <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                    <Typography className="text-sm text-gray-700">{item.point}</Typography>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* RIGHT COLUMN: Rules Engine */}
                                    <div className="p-6 xl:col-span-2">
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-6">
                                            <Typography variant="h6" color="blue-gray">Estimation Rules</Typography>
                                            <div className="w-full sm:w-64">
                                                <Input type="number" label="Hourly Rate (₹)" value={rate} color="green" icon={<CurrencyRupeeIcon />}
                                                    containerProps={{ className: "min-w-0" }}
                                                    onChange={(e) => setHourlyRates((prev) => ({ ...prev, [reqId]: Number(e.target.value) }))} />
                                            </div>
                                        </div>

                                        {/* FIXED: Replaced grid with flex wrap. Number inputs get fixed small widths (w-24), text input fills remaining space (flex-1) */}
                                        <div className="space-y-4">
                                            {rules.map((rule, index) => (
                                                <div key={index} className="flex flex-wrap md:flex-nowrap items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">

                                                    {/* Keyword input takes all remaining space */}
                                                    <div className="w-full md:flex-1">
                                                        <Input label="Target Keyword" value={rule.keyword} onChange={(e) => updateRule(reqId, index, "keyword", e.target.value)} className="" />
                                                    </div>

                                                    {/* Fixed tight widths for number inputs */}
                                                    <div className="w-24">
                                                        <Input type="number" label="Days" value={rule.days}
                                                            containerProps={{ className: "min-w-10" }}
                                                            onChange={(e) => updateRule(reqId, index, "days", Number(e.target.value))} />
                                                    </div>

                                                    <div className="w-24">
                                                        <Input type="number" label="Hrs/Day" value={rule.hoursPerDay}
                                                            containerProps={{ className: "min-w-10" }}
                                                            onChange={(e) => updateRule(reqId, index, "hoursPerDay", Number(e.target.value))} />
                                                    </div>

                                                    <div className="w-28">
                                                        <Input label="Total Hrs" value={rule.hours} readOnly className="bg-gray-100 font-bold"
                                                            containerProps={{ className: "min-w-10" }} />
                                                    </div>

                                                    <div className="flex-shrink-0">
                                                        <IconButton variant="text" color="red" onClick={() => removeRule(reqId, index)}>
                                                            <TrashIcon className="h-5 w-5" />
                                                        </IconButton>
                                                    </div>

                                                </div>
                                            ))}
                                        </div>

                                        <Button variant="outlined" color="blue" className="mt-6 flex items-center gap-2" onClick={() => addRule(reqId)}>
                                            <PlusIcon className="h-4 w-4" /> Add New Rule
                                        </Button>
                                    </div>
                                </div>
                            </CardBody>

                            {/* --- SUMMARY FOOTER --- */}
                            <div className="bg-blue-50 border-t border-blue-100 p-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
                                        <div className="p-3 bg-blue-100 rounded-full text-blue-600"><ClockIcon className="h-6 w-6" /></div>
                                        <div>
                                            <Typography variant="small" color="gray" className="font-semibold uppercase">Total Hours</Typography>
                                            <Typography variant="h5" color="blue-gray" className="font-bold">{totalRuleHours}</Typography>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
                                        <div className="p-3 bg-orange-100 rounded-full text-orange-600"><UserGroupIcon className="h-6 w-6" /></div>
                                        <div>
                                            <Typography variant="small" color="gray" className="font-semibold uppercase">Developers</Typography>
                                            <Typography variant="h5" color="blue-gray" className="font-bold">{requiredDevelopers}</Typography>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
                                        <div className="p-3 bg-indigo-100 rounded-full text-indigo-600"><CalendarDaysIcon className="h-6 w-6" /></div>
                                        <div>
                                            <Typography variant="small" color="gray" className="font-semibold uppercase">Timeline</Typography>
                                            <Typography variant="h5" color="blue-gray" className="font-bold">{settings.months} Months</Typography>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 bg-green-50 p-4 rounded-lg shadow-sm border border-green-100">
                                        <div className="p-3 bg-green-100 rounded-full text-green-600"><CurrencyRupeeIcon className="h-6 w-6" /></div>
                                        <div>
                                            <Typography variant="small" color="green" className="font-semibold uppercase">Est. Cost</Typography>
                                            <Typography variant="h5" color="green" className="font-extrabold text-xl">₹{totalCost.toLocaleString()}</Typography>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}