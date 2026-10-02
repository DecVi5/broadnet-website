"use client";

/**
 * Physical smooth scrolling with deceleration and a soft stopping inertia cushion.
 */
export function scrollToWithPhysics(
  targetId: string,
  options?: {
    offset?: number;
    duration?: number;
    onArrival?: () => void;
  }
) {
  if (typeof window === "undefined") return;

  const id = targetId.replace(/^#/, "");
  const targetEl = document.getElementById(id);
  if (!targetEl) return;

  const offset = options?.offset ?? 88; // 88px fixed header safe offset
  const targetY = Math.max(0, targetEl.getBoundingClientRect().top + window.scrollY - offset);
  const startY = window.scrollY;
  const distance = targetY - startY;

  // Dispatch scroll start event
  window.dispatchEvent(new CustomEvent("broadnet:scroll-start", { detail: { targetId: id } }));

  // If already at position
  if (Math.abs(distance) < 8) {
    triggerArrivalAnimation(targetEl, id);
    options?.onArrival?.();
    return;
  }

  // Calculate physics duration: swift glide with heavy cushioned deceleration
  const duration = options?.duration ?? Math.min(1150, Math.max(680, Math.abs(distance) * 0.44));
  let startTime: number | null = null;

  // Ease-Out Quart: high initial momentum, rapid smooth transit, gentle cushioned stop
  const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

  function step(timestamp: number) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeOutQuart(progress);

    window.scrollTo({
      top: startY + distance * ease,
      behavior: "instant" as ScrollBehavior,
    });

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      window.scrollTo({ top: targetY, behavior: "instant" as ScrollBehavior });
      const currentTarget = document.getElementById(id);
      if (currentTarget) {
        triggerArrivalAnimation(currentTarget, id);
      }
      options?.onArrival?.();
    }
  }

  requestAnimationFrame(step);
}

export function triggerArrivalAnimation(element: HTMLElement, id: string) {
  element.classList.remove("section-arrival-cushion");
  // Trigger DOM reflow to restart keyframe animation
  void element.offsetWidth;
  element.classList.add("section-arrival-cushion");

  window.dispatchEvent(new CustomEvent("broadnet:section-arrived", { detail: { targetId: id } }));

  setTimeout(() => {
    element.classList.remove("section-arrival-cushion");
  }, 1300);
}
