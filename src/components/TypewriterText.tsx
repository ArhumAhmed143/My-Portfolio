"use client";

import { useState, useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface TypewriterTextProps {
  phrases?: string[];
  text?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  loop?: boolean;
  className?: string;
  cursorClassName?: string;
  showCursor?: boolean;
  startWhenInView?: boolean;
}

export default function TypewriterText({
  phrases,
  text,
  typingSpeed = 38,
  deletingSpeed = 18,
  pauseDuration = 2200,
  loop = true,
  className = "",
  cursorClassName = "w-1.5 h-4 sm:h-5 bg-emerald-500",
  showCursor = true,
  startWhenInView = true,
}: TypewriterTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: !loop, margin: "-20px" });
  const shouldReduceMotion = useReducedMotion();

  // Normalize phrases list
  const list = phrases && phrases.length > 0 ? phrases : text ? [text] : [""];

  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const activePhrase = list[phraseIdx] || "";
  const isStarted = !startWhenInView || isInView;

  useEffect(() => {
    if (shouldReduceMotion || !isStarted) {
      return;
    }

    // 1. Reached the end of the phrase -> pause, then start deleting if multiple phrases or loop
    if (!isDeleting && charIdx === activePhrase.length) {
      if (list.length <= 1 && !loop) {
        return;
      }
      const pauseTimer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(pauseTimer);
    }

    // 2. Finished deleting phrase -> short pause, switch to next phrase
    if (isDeleting && charIdx === 0) {
      const switchTimer = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIdx((prev) => (prev + 1) % list.length);
      }, 180);
      return () => clearTimeout(switchTimer);
    }

    // 3. Typing or deleting characters
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(() => {
      setCharIdx((prev) => prev + (isDeleting ? -1 : 1));
    }, speed);

    return () => clearTimeout(timer);
  }, [
    charIdx,
    isDeleting,
    phraseIdx,
    activePhrase,
    list.length,
    loop,
    pauseDuration,
    typingSpeed,
    deletingSpeed,
    isStarted,
    shouldReduceMotion,
  ]);

  const displayedText = shouldReduceMotion
    ? activePhrase
    : isStarted
    ? activePhrase.substring(0, charIdx)
    : "";

  const isComplete = charIdx >= activePhrase.length && !isDeleting;

  return (
    <span ref={containerRef} className={`inline-flex items-center ${className}`}>
      <span>{displayedText}</span>
      {showCursor && (
        <span
          className={`inline-block ml-1 animate-pulse align-middle rounded-sm shadow-[0_0_8px_#10b981] transition-opacity ${
            isComplete && !loop && list.length <= 1 ? "opacity-30" : "opacity-100"
          } ${cursorClassName}`}
          aria-hidden="true"
        />
      )}
    </span>
  );
}
