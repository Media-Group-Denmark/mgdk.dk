"use client";

import { useState, useEffect, useRef } from "react";

export default function HighlightNumberCard({
  number,
  title,
  text,
}: {
  number?: number;
  title: string;
  text: string;
}) {
  const [displayNumber, setDisplayNumber] = useState(number);
  const [hasAnimated, setHasAnimated] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!number) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimation();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    const startAnimation = () => {
      const maxDuration = 2000;
      const intervalTime = 20;
      const maxSteps = maxDuration / intervalTime;
      const increment = Math.max(1, Math.ceil(number / maxSteps));

      let current = 0;
      const interval = setInterval(() => {
        current += increment;
        setDisplayNumber(Math.min(current, number));

        if (current >= number) {
          setDisplayNumber(number);
          clearInterval(interval);
        }
      }, intervalTime);

      return () => clearInterval(interval);
    };

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [number, hasAnimated]);

  return (
    <div ref={cardRef} className="font-medium italic flex flex-col w-full">
      <div className=" text-left">
        <p className="text-[92px] leading-[1] inline-block w-[250px]">
          {displayNumber ?? 0}
        </p>
      </div>

      <p className="text-[12px] uppercase my-3 text-left">{title}</p>
      <p className="text-[12px] max-w-[200px] text-left">{text}</p>
    </div>
  );
}
