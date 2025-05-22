export const PROGRESSION_TIERS = {
  NOVICE: { name: "Financial Novice", threshold: 0, color: "#94A3B8" },
  SAVER: { name: "Smart Saver", threshold: 500, color: "#60A5FA" },
  PLANNER: { name: "Budget Planner", threshold: 1200, color: "#34D399" },
  INVESTOR: { name: "Wise Investor", threshold: 2500, color: "#A78BFA" },
  STRATEGIST: {
    name: "Financial Strategist",
    threshold: 4000,
    color: "#F59E0B",
  },
  EXPERT: { name: "Wealth Expert", threshold: 6000, color: "#EC4899" },
  GURU: { name: "Finance Guru", threshold: 8500, color: "#8B5CF6" },
};

export function calculateXpGain(
  baseXp: number,
  streak: number,
  completedModules: number
) {
  const streakMultiplier = Math.min(1.5, 1 + streak * 0.05);
  const knowledgeMultiplier = Math.min(1.3, 1 + completedModules * 0.01);
  return Math.round(baseXp * streakMultiplier * knowledgeMultiplier);
}

export function getCurrentTier(xp: number): keyof typeof PROGRESSION_TIERS {
  const tiers = Object.entries(PROGRESSION_TIERS).reverse();

  for (const [tier, data] of tiers) {
    if (xp >= data.threshold) {
      return tier as keyof typeof PROGRESSION_TIERS;
    }
  }

  return "NOVICE";
}

export function getNextTier(
  currentTier: keyof typeof PROGRESSION_TIERS
): keyof typeof PROGRESSION_TIERS | null {
  const tiers = Object.keys(PROGRESSION_TIERS) as Array<
    keyof typeof PROGRESSION_TIERS
  >;
  const currentIndex = tiers.indexOf(currentTier);

  if (currentIndex < tiers.length - 1) {
    return tiers[currentIndex + 1];
  }

  return null;
}

export function calculateLevel(xp: number): number {
  // Simple level calculation: 1 level per 500 XP
  return Math.floor(xp / 500) + 1;
}
