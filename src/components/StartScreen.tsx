import React from 'react';
import { motion } from 'framer-motion';

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 flex items-center justify-center p-6"
    >
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">D&D Player Type Quiz</h1>
        <p className="text-lg text-gray-600 mb-8">
          Discover your D&D player archetype! Answer questions about your playing style
          and preferences to find out which type of player you are.
        </p>
        <button
          onClick={onStart}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium
                   hover:bg-blue-700 transition-colors"
        >
          Start Quiz
        </button>
      </div>
    </motion.div>
  );
};