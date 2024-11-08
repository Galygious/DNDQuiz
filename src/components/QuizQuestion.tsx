import React from 'react';

interface QuizQuestionProps {
  questionText: string;
  questionArchetypeCode: string; // New prop for archetype code
  onAnswer: (answer: 'yes' | 'no' | 'maybe') => void;
  onQuit: () => void; // Prop for quit functionality
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({ questionText, questionArchetypeCode, onAnswer, onQuit }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-6">{questionText}</h2>
      <p className="text-gray-500 mb-4">Archetype Code: {questionArchetypeCode}</p> {/* Display the archetype code */}

      <div className="grid grid-cols-3 gap-4">
        {(['yes', 'maybe', 'no'] as const).map((answer) => (
          <button
            key={answer}
            onClick={() => onAnswer(answer)}
            className="px-6 py-3 rounded-lg text-white font-medium transition-colors
                     hover:opacity-90 active:opacity-75"
            style={{
              backgroundColor: answer === 'yes' ? '#4CAF50' : 
                             answer === 'maybe' ? '#FFA726' : 
                             '#F44336'
            }}
          >
            {answer.charAt(0).toUpperCase() + answer.slice(1)}
          </button>
        ))}
      </div>

      {/* Quit Button */}
      <button
        onClick={onQuit} // Call the quit function when clicked
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg"
      >
        Quit Quiz
      </button>
    </div>
  );
};
