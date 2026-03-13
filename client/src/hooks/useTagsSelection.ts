import { useEffect, useMemo } from 'react';
import { useTagsStore } from '../stores/tagsStore';

export const useTagsSelection = (
  value: string[],
  onChange: (ids: string[]) => void,
  disabled?: boolean
) => {
  const { tags, isLoading, fetchTags, getTagById } = useTagsStore();

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  const selectedTags = useMemo(
    () => value.map((id) => getTagById(id)).filter(Boolean),
    [value, getTagById]
  );

  const isMaxReached = value.length >= 5;

  const toggleTag = (tagId: string) => {
    if (disabled) return;

    if (value.includes(tagId)) {
      onChange(value.filter((id) => id !== tagId));
    } else if (!isMaxReached) {
      onChange([...value, tagId]);
    }
  };

  const removeTag = (tagId: string) => {
    if (disabled) return;
    onChange(value.filter((id) => id !== tagId));
  };

  return {
    tags,
    isLoading,
    selectedTags,
    isMaxReached,
    toggleTag,
    removeTag,
  };
};
