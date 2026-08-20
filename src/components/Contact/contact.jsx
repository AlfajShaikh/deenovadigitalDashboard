import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Input,
    Textarea,
    Checkbox,
    Button,
    IconButton,
    Chip,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createContact, deleteContact, getAllContact, updateContact } from "./contactSlice";

export function Contact() {
    const dispatch = useDispatch();

    const { contacts, loading } = useSelector((state) => state.contact);

    const [editMode, setEditMode] = useState(false);
    const [contactData, setContactData] = useState({
        name: "",
        phoneNo: "",
        message: "",
        call: true,
        email: true,
        reply: false,
    });

    useEffect(() => {
        dispatch(getAllContact());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSave = async () => {
        if (editMode) {
            await dispatch(
                updateContact({
                    contactId: contactData.contactId,
                    data: contactData,
                })
            );
        } else {
            await dispatch(createContact(contactData));
        }

        dispatch(getAllContact());
        setEditMode(false);
        setContactData({
            name: "",
            phoneNo: "",
            message: "",
            call: true,
            email: true,
            reply: false,
        });
    };

    return (
        <div className="min-h-screen bg-gray-50/50 p-4 md:p-8">
            {/* ================= Page Header ================= */}
            <div className="max-w-7xl mx-auto mb-8">
                <Typography variant="h3" color="blue-gray" className="font-bold">
                    Contact Management
                </Typography>
                <Typography color="gray" className="mt-1 font-normal text-sm md:text-base">
                    Create, update, and manage your client enquiries and follow-ups.
                </Typography>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* ================= Form Section (Left) ================= */}
                <div className="lg:col-span-5">
                    <Card className="border border-gray-200 shadow-sm sticky top-8">
                        <CardHeader
                            floated={false}
                            shadow={false}
                            className="m-0 border-b border-gray-200 p-6 rounded-none bg-transparent"
                        >
                            <Typography variant="h5" color="blue-gray">
                                {editMode ? "Update Enquiry" : "New Enquiry"}
                            </Typography>
                            <Typography color="gray" className="mt-1 text-sm font-normal">
                                Fill in the details below to save a contact.
                            </Typography>
                        </CardHeader>

                        <CardBody className="p-6 flex flex-col gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="Full Name"
                                    size="lg"
                                    value={contactData.name}
                                    onChange={(e) =>
                                        setContactData({ ...contactData, name: e.target.value })
                                    }
                                />
                                <Input
                                    label="Phone Number"
                                    size="lg"
                                    value={contactData.phoneNo}
                                    onChange={(e) =>
                                        setContactData({ ...contactData, phoneNo: e.target.value })
                                    }
                                />
                            </div>

                            <Textarea
                                label="Message / Notes"
                                size="lg"
                                rows={4}
                                value={contactData.message}
                                onChange={(e) =>
                                    setContactData({ ...contactData, message: e.target.value })
                                }
                            />

                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                                <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                                    Communication Preferences
                                </Typography>
                                <div className="flex flex-wrap gap-4">
                                    <Checkbox
                                        label="Call"
                                        color="green"
                                        checked={contactData.call}
                                        onChange={(e) =>
                                            setContactData({ ...contactData, call: e.target.checked })
                                        }
                                    />
                                    <Checkbox
                                        label="Email"
                                        color="blue"
                                        checked={contactData.email}
                                        onChange={(e) =>
                                            setContactData({ ...contactData, email: e.target.checked })
                                        }
                                    />
                                    <Checkbox
                                        label="Replied"
                                        color="purple"
                                        checked={contactData.reply}
                                        onChange={(e) =>
                                            setContactData({ ...contactData, reply: e.target.checked })
                                        }
                                    />
                                </div>
                            </div>

                            <Button
                                size="lg"
                                className="w-full flex justify-center items-center gap-2"
                                color={editMode ? "blue" : "gray"}
                                loading={loading}
                                onClick={handleSave}
                            >
                                {editMode ? (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                        </svg>
                                        Update Contact
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                        </svg>
                                        Save Contact
                                    </>
                                )}
                            </Button>
                        </CardBody>
                    </Card>
                </div>

                {/* ================= Contact List Section (Right) ================= */}
                <div className="lg:col-span-7">
                    <Card className="border border-gray-200 shadow-sm h-full">
                        <CardHeader
                            floated={false}
                            shadow={false}
                            className="m-0 border-b border-gray-200 p-6 rounded-none bg-transparent flex justify-between items-center"
                        >
                            <div>
                                <Typography variant="h5" color="blue-gray">
                                    Enquiries Directory
                                </Typography>
                                <Typography color="gray" className="mt-1 text-sm font-normal">
                                    Showing {contacts?.length || 0} registered contacts.
                                </Typography>
                            </div>
                        </CardHeader>

                        <CardBody className="p-0">
                            <div className="max-h-[calc(100vh-250px)] overflow-y-auto p-6 space-y-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
                                
                                {/* Empty State */}
                                {(!contacts || contacts.length === 0) && (
                                    <div className="text-center py-16 px-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 mx-auto text-gray-400 mb-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                        </svg>
                                        <Typography variant="h6" color="blue-gray">No Contacts Found</Typography>
                                        <Typography variant="small" color="gray" className="mt-1">
                                            Add a new contact from the form to get started.
                                        </Typography>
                                    </div>
                                )}

                                {/* Contact List Items */}
                                {contacts?.map((item) => (
                                    <Card
                                        key={item.contactId}
                                        className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 group"
                                    >
                                        <CardBody className="p-5">
                                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                                
                                                {/* Left Side: Info */}
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg">
                                                            {item.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <Typography variant="h6" color="blue-gray" className="leading-tight">
                                                                {item.name}
                                                            </Typography>
                                                            <Typography variant="small" color="blue" className="font-medium">
                                                                {item.phoneNo}
                                                            </Typography>
                                                        </div>
                                                    </div>

                                                    <Typography color="gray" className="mt-3 text-sm border-l-2 border-gray-200 pl-3">
                                                        {item.message || <span className="italic text-gray-400">No message provided</span>}
                                                    </Typography>

                                                    <div className="flex flex-wrap gap-2 mt-4">
                                                        {item.call && (
                                                            <Chip variant="ghost" color="green" size="sm" value="Call" icon={
                                                                <span className="w-2 h-2 rounded-full bg-green-500 mx-auto mt-1" />
                                                            } />
                                                        )}
                                                        {item.email && (
                                                            <Chip variant="ghost" color="blue" size="sm" value="Email" icon={
                                                                <span className="w-2 h-2 rounded-full bg-blue-500 mx-auto mt-1" />
                                                            } />
                                                        )}
                                                        <Chip 
                                                            variant="filled" 
                                                            color={item.reply ? "purple" : "amber"} 
                                                            size="sm" 
                                                            value={item.reply ? "Replied" : "Pending Reply"} 
                                                        />
                                                    </div>

                                                    <Typography variant="small" color="blue-gray" className="mt-4 text-xs font-medium opacity-60">
                                                        Added: {new Date(item.createdAt).toLocaleString()}
                                                    </Typography>
                                                </div>

                                                {/* Right Side: Actions */}
                                                <div className="flex md:flex-col gap-2 md:items-end justify-end border-t md:border-t-0 md:border-l border-gray-100 pt-3 md:pt-0 md:pl-4">
                                                    <Button
                                                        size="sm"
                                                        variant="text"
                                                        color="blue"
                                                        className="flex items-center gap-2"
                                                        onClick={() => {
                                                            setEditMode(true);
                                                            setContactData(item);
                                                        }}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>
                                                        Edit
                                                    </Button>

                                                    <Button
                                                        size="sm"
                                                        variant="text"
                                                        color="red"
                                                        className="flex items-center gap-2"
                                                        onClick={() => dispatch(deleteContact(item.contactId))}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                                                        Delete
                                                    </Button>
                                                </div>

                                            </div>
                                        </CardBody>
                                    </Card>
                                ))}
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
}