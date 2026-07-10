import {
    Card,
    CardBody,
    Typography,
    Chip,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
} from "@material-tailwind/react";

import { useDispatch, useSelector } from "react-redux";
import { deleteRequirementEnquiry, updateRequirementEnquiry } from "../requirementEnquirySlice";
import { useState } from "react";

export function ShowEnquiry() {

    const { enquiryList, loading } = useSelector(
        (state) => state.requirementEnquiry
    );
    const dispatch = useDispatch()
    const [editing, setEditing] = useState(null);

    const handleEdit = (item) => {
        setEditing(item);
    };

    const addRequirementPoint = () => {
        setEditing({
            ...editing,
            requirementPoints: [
                ...editing.requirementPoints,
                {
                    id: Date.now(),
                    point: "",
                    createdDate: new Date().toLocaleDateString(),
                },
            ],
        });
    };

    const deleteRequirementPoint = (id) => {
        setEditing({
            ...editing,
            requirementPoints: editing.requirementPoints.filter(
                (item) => item.id !== id
            ),
        });
    };

    const handleUpdate = () => {
        dispatch(
            updateRequirementEnquiry({
                requirementId: editing.requirementId,
                data: editing,
            })
        );
    };

    if (loading) {
        return (
            <Typography className="text-center">
                Loading...
            </Typography>
        );
    }

    if (enquiryList.length === 0) {
        return (
            <Typography className="text-center">
                No Enquiry Found
            </Typography>
        );
    }

    return (
        <div className="space-y-6">

            {enquiryList.map((item) => (

                <Card key={item._id} className="border shadow">

                    <CardBody>

                        {/* Header */}

                        <div className="flex justify-between items-center mb-5">

                            <div>

                                <Typography variant="h5">
                                    {item.requirementId}
                                </Typography>

                                <Typography color="gray">
                                    {item.companyName}
                                </Typography>

                            </div>

                            <Chip
                                value={item.status}
                                color={
                                    item.status === "Approved"
                                        ? "green"
                                        : item.status === "Rejected"
                                            ? "red"
                                            : item.status === "Discussion"
                                                ? "amber"
                                                : "blue"
                                }
                            />

                        </div>

                        {/* Customer Details */}

                        <div className="grid md:grid-cols-2 gap-5">

                            <Card className="border">
                                <CardBody>

                                    <Typography variant="h6" className="mb-3">
                                        Customer Details
                                    </Typography>

                                    <Typography>
                                        <b>Customer :</b> {item.customerName}
                                    </Typography>

                                    <Typography>
                                        <b>Company :</b> {item.companyName}
                                    </Typography>

                                    <Typography>
                                        <b>Contact :</b> {item.contactPerson}
                                    </Typography>

                                    <Typography>
                                        <b>Mobile :</b> {item.mobile}
                                    </Typography>

                                    <Typography>
                                        <b>Email :</b> {item.email}
                                    </Typography>

                                </CardBody>
                            </Card>

                            <Card className="border">
                                <CardBody>

                                    <Typography variant="h6" className="mb-3">
                                        Enquiry Details
                                    </Typography>

                                    <Typography>
                                        <b>Source :</b> {item.source}
                                    </Typography>

                                    <Typography>
                                        <b>Status :</b> {item.status}
                                    </Typography>

                                    <Typography>
                                        <b>Created :</b>{" "}
                                        {new Date(item.createdAt).toLocaleString()}
                                    </Typography>

                                </CardBody>
                            </Card>

                        </div>

                        {/* Requirement Points */}

                        <Card className="border mt-5">

                            <CardBody>



                                {item.requirementPoints.map((point, index) => (

                                    <Card
                                        key={point.id}
                                        className="border mb-3 bg-blue-50"
                                    >
                                        <CardBody className="py-3">

                                            <Typography>
                                                <b>{index + 1}.</b> {point.point}
                                            </Typography>

                                            <Typography
                                                variant="small"
                                                color="gray"
                                            >
                                                {point.createdDate}
                                            </Typography>

                                            <div className="flex gap-3 mt-6 justify-end">

                                                <Button
                                                    color="green"
                                                    onClick={() => handleEdit(item)}
                                                >
                                                    Edit
                                                </Button>

                                                <Button
                                                    color="red"
                                                    onClick={() => {
                                                        if (window.confirm("Delete this enquiry?")) {
                                                            dispatch(deleteRequirementEnquiry(item.requirementId));
                                                        }
                                                    }}
                                                >
                                                    Delete
                                                </Button>

                                            </div>
                                        </CardBody>

                                    </Card>

                                ))}

                            </CardBody>

                        </Card>

                    </CardBody>

                </Card>

            ))}

            <Dialog
                open={editing !== null}
                handler={() => setEditing(null)}
            >
                <DialogHeader>
                    Edit Requirement
                </DialogHeader>

                <DialogBody className="max-h-[70vh] overflow-y-auto">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <Input
                            label="Requirement ID"
                            value={editing?.requirementId || ""}
                            disabled
                        />

                        <Input
                            label="Customer Name"
                            value={editing?.customerName || ""}
                            onChange={(e) =>
                                setEditing({
                                    ...editing,
                                    customerName: e.target.value,
                                })
                            }
                        />

                        <Input
                            label="Company Name"
                            value={editing?.companyName || ""}
                            onChange={(e) =>
                                setEditing({
                                    ...editing,
                                    companyName: e.target.value,
                                })
                            }
                        />

                        <Input
                            label="Contact Person"
                            value={editing?.contactPerson || ""}
                            onChange={(e) =>
                                setEditing({
                                    ...editing,
                                    contactPerson: e.target.value,
                                })
                            }
                        />

                        <Input
                            label="Mobile"
                            value={editing?.mobile || ""}
                            onChange={(e) =>
                                setEditing({
                                    ...editing,
                                    mobile: e.target.value,
                                })
                            }
                        />

                        <Input
                            label="Email"
                            value={editing?.email || ""}
                            onChange={(e) =>
                                setEditing({
                                    ...editing,
                                    email: e.target.value,
                                })
                            }
                        />

                        <Input
                            label="Source"
                            value={editing?.source || ""}
                            onChange={(e) =>
                                setEditing({
                                    ...editing,
                                    source: e.target.value,
                                })
                            }
                        />

                        <Input
                            label="Status"
                            value={editing?.status || ""}
                            onChange={(e) =>
                                setEditing({
                                    ...editing,
                                    status: e.target.value,
                                })
                            }
                        />

                    </div>

                    <Typography
                        variant="h6"
                        className="mt-6 mb-3"
                    >
                        Requirement Points
                    </Typography>
                    <div className="flex justify-between items-center mt-6 mb-3">

                        <Typography variant="h6">
                            Requirement Points
                        </Typography>

                        <Button
                            color="green"
                            size="sm"
                            onClick={addRequirementPoint}
                        >
                            + Add Point
                        </Button>

                    </div>
                    {editing?.requirementPoints?.map((point, index) => (

                        <Card key={point.id} className="mb-3 border">

                            <CardBody>

                                <Input
                                    label={`Requirement Point ${index + 1}`}
                                    value={point.point}
                                    onChange={(e) => {

                                        const updated = [...editing.requirementPoints];

                                        updated[index] = {
                                            ...updated[index],
                                            point: e.target.value,
                                        };

                                        setEditing({
                                            ...editing,
                                            requirementPoints: updated,
                                        });

                                    }}
                                />

                                <div className="flex justify-between items-center mt-3">

                                    <Typography
                                        variant="small"
                                        color="gray"
                                    >
                                        {point.createdDate}
                                    </Typography>

                                    <Button
                                        color="red"
                                        size="sm"
                                        disabled={editing.requirementPoints.length === 1}
                                        onClick={() => deleteRequirementPoint(point.id)}
                                    >
                                        Delete
                                    </Button>

                                </div>

                            </CardBody>

                        </Card>

                    ))}

                </DialogBody>

                <DialogFooter>

                    <Button
                        variant="text"
                        onClick={() => setEditing(null)}
                    >
                        Cancel
                    </Button>

                    <Button
                        color="green"
                        onClick={() => {

                            dispatch(
                                updateRequirementEnquiry({
                                    requirementId: editing.requirementId,
                                    data: editing,
                                })
                            );

                            setEditing(null);
                        }}
                    >
                        Update
                    </Button>

                </DialogFooter>

            </Dialog>
        </div>
    );
}