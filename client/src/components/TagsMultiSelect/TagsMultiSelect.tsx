import { Check, ChevronDown } from 'lucide-react';
import { useDropdown } from '../../hooks/useDropdown';
import { useTagsSelection } from '../../hooks/useTagsSelection';
import { TagChip } from '../TagChip/TagChip';
import { Button } from '../common/Button';

interface TagsMultiSelectProps {
  value: string[];
  onChange: (ids: string[]) => void;
  disabled?: boolean;
}

export function TagsMultiSelect({ value, onChange, disabled }: TagsMultiSelectProps) {
  const { isOpen, toggle, containerRef } = useDropdown<HTMLDivElement>();
  const { tags, isLoading, selectedTags, isMaxReached, toggleTag, removeTag } =
    useTagsSelection(value, onChange, disabled);

  return (
    <div ref={containerRef} className="relative inline-block w-full">
      <div className="flex flex-wrap gap-2 mb-2 min-h-[1.75rem]">
        {selectedTags.map(
          (tag) =>
            tag && (
              <TagChip
                key={tag.id}
                tag={tag}
                onRemove={disabled ? undefined : () => removeTag(tag.id)}
              />
            )
        )}
      </div>

      <Button
        type="button"
        disabled={disabled || isLoading}
        onClick={toggle}
        variant="ghost"
        className={`
          flex items-center justify-between w-full px-3 py-2 text-sm text-left bg-white border rounded-lg transition-colors
          ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'hover:border-gray-400 border-gray-300'}
        `}
      >
        <span className="text-gray-500">
          {isLoading ? 'Loading tags...' : 'Add tags'}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </Button>

      {isOpen && !disabled && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto py-1">
          {tags.length === 0 && !isLoading && (
            <div className="px-3 py-2 text-sm text-gray-500 text-center">No tags found</div>
          )}
          {tags.map((tag) => {
            const isSelected = value.includes(tag.id);
            const canSelect = isSelected || !isMaxReached;

            return (
              <button
                key={tag.id}
                type="button"
                disabled={!canSelect}
                onClick={() => toggleTag(tag.id)}
                className={`
                  flex items-center justify-between w-full px-3 py-2 text-sm transition-colors
                  ${!canSelect ? 'opacity-50 cursor-not-allowed text-gray-400' : 'hover:bg-gray-50 text-gray-700'}
                `}
              >
                <div className="flex items-center gap-2">
                  <TagChip tag={tag} size="sm" />
                  <span>{tag.name}</span>
                </div>
                {isSelected && <Check className="w-4 h-4 text-[#6366F0]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
