type ViewTransitionHandle = {
  ready: Promise<void>;
  finished: Promise<void>;
};

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => ViewTransitionHandle;
};

export interface TransitionOrigin {
  x: number;
  y: number;
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

/**
 * Adds a short-lived class that lets every themed surface cross-fade when
 * the accent colour changes (fallback for browsers without view transitions).
 */
export function pulseThemeTransition(duration = 620) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.classList.add('theme-animating');
  window.setTimeout(() => root.classList.remove('theme-animating'), duration);
}

/**
 * Runs a DOM/theme update behind a circular reveal that expands from the
 * control the user activated. Falls back to a plain update when the browser
 * does not support the View Transitions API or motion is reduced.
 */
export function startThemeTransition(
  update: () => void,
  origin?: TransitionOrigin
) {
  if (typeof document === 'undefined') {
    update();
    return;
  }

  const root = document.documentElement;
  pulseThemeTransition();

  const doc = document as ViewTransitionDocument;
  const reduceMotion = prefersReducedMotion();

  if (!doc.startViewTransition || reduceMotion) {
    update();
    return;
  }

  const x = origin?.x ?? window.innerWidth / 2;
  const y = origin?.y ?? 0;
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  const transition = doc.startViewTransition(() => {
    update();
  });

  transition.ready
    .then(() => {
      root.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 620,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    })
    .catch(() => {
      /* the update already applied — nothing else to do */
    });
}
