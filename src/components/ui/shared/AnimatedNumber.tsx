import { useSpring, animated } from '@react-spring/web';
import { useEffect, useState } from 'react';

interface AnimatedNumberProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
  format?: 'standard' | 'compact' | 'scientific';
}

export const AnimatedNumber = ({
  value,
  decimals = 1,
  prefix = '',
  suffix = '',
  className = '',
  duration = 500,
  format = 'standard',
}: AnimatedNumberProps) => {
  const [displayValue, setDisplayValue] = useState(value);

  const spring = useSpring({
    val: value,
    from: { val: displayValue },
    config: { duration },
    onChange: ({ value: { val } }) => {
      setDisplayValue(val);
    },
  });

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  const formatNumber = (num: number): string => {
    if (format === 'compact') {
      if (Math.abs(num) >= 1e12) return (num / 1e12).toFixed(decimals) + 'T';
      if (Math.abs(num) >= 1e9) return (num / 1e9).toFixed(decimals) + 'B';
      if (Math.abs(num) >= 1e6) return (num / 1e6).toFixed(decimals) + 'M';
      if (Math.abs(num) >= 1e3) return (num / 1e3).toFixed(decimals) + 'K';
      return num.toFixed(decimals);
    }
    if (format === 'scientific') {
      return num.toExponential(decimals);
    }
    return num.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  return (
    <animated.span className={className}>
      {spring.val.to((val) => `${prefix}${formatNumber(val)}${suffix}`)}
    </animated.span>
  );
};
