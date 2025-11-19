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
      let current = 0;
      const interval = setInterval(() => {
        current += 1;
        setDisplayNumber(current);

        if (current >= number) {
          setDisplayNumber(number);
          clearInterval(interval);
        }
      }, 20);
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
    <div ref={cardRef} className="font-medium italic ">
      <p className="text-[92px] leading-[1]">{displayNumber}</p>

      <h3 className="text-[12px] uppercase my-3">{title}</h3>
      <p className="text-[12px] max-w-[200px]">{text}</p>
    </div>
  );
}
