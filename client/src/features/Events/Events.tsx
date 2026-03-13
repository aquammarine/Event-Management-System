import { Input, Header } from "../../components/common";
import { Search } from "lucide-react";
import { EventList } from "../../components/EventList";
import { useState } from "react";
import { ActiveFilters } from "../../components/ActiveFilters"; // ADDED

const Events: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTags, setActiveTags] = useState<string[]>([]);

    const handleTagClick = (tagId: string) => {
        if (!activeTags.includes(tagId)) {
            setActiveTags([...activeTags, tagId]);
        }
    };

    const handleRemoveTag = (tagId: string) => {
        setActiveTags(activeTags.filter(id => id !== tagId));
    };

    return (
        <div className="">
            <Header title="Discover Events" subtitle="Find and join exciting events happening around you" className="mt-10" />
            <div className="mt-8 flex flex-col gap-4">
                <Input
                    placeholder="Search events..."
                    icon={Search}
                    className="max-w-md"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <ActiveFilters 
                    activeTags={activeTags}
                    onRemove={handleRemoveTag}
                    onClear={() => setActiveTags([])}
                />
            </div>
            <EventList 
                searchQuery={searchQuery} 
                activeTags={activeTags}
                onTagClick={handleTagClick}
            />
        </div>
    );
};

export { Events };