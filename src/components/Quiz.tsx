import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Question, ArchetypeScore } from '../types';
import { archetypes } from '../data/archetypes';
import { QuizProgress } from './QuizProgress';
import { QuizQuestion } from './QuizQuestion';

interface Props {
  questions: Question[];
  onComplete: (scores: ArchetypeScore[]) => void;
}

export const Quiz: React.FC<Props> = ({ questions, onComplete }) => {
  const [currentRound, setCurrentRound] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    archetypes.forEach(archetype => {
      initial[archetype.abbreviation] = 0;
    });
    return initial;
  });

  // Group questions by archetype
  const questionsByArchetype = archetypes.reduce((acc, archetype) => {
    acc[archetype.abbreviation] = questions.filter(q => q.questionArchetypeCode === archetype.abbreviation);
    return acc;
  }, {} as Record<string, Question[]>);

  // Create an array of archetypes in random order for current round
  const randomizedArchetypes = [...archetypes].sort(() => Math.random() - 0.5);
  const currentQuestions = randomizedArchetypes.map(archetype => {
    const availableQuestions = questionsByArchetype[archetype.abbreviation];
    return availableQuestions.length > 0 ? availableQuestions[Math.floor(Math.random() * availableQuestions.length)] : null;
  }).filter(Boolean) as Question[];

  const handleAnswer = (answer: 'yes' | 'no' | 'maybe') => {
    const question = currentQuestions[currentRound];
    const newScores = { ...scores };

    if (answer === 'yes') {
      Object.keys(newScores).forEach(key => {
        newScores[key] += question[`${key}_Weight` as keyof Question] as number;
      });
    } else if (answer === 'no') {
      Object.keys(newScores).forEach(key => {
        newScores[key] -= question[`${key}_Weight` as keyof Question] as number;
      });
    }

    setScores(newScores);

    // Move to the next question or finish the quiz
    if (currentRound === currentQuestions.length - 1) {
      const finalScores = calculateFinalScores(newScores);
      onComplete(finalScores);
    } else {
      setCurrentRound(prev => prev + 1);
    }
  };

  const handleQuit = () => {
    const finalScores = calculateFinalScores(scores);
    onComplete(finalScores); // Complete the quiz with current scores
  };

  const calculateFinalScores = (rawScores: Record<string, number>): ArchetypeScore[] => {
    const min = Math.min(...Object.values(rawScores));
    const max = Math.max(...Object.values(rawScores));
    
    const scaledScores: ArchetypeScore[] = archetypes.map(archetype => ({
      name: archetype.name,
      abbreviation: archetype.abbreviation,
      score: max === min ? 100 : Math.round(((rawScores[archetype.abbreviation] - min) / (max - min)) * 100)
    }));

    return scaledScores.sort((a, b) => b.score - a.score);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto p-6"
    >
      <QuizProgress 
        currentQuestion={currentRound} 
        totalQuestions={randomizedArchetypes.length} 
      />
      <QuizQuestion 
        questionText={currentQuestions[currentRound]['Question Text'] || "No more questions"} 
        onAnswer={handleAnswer} 
        onQuit={handleQuit} // Pass the quit function to QuizQuestion
      />
    </motion.div>
  );
};
