import { Input, Header } from "../../components/common";
import { Search } from "lucide-react";
import { EventList } from "../../components/EventList";
import { useState } from "react";
import { useJoinEvent } from "../../hooks/useJoinEvent";

const Events: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const { handleJoin, isPending } = useJoinEvent();

    return (
        <div className="">
            <Header title="Discover Events" subtitle="Find and join exciting events happening around you" className="mt-10" />
            <div className="mt-8">
                <Input
                    placeholder="Search events..."
                    icon={Search}
                    className="max-w-md"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <EventList searchQuery={searchQuery} handleJoin={handleJoin} isPending={isPending} />
        </div>
    );
};

export { Events };