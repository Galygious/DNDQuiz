import { Archetype } from '../types';

export const archetypes: Archetype[] = [
  {
    name: 'The Actor',
    abbreviation: 'AC',
    description:
      'Loves roleplaying, fully embodies their character, often using accents or unique mannerisms.',
    idealGame:
      'Heavy roleplay with ample opportunities for character-driven scenes and in-depth NPC interactions.',
    potentialConflicts:
      'May clash with players who prefer quicker gameplay or less acting.',
  },
  {
    name: 'The Explorer',
    abbreviation: 'EX',
    description:
      'Thrives on discovering secrets and exploring the game world, driven by curiosity.',
    idealGame:
      'A richly detailed world with hidden secrets, diverse environments, and plenty of exploration opportunities.',
    potentialConflicts:
      'May slow down gameplay for others, particularly fighters or instigators who prefer more direct action.',
  },
  {
    name: 'The Fighter',
    abbreviation: 'FT',
    description:
      'Enjoys combat and the thrill of action, prioritizing direct confrontation and battles.',
    idealGame:
      'Combat-heavy scenarios with well-defined enemies, frequent battle opportunities, and clear action-packed stakes.',
    potentialConflicts:
      'May clash with players who favor strategy, diplomacy, or non-combat solutions.',
  },
  {
    name: 'The Instigator',
    abbreviation: 'IN',
    description:
      'Seeks to create chaos and excitement, taking bold risks to see how they impact the game.',
    idealGame:
      'A flexible, reactive world where choices have big, often chaotic effects.',
    potentialConflicts:
      'May disrupt plans made by problem solvers or clash with players who prefer a more structured game.',
  },
  {
    name: 'The Optimizer',
    abbreviation: 'OP',
    description:
      'Focuses on efficiency and creating the most powerful character possible within the rules.',
    idealGame:
      'High-stakes scenarios where optimal builds and careful planning are rewarded.',
    potentialConflicts:
      "May become frustrated with players who make 'suboptimal' choices or have less interest in efficiency.",
  },
  {
    name: 'The Problem Solver',
    abbreviation: 'PS',
    description:
      'Approaches D&D like a strategy game, prioritizing puzzles and complex problem-solving.',
    idealGame:
      'Puzzle-heavy campaigns with intricate challenges requiring strategic thinking.',
    potentialConflicts:
      'May get frustrated with impulsive instigators or impatient fighters.',
  },
  {
    name: 'The Socializer',
    abbreviation: 'SO',
    description:
      'Primarily enjoys the social experience of D&D, valuing camaraderie over game mechanics or plot.',
    idealGame:
      'A laid-back social game with ample time for casual interaction.',
    potentialConflicts:
      'May inadvertently disrupt game flow for actors, storytellers, or optimizers who are more deeply invested in immersion or mechanics.',
  },
  {
    name: 'The Storyteller',
    abbreviation: 'ST',
    description:
      'Invested in the narrative and emotional arc of the game, preferring story-driven gameplay over mechanics.',
    idealGame:
      'Story-driven campaigns with strong plot development, character arcs, and meaningful narrative stakes.',
    potentialConflicts:
      'May lose interest in random or disjointed encounters and may clash with instigators who prioritize action over narrative continuity.',
  },
];
