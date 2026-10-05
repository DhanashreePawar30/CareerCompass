import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface MetricCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}

export const MetricCounter: React.FC<MetricCounterProps> = ({
  end,
  suffix = '',
  prefix = '',
  duration = 2,
  decimals = 0,
  className = '',
}) => {
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = countRef.current;
    if (!el) return;

    const counter = { val: 0 };

    const anim = gsap.to(counter, {
      val: end,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 92%',
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        if (el) {
          el.innerText = `${prefix}${decimals > 0 ? counter.val.toFixed(decimals) : Math.round(counter.val)}${suffix}`;
        }
      },
    });

    return () => {
      anim.kill();
    };
  }, [end, suffix, prefix, duration, decimals]);

  return (
    <span ref={countRef} className={className}>
      {prefix}0{suffix}
    </span>
  );
};
