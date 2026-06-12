"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll() {
  useEffect(() => {
    // Skip on touch / mobile — native scroll is better there
    if (window.matchMedia("(hover: none)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    let target  = window.scrollY;
    let current = window.scrollY;
    const LERP  = 0.082; // smoothness: lower = more floaty, higher = snappier

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const max = document.documentElement.scrollHeight - window.innerHeight;
      target = Math.max(0, Math.min(target + e.deltaY, max));
    };

    const tick = () => {
      const diff = target - current;
      if (Math.abs(diff) < 0.05) {
        current = target;
        window.scrollTo(0, target);
        return;
      }
      current += diff * LERP;
      window.scrollTo(0, current);
      ScrollTrigger.update();
    };

    gsap.ticker.add(tick);
    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("wheel", onWheel);
    };
  }, []);

  return null;
}
