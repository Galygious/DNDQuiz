import { useState } from 'react';
import { Quiz } from './components/Quiz';
import { Results } from './components/Results';
import { StartScreen } from './components/StartScreen';
import { ArchetypeScore } from './types';
import { questions } from './data/questions';

function App() {
  const [started, setStarted] = useState(false);
  const [scores, setScores] = useState<ArchetypeScore[] | null>(null);

  const handleStart = () => setStarted(true);
  const handleComplete = (finalScores: ArchetypeScore[]) => setScores(finalScores);
  const handleRestart = () => {
    setScores(null);
    setStarted(false);
  };

  if (!started) {
    return <StartScreen onStart={handleStart} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {scores ? (
        <Results scores={scores} onRestart={handleRestart} />
      ) : (
        <Quiz questions={questions} onComplete={handleComplete} />
      )}
    </div>
  );
}

export default App;