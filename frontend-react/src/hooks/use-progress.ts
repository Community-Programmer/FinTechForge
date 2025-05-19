export function calculateXpGain(
  baseXp: number,
  streak: number,
  completedModules: number
) {
  const streakMultiplier = Math.min(1.5, 1 + streak * 0.05);
  const knowledgeMultiplier = Math.min(1.3, 1 + completedModules * 0.01);
  return Math.round(baseXp * streakMultiplier * knowledgeMultiplier);
}
