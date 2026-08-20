import { useEffect, useState } from "react";
import {
    Button, Dialog, DialogBody, DialogHeader, Typography,
    Input, Textarea, Chip, IconButton, Select, Option
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { createNote, deleteNote, getAllNotes, updateNote } from "../requirementEnquirySlice";

export function Notes({ open, handleClose }) {
    const dispatch = useDispatch();
    const { notes, loading } = useSelector((state) => state.requirementEnquiry);

    const [noteData, setNoteData] = useState({
        title: "", description: "", category: "General", priority: "Medium", dueDate: ""
    });
    const [editMode, setEditMode] = useState(false);

    useEffect(() => { if (open) dispatch(getAllNotes()); }, [dispatch, open]);

    const handleSave = async () => {
        if (!noteData.title || !noteData.description) return alert("Please fill title and description");
        editMode ? await dispatch(updateNote({ noteId: noteData.noteId, data: noteData })) : await dispatch(createNote(noteData));
        dispatch(getAllNotes());
        setEditMode(false);
        setNoteData({ title: "", description: "", category: "General", priority: "Medium", dueDate: "" });
    };

    return (
        <Dialog open={open} handler={handleClose} size="xl" className="rounded-3xl overflow-hidden shadow-2xl">
            <DialogHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
                <Typography variant="h4">Requirement Workspace</Typography>
            </DialogHeader>

            <DialogBody className="p-8 bg-gray-50 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Form */}
                <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-fit">
                    <Typography variant="h6" className="mb-4 text-blue-gray-800">
                        {editMode ? "Edit Requirement" : "Create New Note"}
                    </Typography>
                    <div className="space-y-4">
                        <Input label="Title" value={noteData.title} onChange={(e) => setNoteData({ ...noteData, title: e.target.value })} />

                        <Select label="Category" value={noteData.category} onChange={(val) => setNoteData({ ...noteData, category: val })}>
                            <Option value="General">General</Option>
                            <Option value="Technical">Technical</Option>
                            <Option value="Financial">Financial</Option>
                        </Select>

                        <Select label="Priority" value={noteData.priority} onChange={(val) => setNoteData({ ...noteData, priority: val })}>
                            <Option value="Low">Low</Option>
                            <Option value="Medium">Medium</Option>
                            <Option value="High">High</Option>
                        </Select>

                        <Input type="date" label="Due Date" value={noteData.dueDate} onChange={(e) => setNoteData({ ...noteData, dueDate: e.target.value })} />
                        <Textarea label="Description" rows={4} value={noteData.description} onChange={(e) => setNoteData({ ...noteData, description: e.target.value })} />

                        <Button fullWidth color={editMode ? "indigo" : "green"} onClick={handleSave} loading={loading}>
                            {editMode ? "Save Changes" : "Create Note"}
                        </Button>
                    </div>
                </div>

                {/* Right Column: List */}
                <div className="lg:col-span-2 space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                    {notes.map((note) => (
                        <div key={note.id} className="bg-white p-5 rounded-xl border border-blue-gray-100 hover:shadow-md transition-shadow flex justify-between items-start">
                            <div className="flex-1">
                                <div className="flex gap-2 mb-2">
                                    <Chip value={note.category} size="sm" color="blue" variant="outlined" />
                                    <Chip value={note.priority} size="sm" color={note.priority === "High" ? "red" : "amber"} />
                                </div>
                                <Typography variant="h6" className="text-blue-gray-900">{note.title}</Typography>
                                <Typography className="text-sm text-gray-600 mt-1 mb-3">{note.description}</Typography>
                                <Typography variant="small" className="text-gray-400 italic">Due: {note.dueDate}</Typography>
                            </div>
                            <div className="flex flex-col gap-1">
                                <IconButton variant="text" size="sm" onClick={() => { setEditMode(true); setNoteData({ ...note, dueDate: note.dueDate?.split("T")[0] }); }}>✏️</IconButton>
                                <IconButton variant="text" size="sm" color="red" onClick={() => dispatch(deleteNote(note.noteId)).then(() => dispatch(getAllNotes()))}>🗑️</IconButton>
                            </div>
                        </div>
                    ))}
                </div>
            </DialogBody>
        </Dialog>
    );
}