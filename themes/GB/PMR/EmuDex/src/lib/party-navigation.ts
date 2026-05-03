const SWIPE_THRESHOLD_PX = 55;
const SWIPE_AXIS_RATIO = 1.25;

function isHorizontalSwipe(deltaX: number, deltaY: number): boolean {
  const absX = Math.abs(deltaX);
  const absY = Math.abs(deltaY);
  return absX >= SWIPE_THRESHOLD_PX && absX >= absY * SWIPE_AXIS_RATIO;
}

export function resolvePartyDetailSwipeSlot(
  selectedSlot: number | null,
  party: readonly unknown[],
  deltaX: number,
  deltaY: number,
): number | null {
  if (selectedSlot == null || !isHorizontalSwipe(deltaX, deltaY)) return null;

  const step = deltaX < 0 ? 1 : -1;
  for (let index = selectedSlot + step; index >= 0 && index < party.length; index += step) {
    if (party[index]) return index;
  }

  return null;
}
