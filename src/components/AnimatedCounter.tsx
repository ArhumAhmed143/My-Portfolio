"use client";

import { useEffect, useState, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  className?: string;
  durationMs?: number;
}

export default function AnimatedCounter({
  value,
  className = "",
  durationMs = 1200,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const shouldReduceMotion = useReducedMotion();

  // Parse if it starts with a number (e.g., "15+", "6+", "2+")
  const match = value.match(/^(\d+)(.*)$/);
  const targetNumber = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";

  const [currentNumber, setCurrentNumber] = useState(0);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (!isInView || shouldReduceMotion) return;

    if (targetNumber !== null) {
      let startTime: number | null = null;
      let animationFrameId: number;

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / durationMs, 1);
        // easeOutExpo
        const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const nextVal = Math.round(easedProgress * targetNumber);
        setCurrentNumber(nextVal);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        }
      };

      animationFrameId = requestAnimationFrame(step);
      return () => cancelAnimationFrame(animationFrameId);
    } else {
      // For string values (like "BS-IET"), type them character by character
      let idx = 0;
      const interval = setInterval(() => {
        idx++;
        setDisplayText(value.substring(0, idx));
        if (idx >= value.length) {
          clearInterval(interval);
        }
      }, 70);
      return () => clearInterval(interval);
    }
  }, [isInView, targetNumber, value, durationMs, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  if (targetNumber !== null) {
    return (
      <span ref={ref} className={className}>
        {isInView ? currentNumber : 0}
        {suffix}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {displayText}
    </span>
  );
}
