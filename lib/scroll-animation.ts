function easeInOutQuint(t: number): number {
  return t < 0.5
    ? 16 * t * t * t * t * t
    : 1 - Math.pow(-2 * t + 2, 5) / 2;
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

/**
 * Maps scroll progress → Y rotation.
 * Longer rests at start/end; one continuous eased flip through the middle.
 */
export function getRotationFromProgress(progress: number): number {
  if (progress <= 0.18) {
    return 0;
  }

  if (progress >= 0.82) {
    return 360;
  }

  const t = easeInOutQuint((progress - 0.18) / 0.64);
  return t * 360;
}

/** Swap while the front is fully edge-hidden (~180°). */
export function getActiveScreen(progress: number): "before" | "after" {
  return getRotationFromProgress(progress) >= 180 ? "after" : "before";
}

export function getBeforeCopyOpacity(progress: number): number {
  if (progress <= 0.28) {
    return 1;
  }

  if (progress >= 0.48) {
    return 0;
  }

  return 1 - easeInOutQuint((progress - 0.28) / 0.2);
}

export function getAfterCopyOpacity(progress: number): number {
  if (progress <= 0.52) {
    return 0;
  }

  if (progress >= 0.72) {
    return 1;
  }

  return easeInOutQuint((progress - 0.52) / 0.2);
}
