import React from 'react';

interface FormattedDialogueProps {
  text: string;
}

const FormattedDialogue: React.FC<FormattedDialogueProps> = ({ text }) => {
  const dialogueText = text || ''; // Guard against null/undefined

  if (!dialogueText.includes('"')) {
    // If there are no quotes, it's likely pure narration or a thought.
    return <span className="text-gray-300 italic">{dialogueText}</span>;
  }
  
  const parts = dialogueText.split('"');

  return (
    <>
      {parts.map((part, index) => {
        if (!part) return null; // Don't render empty parts from split

        if (index % 2 === 1) {
          // This is a speech part (inside quotes)
          return (
            <span key={index} className="text-yellow-200 font-semibold">
              "{part}"
            </span>
          );
        } else {
          // This is a narration part (outside quotes)
          return (
            <span key={index} className="text-gray-300">
              {part}
            </span>
          );
        }
      })}
    </>
  );
};

export default FormattedDialogue;