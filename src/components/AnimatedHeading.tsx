"use client";

import { motion, type Variants } from "framer-motion";

interface AnimatedHeadingProps {
  text: string;
  tag?: "h1" | "h2" | "h3";
  className?: string;
  highlightWords?: string[];
  highlightClassName?: string;
}

export default function AnimatedHeading({
  text,
  tag = "h2",
  className = "",
  highlightWords = [],
  highlightClassName = "text-emerald-500",
}: AnimatedHeadingProps) {
  const words = text.split(" ");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.05,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 14,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.38,
        ease: "easeOut",
      },
    },
  };

  const Component = motion[tag];

  return (
    <Component
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className={`inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 ${className}`}
    >
      {words.map((word, i) => {
        const isHighlighted = highlightWords.some(
          (hw) => word.toLowerCase().includes(hw.toLowerCase())
        );

        return (
          <motion.span
            key={i}
            variants={wordVariants}
            className={`inline-block will-change-transform ${
              isHighlighted ? highlightClassName : ""
            }`}
          >
            {word}
          </motion.span>
        );
      })}
    </Component>
  );
}
