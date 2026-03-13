import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEventsStore } from '../stores/events.store';
import { createEventSchema } from '../features/CreateEvent/createEvent.schema';
import { eventsApi } from '../api/eventsApi'; // ADDED
import { tagsApi } from '../api/tags'; // ADDED
import type { ZodError } from 'zod';

interface CreateEventForm {
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    capacity: string;
    isPublic: boolean;
}

type FormFieldKeys = keyof CreateEventForm;

export const useCreateEventForm = () => {
    const { fetchPublicEvents } = useEventsStore(); // CHANGED: removed createEvent, added fetchPublicEvents
    const navigate = useNavigate();

    const [form, setForm] = useState<CreateEventForm>({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        capacity: '',
        isPublic: true,
    });

    const [fieldErrors, setFieldErrors] = useState<Partial<Record<FormFieldKeys, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // ADDED: Tags state and local error state
    const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
    const [tagsError, setTagsError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFieldErrors({});
        setTagsError(null);

        try {
            const validated = createEventSchema.parse(form);
            const dateTime = new Date(`${validated.date}T${validated.time}`).toISOString();
            const capacityValue = validated.capacity === 0 || validated.capacity === undefined
                ? null
                : validated.capacity;

            setIsSubmitting(true);

            // Step 1: create the event
            const newEvent = await eventsApi.create({
                title: validated.title,
                description: validated.description,
                dateTime,
                location: validated.location,
                capacity: capacityValue as number | undefined,
                isPublic: validated.isPublic,
            });

            // Step 2: if tags were selected, attach them
            if (selectedTagIds.length > 0) {
                try {
                    await tagsApi.updateEventTags(newEvent.id, selectedTagIds);
                } catch (tagErr) {
                    console.error("Failed to update tags:", tagErr);
                    setTagsError("Event created but tags could not be saved. You can edit tags later.");
                    // Refresh store anyway since event was created
                    await fetchPublicEvents();
                    // Still navigate after a short delay so user sees the error
                    setTimeout(() => {
                        navigate('/events/' + newEvent.id);
                    }, 3000);
                    return;
                }
            }

            // Step 3: Refresh store and navigate
            await fetchPublicEvents();
            navigate('/events/' + newEvent.id);
        } catch (err: any) {
            if (err?.name === 'ZodError') {
                const zodError = err as ZodError;
                const errors: Partial<Record<FormFieldKeys, string>> = {};
                zodError.issues.forEach((issue) => {
                    const field = issue.path[0] as FormFieldKeys;
                    if (!errors[field]) errors[field] = issue.message;
                });
                setFieldErrors(errors);
            } else {
                const apiErrorMessage = err?.response?.data?.message || err?.message || 'Failed to create event';
                setFieldErrors({ title: apiErrorMessage });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        form,
        setForm,
        fieldErrors,
        setFieldErrors,
        handleSubmit,
        isSubmitting,
        setIsSubmitting,
        selectedTagIds,
        setSelectedTagIds,
        tagsError,
    };
};
