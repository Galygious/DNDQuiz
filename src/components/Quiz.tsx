import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Question, ArchetypeScore } from '../types';
import { archetypes } from '../data/archetypes';
import { QuizProgress } from './QuizProgress';
import { QuizQuestion } from './QuizQuestion';

// Shuffle the archetypes array
const shuffleArchetypes = (archetypes: any[]) => {
  for (let i = archetypes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [archetypes[i], archetypes[j]] = [archetypes[j], archetypes[i]];
  }
  return archetypes;
};

export const Quiz: React.FC<{ questions: Question[]; onComplete: (scores: ArchetypeScore[]) => void; }> = ({ questions, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    archetypes.forEach(archetype => {
      initial[archetype.abbreviation] = 0;
    });
    return initial;
  });
  const [roundQuestions, setRoundQuestions] = useState<Question[]>([]);
  const [availableQuestions, setAvailableQuestions] = useState<Question[]>(questions); // State for available questions

  // Function to create the next round of questions
  const createNextRound = () => {
    if (availableQuestions.length === 0) {
      // If no questions are available, finish the quiz
      const finalScores = calculateFinalScores(scores);
      onComplete(finalScores);
      return;
    }

    // Shuffle archetypes and prepare new round questions
    const shuffledArchetypes = shuffleArchetypes([...archetypes]);
    const newRoundQuestions: Question[] = [];

    // Get one question from each archetype in the shuffled order
    shuffledArchetypes.forEach(archetype => {
      const archetypeCode = archetype.abbreviation;
      const questionIndex = availableQuestions.findIndex(q => q.QuestionArchetypeCode === archetypeCode);

      if (questionIndex !== -1) {
        newRoundQuestions.push(availableQuestions[questionIndex]);
        availableQuestions.splice(questionIndex, 1); // Remove question from available list
      }
    });

    // Update the state with the new round questions and the remaining available questions
    setRoundQuestions(newRoundQuestions);
    setAvailableQuestions(prev => [...prev]); // Update available questions state
    setCurrentQuestionIndex(0);
  };

  useEffect(() => {
    createNextRound(); // Create the first round when the component mounts
  }, []);

  const handleAnswer = (answer: 'yes' | 'no' | 'maybe') => {
    const question = roundQuestions[currentQuestionIndex];
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

    if (currentQuestionIndex === roundQuestions.length - 1) {
      createNextRound(); // Create next round after answering all questions in current round
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
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
        currentQuestion={currentQuestionIndex + 1} // Add 1 for 1-based indexing
        totalQuestions={questions.length} // Show total questions here (e.g., 160)
      />
      <QuizQuestion 
        questionText={roundQuestions[currentQuestionIndex]?.['Question Text']} 
        _questionArchetypeCode={roundQuestions[currentQuestionIndex]?.['QuestionArchetypeCode']} 
        onAnswer={handleAnswer} 
        onQuit={handleQuit} 
      />
    </motion.div>
  );
};
