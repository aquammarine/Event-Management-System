import React from 'react';
import { useTagsStore } from '../../stores/tagsStore';
import { TagChip } from '../TagChip/TagChip';

interface ActiveFiltersProps {
    activeTags: string[];
    onRemove: (tagId: string) => void;
    onClear: () => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({ activeTags, onRemove, onClear }) => {
    const { getTagById } = useTagsStore();

    if (activeTags.length === 0) return null;

    return (
        <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-slate-500 mr-1">Filtered by:</span>
            {activeTags.map(tagId => {
                const tag = getTagById(tagId);
                if (!tag) return null;
                return (
                    <TagChip 
                        key={tagId} 
                        tag={tag} 
                        onRemove={() => onRemove(tagId)}
                        size="sm"
                    />
                );
            })}
            <button 
                onClick={onClear}
                className="text-xs text-slate-400 hover:text-slate-600 transition-colors ml-1 font-medium underline"
            >
                Clear all
            </button>
        </div>
    );
};

export { ActiveFilters };
