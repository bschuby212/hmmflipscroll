function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function clampProgress(value: number): number {
  return Math.min(1, Math.max(0, value));
}

export function getSectionProgress(
  sectionTop: number,
  sectionHeight: number,
  viewportHeight: number,
): number {
  const scrollableDistance = sectionHeight - viewportHeight;
  if (scrollableDistance <= 0) {
    return 0;
  }

  const scrolled = -sectionTop;
  return clampProgress(scrolled / scrollableDistance);
}

/** Maps normalized scroll progress to Y-axis rotation in degrees. */
export function getRotationFromProgress(progress: number): number {
  if (progress <= 0.25) {
    return 0;
  }

  if (progress <= 0.5) {
    const t = easeInOutCubic((progress - 0.25) / 0.25);
    return t * 180;
  }

  if (progress <= 0.75) {
    const t = easeInOutCubic((progress - 0.5) / 0.25);
    return 180 + t * 180;
  }

  return 360;
}

/** Swap screen image while the front face is hidden (at ~50% progress). */
export function getActiveScreen(progress: number): "before" | "after" {
  return progress >= 0.5 ? "after" : "before";
}

export function getBeforeCopyOpacity(progress: number): number {
  if (progress <= 0.2) {
    return 1;
  }

  if (progress >= 0.45) {
    return 0;
  }

  return 1 - (progress - 0.2) / 0.25;
}

export function getAfterCopyOpacity(progress: number): number {
  if (progress <= 0.55) {
    return 0;
  }

  if (progress >= 0.8) {
    return 1;
  }

  return (progress - 0.55) / 0.25;
}
