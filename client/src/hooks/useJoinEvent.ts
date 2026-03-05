import { useState } from 'react';
import { useEventsStore } from '../stores/events.store';

export const useJoinEvent = () => {
    const { joinEvent, leaveEvent } = useEventsStore();
    const [isPending, setIsPending] = useState(false);

    const handleJoin = async (eventId: string) => {
        setIsPending(true);
        await joinEvent(eventId);
        setIsPending(false);
    };

    const handleLeave = async (eventId: string) => {
        setIsPending(true);
        await leaveEvent(eventId);
        setIsPending(false);
    };

    return {
        handleJoin,
        handleLeave,
        isPending
    };
};