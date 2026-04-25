export type Project = {
  id: number;
  title: string;
  description: string;
  tech: string[];
  scope?: string;
  when?: string;
  featured?: boolean;
};

export type Experience = {
  when: string;
  role: string;
  org: string;
  summary?: string;
  bullets: string[];
  tech: string[];
  edu?: boolean;
  /** Optional short badge (e.g. "PTIT", "TCB") rendered as a logo chip. */
  badge?: string;
  /** Optional badge accent color (tailwind token suffix): cyan | warm | violet | emerald */
  badgeTone?: "cyan" | "warm" | "violet" | "emerald";
};

export type SkillGroup = { title: string; items: string[] };
