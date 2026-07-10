import {
    Card,
    CardBody,
    Typography,
    Input,
    Textarea,
    Select,
    Option,
    Button,
} from "@material-tailwind/react";
import { useState } from "react";

export function RequirementDiscussion() {

    const [discussion, setDiscussion] = useState({
        meetingDate: new Date().toISOString().slice(0, 16),
        meetingType: "",
        participants: "",
        discussionNotes: "",
        questionsAsked: "",
        audio: null,
        video: null,
        documents: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setDiscussion({
            ...discussion,
            [name]: files ? files : value,
        });
    };

    const handleSelect = (value) => {
        setDiscussion({
            ...discussion,
            meetingType: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(discussion);

        // dispatch(createRequirementDiscussion(discussion))
    };

    return (
        <div className="max-w-6xl mx-auto p-6">

            <Card className="shadow-lg">

                <CardBody>

                    <Typography variant="h4">
                        Requirement Discussion
                    </Typography>

                    <Typography color="gray" className="mb-6">
                        Store every discussion held with the client.
                    </Typography>

                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >

                        <Input
                            type="datetime-local"
                            label="Meeting Date & Time"
                            name="meetingDate"
                            value={discussion.meetingDate}
                            onChange={handleChange}
                        />

                        <Select
                            label="Meeting Type"
                            value={discussion.meetingType}
                            onChange={handleSelect}
                        >
                            <Option value="Online">Online</Option>
                            <Option value="Offline">Offline</Option>
                            <Option value="Phone">Phone</Option>
                        </Select>

                        <Input
                            label="Participants"
                            name="participants"
                            value={discussion.participants}
                            onChange={handleChange}
                        />

                        <div></div>

                        <div className="md:col-span-2">

                            <Textarea
                                label="Discussion Notes"
                                name="discussionNotes"
                                value={discussion.discussionNotes}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="md:col-span-2">

                            <Textarea
                                label="Questions Asked"
                                name="questionsAsked"
                                value={discussion.questionsAsked}
                                onChange={handleChange}
                            />

                        </div>

                        <div>

                            <Typography className="mb-2 font-medium">
                                Attach Audio
                            </Typography>

                            <Input
                                type="file"
                                name="audio"
                                accept="audio/*"
                                onChange={handleChange}
                            />

                        </div>

                        <div>

                            <Typography className="mb-2 font-medium">
                                Attach Video
                            </Typography>

                            <Input
                                type="file"
                                name="video"
                                accept="video/*"
                                onChange={handleChange}
                            />

                        </div>

                        <div className="md:col-span-2">

                            <Typography className="mb-2 font-medium">
                                Attach Documents
                            </Typography>

                            <Input
                                type="file"
                                name="documents"
                                multiple
                                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.rar,.txt"
                                onChange={handleChange}
                            />

                        </div>

                        <div className="md:col-span-2 flex justify-end gap-3">

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
                                Save Discussion
                            </Button>

                        </div>

                    </form>

                </CardBody>

            </Card>

        </div>
    );
}