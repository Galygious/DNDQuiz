import React from 'react';
import { motion } from 'framer-motion';
import { ArchetypeScore, Archetype } from '../types';
import { archetypes } from '../data/archetypes';

interface Props {
  scores: ArchetypeScore[];
  onRestart: () => void;
}

export const Results: React.FC<Props> = ({ scores, onRestart }) => {
  const getArchetype = (abbreviation: string): Archetype => {
    return archetypes.find(a => a.abbreviation === abbreviation) || archetypes[0];
  };

  const topScore = scores[0].score;
  const dominantTypes = scores.filter(score => score.score === topScore);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto p-6"
    >
      <h1 className="text-3xl font-bold text-center mb-8">Your D&D Player Type Results</h1>

      {dominantTypes.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            {dominantTypes.length === 1 ? 'Your dominant type is:' : 'Your dominant types are:'}
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {dominantTypes.map(type => {
              const archetype = getArchetype(type.abbreviation);
              return (
                <div key={type.abbreviation} className="bg-blue-50 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold text-blue-900 mb-2">{archetype.name}</h3>
                  <p className="text-blue-800 mb-4">{archetype.description}</p>
                  <div className="mb-2">
                    <h4 className="font-semibold text-blue-900">Ideal Game:</h4>
                    <p className="text-blue-800">{archetype.idealGame}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Potential Conflicts:</h4>
                    <p className="text-blue-800">{archetype.potentialConflicts}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">All Type Scores</h2>
        <div className="space-y-4">
          {scores.map(score => (
            <div key={score.abbreviation} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{score.name}</span>
                <span className="text-gray-600">{score.score}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${score.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={onRestart}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium
                   hover:bg-blue-700 transition-colors"
        >
          Take Quiz Again
        </button>
      </div>
    </motion.div>
  );
};