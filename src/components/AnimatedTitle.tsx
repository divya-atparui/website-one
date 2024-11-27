import React from "react";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTitleProps {
  /** The title string to animate. Can contain <br /> tags for line breaks */
  title: string;
  /** Additional CSS classes to apply to the outermost container */
  containerClass?: string;
}

/**
 * A function component that animates a title string, splitting it into individual words which
 * fade in and scale up when the component comes into view.
 */
const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ 
  title, 
  containerClass 
}): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "100 bottom",
          end: "center bottom",
          toggleActions: "play none none reverse",
        },
      });

      titleAnimation.to(
        ".animated-word",
        {
          opacity: 1,
          transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
          ease: "power2.inOut",
          stagger: 0.02,
        },
        0
      );
    }, containerRef);

    return () => ctx.revert(); // Clean up on unmount
  }, []);

  // Split title into lines and words, maintaining type safety
  const lines: string[] = title.split("<br />");
  
  return (
    <div ref={containerRef} className={clsx("animated-title", containerClass)}>
      {lines.map((line, index) => {
        const words = line.split(" ");
        return (
          <div
            key={`line-${index}`}
            className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
          >
            {words.map((word, idx) => (
              <span
                key={`word-${index}-${idx}`}
                className="animated-word"
                dangerouslySetInnerHTML={{ __html: word }}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default AnimatedTitle;
