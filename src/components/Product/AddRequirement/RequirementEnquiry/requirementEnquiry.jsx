import {
    Card,
    CardBody,
    Typography,
    Input,
    Select,
    Option,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRequirementEnquiry, getAllRequirementEnquiry } from "./requirementEnquirySlice";
import { ShowEnquiry } from "./ShowEnquiry/showEnquiry";

export function RequirementEnquiry() {
    const [showNoteBox, setShowNoteBox] = useState(false);
    const [showEnquiryDialog, setShowEnquiryDialog] = useState(false);

    const [notes, setNotes] = useState([]);

    const dispatch = useDispatch();

    const { loading } = useSelector(
        (state) => state.requirementEnquiry
    );

    const [currentNote, setCurrentNote] = useState("");

    const addNote = () => {
        if (!currentNote.trim()) return;

        setNotes([
            {
                id: Date.now(),
                text: currentNote,
                date: new Date().toLocaleString(),
            },
            ...notes,
        ]);

        setCurrentNote("");
    };

    const deleteNote = (id) => {
        setNotes(notes.filter((note) => note.id !== id));
    };

    const [requirement, setRequirement] = useState({
        requirementId: `REQ-${Date.now()}`,
        customerName: "",
        companyName: "",
        contactPerson: "",
        mobile: "",
        email: "",
        requirementDate: new Date().toISOString().split("T")[0],
        source: "",
        assignedSalesPerson: "",
        status: "New",
    });

    const [requirementPoints, setRequirementPoints] = useState([
        {
            id: Date.now(),
            point: "",
            createdDate: new Date().toLocaleDateString(),
        },
    ]);

   const handlePointChange = (id, value) => {
    setRequirementPoints((prev) =>
        prev.map((item) =>
            item.id === id ? { ...item, point: value } : item
        )
    );
};

  const addRequirementPoint = () => {
    setRequirementPoints((prev) => [
        ...prev,
        {
            id: Date.now(),
            point: "",
            createdDate: new Date().toLocaleDateString(),
        },
    ]);
};

    const deleteRequirementPoint = (id) => {
        setRequirementPoints((prev) =>
            prev.filter((item) => item.id !== id)
        );
    };


    const handleChange = (e) => {
        setRequirement({
            ...requirement,
            [e.target.name]: e.target.value,
        });
    };

    const handleSelect = (name, value) => {
        setRequirement({
            ...requirement,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            ...requirement,
            requirementPoints,
        };

        console.log(data);

        dispatch(createRequirementEnquiry(data));
    };


    return (
        <div className="max-w-7xl mx-auto p-8">

            <Card className="shadow-lg">

                <CardBody>

                    <div className="flex justify-between items-center mb-6 space-x-2">

                        <div>
                            <Typography variant="h4">
                                Requirement Enquiry
                            </Typography>

                            <Typography color="gray">
                                Enter customer enquiry details.
                            </Typography>
                        </div>

                        <div>
                            <Button
                                color="amber"
                                onClick={() => setShowNoteBox(true)}
                            >
                                📝 Notes ({notes.length})
                            </Button>

                            <Button
                                color="blue"
                                onClick={() => {
                                    dispatch(getAllRequirementEnquiry());
                                    setShowEnquiryDialog(true);
                                }}
                            >
                                Show Enquiry
                            </Button>
                        </div>


                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >

                        <Input
                            label="Requirement ID"
                            value={requirement.requirementId}
                            disabled
                        />

                        <Input
                            label="Customer Name *"
                            name="customerName"
                            value={requirement.customerName}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            label="Company Name *"
                            name="companyName"
                            value={requirement.companyName}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            label="Contact Person *"
                            name="contactPerson"
                            value={requirement.contactPerson}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            label="Mobile Number *"
                            name="mobile"
                            value={requirement.mobile}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            type="email"
                            label="Email Address"
                            name="email"
                            value={requirement.email}
                            onChange={handleChange}
                        />

                        <Input
                            type="date"
                            label="Requirement Date"
                            name="requirementDate"
                            value={requirement.requirementDate}
                            onChange={handleChange}
                        />

                        <Select
                            label="Source"
                            value={requirement.source}
                            onChange={(value) => handleSelect("source", value)}
                        >
                            <Option value="Website">Website</Option>
                            <Option value="Reference">Reference</Option>
                            <Option value="WhatsApp">WhatsApp</Option>
                            <Option value="Call">Call</Option>
                            <Option value="Email">Email</Option>
                            <Option value="Walk In">Walk In</Option>
                        </Select>

                        <Input
                            label="Assigned Sales Person"
                            name="assignedSalesPerson"
                            value={requirement.assignedSalesPerson}
                            onChange={handleChange}
                        />

                        <Select
                            label="Requirement Status"
                            value={requirement.status}
                            onChange={(value) => handleSelect("status", value)}
                        >
                            <Option value="New">New</Option>
                            <Option value="Discussion">Discussion</Option>
                            <Option value="Analysis">Analysis</Option>
                            <Option value="Quotation Pending">
                                Quotation Pending
                            </Option>
                            <Option value="Quotation Sent">
                                Quotation Sent
                            </Option>
                            <Option value="Approved">Approved</Option>
                            <Option value="Rejected">Rejected</Option>
                            <Option value="On Hold">On Hold</Option>
                        </Select>

                        <div className="lg:col-span-3 mt-8">

                            <div className="flex justify-between items-center mb-4">

                                <Typography variant="h5">
                                    Requirement Points
                                </Typography>

                                <Button
                                    size="sm"
                                    color="green"
                                    type="button"
                                    onClick={addRequirementPoint}
                                >
                                    + Add Point
                                </Button>

                            </div>

                            {requirementPoints.map((item, index) => (

                                <Card key={item.id} className="mb-4 border">

                                    <CardBody>

                                        <div className="grid md:grid-cols-12 gap-4 items-center">

                                            <div className="md:col-span-1">
                                                <Typography>
                                                    #{index + 1}
                                                </Typography>
                                            </div>

                                            <div className="md:col-span-7">
                                                <Input
                                                    label="Requirement Point"
                                                    value={item.point}
                                                    onChange={(e) =>
                                                        handlePointChange(item.id, e.target.value)
                                                    }
                                                />
                                            </div>

                                            <div className="md:col-span-2">
                                                <Input
                                                    label="Created Date"
                                                    value={item.createdDate}
                                                    disabled
                                                />
                                            </div>

                                            <div className="md:col-span-2">

                                                <Button
                                                    color="red"
                                                    type="button"
                                                    fullWidth
                                                    disabled={requirementPoints.length === 1}
                                                    onClick={() => deleteRequirementPoint(item.id)}
                                                >
                                                    Delete
                                                </Button>

                                            </div>

                                        </div>

                                    </CardBody>

                                </Card>

                            ))}

                        </div>
                        <div className="lg:col-span-3 flex justify-end gap-4 mt-4">

                            <Button
                                variant="outlined"
                                color="red"
                                type="reset"
                            >
                                Cancel
                            </Button>

                            <Button
                                color="blue"
                                type="submit"
                            >
                                Save Enquiry
                            </Button>

                        </div>

                    </form>

                </CardBody>

            </Card>
            <Dialog
                open={showNoteBox}
                handler={() => setShowNoteBox(false)}
                size="lg"
            >
                <DialogHeader className="flex justify-between">
                    <Typography variant="h5">
                        📝 Important Notes
                    </Typography>

                    <Button
                        variant="text"
                        color="red"
                        onClick={() => setShowNoteBox(false)}
                    >
                        ✕
                    </Button>
                </DialogHeader>

                <DialogBody divider>

                    <div className="flex gap-3 mb-5">

                        <Input
                            label="Write an important note..."
                            value={currentNote}
                            onChange={(e) => setCurrentNote(e.target.value)}
                        />

                        <Button
                            color="green"
                            onClick={addNote}
                        >
                            Add
                        </Button>

                    </div>

                    <div className="space-y-3 max-h-[400px] overflow-y-auto">

                        {notes.length === 0 && (
                            <Typography color="gray">
                                No notes added.
                            </Typography>
                        )}

                        {notes.map((note, index) => (

                            <Card key={note.id} className="border">

                                <CardBody className="py-3">

                                    <div className="flex justify-between">

                                        <div>

                                            <Typography className="font-semibold">
                                                Note #{index + 1}
                                            </Typography>

                                            <Typography className="mt-1">
                                                {note.text}
                                            </Typography>

                                            <Typography
                                                variant="small"
                                                color="gray"
                                            >
                                                {note.date}
                                            </Typography>

                                        </div>

                                        <Button
                                            size="sm"
                                            color="red"
                                            variant="text"
                                            onClick={() => deleteNote(note.id)}
                                        >
                                            Delete
                                        </Button>

                                    </div>

                                </CardBody>

                            </Card>

                        ))}

                    </div>

                </DialogBody>

                <DialogFooter>

                    <Button
                        variant="outlined"
                        color="red"
                        onClick={() => setShowNoteBox(false)}
                    >
                        Close
                    </Button>

                </DialogFooter>

            </Dialog>

            <Dialog
                open={showEnquiryDialog}
                handler={() => setShowEnquiryDialog(false)}
                size="xl"
            >
                <DialogHeader className="flex justify-between items-center">
                    <Typography variant="h5">
                        Requirement Enquiries
                    </Typography>

                    <Button
                        variant="text"
                        color="red"
                        onClick={() => setShowEnquiryDialog(false)}
                    >
                        ✕
                    </Button>
                </DialogHeader>

                <DialogBody divider className="max-h-[75vh] overflow-y-auto">
                    <ShowEnquiry />
                </DialogBody>

                <DialogFooter>
                    <Button
                        variant="outlined"
                        color="red"
                        onClick={() => setShowEnquiryDialog(false)}
                    >
                        Close
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
}