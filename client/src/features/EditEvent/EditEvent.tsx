import { ArrowLeft, Loader2 } from "lucide-react";
import { Button, Card, Error, FormField, Header, InfoItem, RadioGroup, TextArea } from "../../components/common";
import { useNavigate, useParams } from "react-router-dom";
import { useEditEventForm } from "../../hooks/useEditEventForm";
import { useEventsStore } from "../../stores/events.store";
import { TagsMultiSelect } from "../../components/TagsMultiSelect/TagsMultiSelect"; // ADDED

const EditEvent: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { error: storeError } = useEventsStore();
    const { 
        form, 
        setForm, 
        fieldErrors, 
        handleSubmit, 
        isSubmitting, 
        isLoading,
        selectedTagIds,
        setSelectedTagIds,
        tagsError
    } = useEditEventForm(id); // CHANGED: destructuring new tags fields

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
            </div>
        );
    }

    if (!id) {
        return <Error message="Event ID is required" />;
    }

    return (
        <form
            className="flex flex-col justify-center items-center gap-6 my-6"
            onSubmit={handleSubmit}
        >
            <div className="w-full max-w-2xl">
                <Button type="button" variant="ghost" icon={ArrowLeft} onClick={() => navigate(-1)}>Back</Button>
            </div>
            <Card className="w-full max-w-2xl flex flex-col gap-8 p-8">
                <Header
                    title="Edit Event"
                    subtitle="Update your event details"
                    variant="lg"
                    className="flex flex-col items-center self-start"
                />

                {storeError && <Error message={storeError} />}
                {tagsError && <div className="bg-amber-50 border border-amber-200 text-amber-700 px-4 py-3 rounded-lg text-sm">{tagsError}</div>} {/* ADDED: Tags warning banner */}

                <FormField
                    id="title"
                    label="Event Title"
                    name="title"
                    type="text"
                    placeholder="e.g. Tech Conference 2024"
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    error={fieldErrors.title}
                />
                <TextArea
                    id="description"
                    label="Description"
                    name="description"
                    placeholder="Describe what makes your event special..."
                    required
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    error={fieldErrors.description}
                />
                <div className="flex gap-2">
                    <FormField
                        id="date"
                        label="Date"
                        name="date"
                        type="date"
                        className="w-full"
                        required
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        error={fieldErrors.date}
                    />
                    <FormField
                        id="time"
                        label="Time"
                        name="time"
                        type="time"
                        className="w-full"
                        required
                        value={form.time}
                        onChange={(e) => setForm({ ...form, time: e.target.value })}
                        error={fieldErrors.time}
                    />
                </div>
                <FormField
                    id="location"
                    label="Location"
                    name="location"
                    type="text"
                    placeholder="e.g. Convention Center, San Francisco"
                    required
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    error={fieldErrors.location}
                />
                <div className="flex flex-col gap-2">
                    <FormField
                        id="capacity"
                        label="Capacity (optional)"
                        name="capacity"
                        type="number"
                        placeholder="Leave empty for unlimited"
                        value={form.capacity}
                        onChange={(e) => setForm({ ...form, capacity: e.target.value })}
                        error={fieldErrors.capacity}
                    />
                    <InfoItem
                        text={"Maximum number of participants. Leave empty or set to 0 for unlimited capacity."}
                    />
                </div>

                {/* ADDED: Tags Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tags <span className="text-gray-400 font-normal">(optional, max 5)</span>
                    </label>
                    <TagsMultiSelect
                        value={selectedTagIds}
                        onChange={setSelectedTagIds}
                        disabled={false}
                    />
                </div>

                <RadioGroup
                    label="Visibility"
                    name="visibility"
                    options={[
                        { label: "Public - Anyone can see and join this event", value: "public" },
                        { label: "Private - Only invited people can see this event", value: "private" },
                    ]}
                    value={form.isPublic ? "public" : "private"}
                    onChange={(value) => setForm({ ...form, isPublic: value === "public" })}
                />
                <div className="flex gap-4 h-fit">
                    <Button
                        type="button"
                        variant="ghost"
                        className="border border-slate-200 bg-[#FCFCFD] w-full p-0"
                        onClick={() => navigate(-1)}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full p-0"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Updating...' : 'Update Event'}
                    </Button>
                </div>
            </Card>
        </form>
    );
};

export { EditEvent };
