const SUGGESTIONS = [
  "What's my next event?",
  "What events am I attending this week?",
  "List all events I organize",
  "Show my Tech events",
  "What happened last week?",
  "Who's coming to events I run?",
];

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
}

export function SuggestedQuestions({ onSelect }: SuggestedQuestionsProps) {
  return (
    <div className="p-4">
      <p className="text-sm text-gray-500 mb-3">Try asking:</p>
      <div className="flex flex-wrap gap-2">
        {SUGGESTIONS.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => onSelect(q)}
            className="px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded-full
                       border border-blue-200 hover:bg-blue-100 transition-colors"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
