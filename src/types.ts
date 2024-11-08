export interface Archetype {
  name: string;
  abbreviation: string;
  description: string;
  idealGame: string;
  potentialConflicts: string;
}

export interface Question {
  'Question Text': string;
  AC_Weight: number;
  EX_Weight: number;
  FT_Weight: number;
  IN_Weight: number;
  OP_Weight: number;
  PS_Weight: number;
  SO_Weight: number;
  ST_Weight: number;
  comments: string;
  questionArchetypeCode: string;
}

export interface ArchetypeScore {
  name: string;
  abbreviation: string;
  score: number;
}