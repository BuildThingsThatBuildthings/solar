import { useSpring, animated } from '@react-spring/web';

interface ProgressBarProps {
  value: number; // 0-100
  maxValue?: number;
  label?: string;
  showPercentage?: boolean;
  color?: string;
  height?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

export const ProgressBar = ({
  value,
  maxValue = 100,
  label,
  showPercentage = true,
  color = 'bg-gradient-to-r from-rainbow-blue to-rainbow-purple',
  height = 'md',
  animated: isAnimated = true,
  className = '',
}: ProgressBarProps) => {
  const percentage = Math.min(100, Math.max(0, (value / maxValue) * 100));

  const spring = useSpring({
    width: percentage,
    from: { width: 0 },
    config: { tension: 120, friction: 14 },
  });

  const heightStyles = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6',
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between mb-1">
          <span className="text-sm text-gray-300">{label}</span>
          {showPercentage && (
            <span className="text-sm text-gray-400">{percentage.toFixed(0)}%</span>
          )}
        </div>
      )}
      <div
        className={`
          w-full bg-gray-800/50 rounded-full overflow-hidden
          ${heightStyles[height]}
        `}
      >
        {isAnimated ? (
          <animated.div
            style={{ width: spring.width.to((w) => `${w}%`) }}
            className={`h-full rounded-full ${color}`}
          />
        ) : (
          <div
            style={{ width: `${percentage}%` }}
            className={`h-full rounded-full ${color} transition-all duration-300`}
          />
        )}
      </div>
    </div>
  );
};
