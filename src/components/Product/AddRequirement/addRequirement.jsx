import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export function AddRequirement() {

    const navigate = useNavigate();

    const modules = [
        {
            title: "Requirement Enquiry",
            description: "Capture customer enquiry and project details.",
            path: "/products/requirement-enquiry",
            icon: "📋",
        },
        {
            title: "Requirement Discussion",
            description: "Record discussion notes and meetings.",
            path: "/products/requirement-discussion",
            icon: "💬",
        },
        {
            title: "Requirement Document Upload",
            description: "Upload BRD, SRS, Images and Files.",
            path: "/products/requirement-documents",
            icon: "📁",
        },
        {
            title: "Requirement Approval",
            description: "Approve or Reject customer requirements.",
            path: "/products/requirement-approval",
            icon: "✅",
        },
        {
            title: "Requirement Estimation",
            description: "Estimate cost, developers and timeline.",
            path: "/products/requirement-estimation",
            icon: "💰",
        },
    ];

    return (
        <div className="max-w-7xl mx-auto p-8">

            <Typography variant="h3" className="mb-2">
                New Requirement
            </Typography>

            <Typography color="gray" className="mb-8">
                Choose the next process.
            </Typography>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {modules.map((module) => (

                    <Card
                        key={module.title}
                        className="cursor-pointer hover:shadow-xl transition-all"
                        onClick={() => navigate(module.path)}
                    >
                        <CardBody>

                            <div className="text-5xl mb-4">
                                {module.icon}
                            </div>

                            <Typography variant="h5">
                                {module.title}
                            </Typography>

                            <Typography color="gray" className="mt-2">
                                {module.description}
                            </Typography>

                        </CardBody>
                    </Card>

                ))}

            </div>

        </div>
    );
}