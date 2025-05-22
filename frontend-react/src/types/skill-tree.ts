export interface SkillNode {
  id: string;
  title: string;
  completed: boolean;
  children?: SkillNode[];
}

export interface SkillTree {
  id: string;
  title: string;
  description: string;
  theme: string;
  nodes: SkillNode[];
}
