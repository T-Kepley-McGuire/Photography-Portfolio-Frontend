import { useEffect, useRef, useState } from "react";

export function useIntersectionOpacity(thresholdSteps = 100) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [intersectionRatio, setIntersectionRatio] = useState(1);

  useEffect(() => {
    
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersectionRatio(entry.intersectionRatio);
      },
      {
        threshold: Array.from({ length: thresholdSteps + 1 }, (_, i) => i / thresholdSteps),
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [thresholdSteps]);

  return { ref, intersectionRatio };
}

