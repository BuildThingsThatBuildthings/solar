import { useState } from 'react';
import type { ReactNode } from 'react';
import { useSpring, animated, config } from '@react-spring/web';

interface EmojiButtonProps {
  emoji: string;
  label?: string;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  activeColor?: string;
  tooltip?: string;
  children?: ReactNode;
}

export const EmojiButton = ({
  emoji,
  label,
  onClick,
  active = false,
  disabled = false,
  size = 'md',
  activeColor = 'from-rainbow-blue to-rainbow-indigo',
  tooltip,
  children,
}: EmojiButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const sizeStyles = {
    sm: 'px-2 py-1 text-sm gap-1',
    md: 'px-4 py-2 text-base gap-2',
    lg: 'px-6 py-3 text-lg gap-2',
  };

  const emojiSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const buttonSpring = useSpring({
    scale: disabled ? 1 : isPressed ? 0.92 : isHovered ? 1.08 : 1,
    y: disabled ? 0 : isHovered ? -3 : 0,
    config: config.wobbly,
  });

  const emojiSpring = useSpring({
    rotate: isHovered && !disabled ? 15 : 0,
    scale: isHovered && !disabled ? 1.2 : 1,
    config: { tension: 400, friction: 10 },
  });

  const glowSpring = useSpring({
    boxShadow: active
      ? '0 0 25px rgba(84, 160, 255, 0.5), 0 0 50px rgba(165, 94, 234, 0.3)'
      : isHovered && !disabled
        ? '0 8px 24px rgba(0, 0, 0, 0.4)'
        : '0 4px 12px rgba(0, 0, 0, 0.3)',
    config: config.gentle,
  });

  return (
    <animated.button
      onClick={onClick}
      disabled={disabled}
      title={tooltip}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
      onMouseDown={() => !disabled && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      style={{
        transform: buttonSpring.scale.to(
          s => `scale(${s}) translateY(${buttonSpring.y.get()}px)`
        ),
        ...glowSpring,
      }}
      className={`
        rounded-xl font-bold flex items-center justify-center
        transition-colors duration-200 relative overflow-hidden
        ${sizeStyles[size]}
        ${disabled
          ? 'opacity-50 cursor-not-allowed bg-gray-800/50 text-gray-500'
          : active
            ? `bg-gradient-to-r ${activeColor} text-white`
            : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80 hover:text-white'
        }
      `}
    >
      {/* Active state pulse */}
      {active && !disabled && (
        <span className="absolute inset-0 rounded-xl bg-white/10 animate-pulse"
              style={{ animationDuration: '2s' }} />
      )}

      {/* Hover sparkle effect */}
      {isHovered && !disabled && (
        <span className="absolute top-0 right-1 text-xs opacity-70 animate-ping">✨</span>
      )}

      <animated.span
        className={`${emojiSizes[size]} inline-block`}
        style={{
          transform: emojiSpring.rotate.to(r => `rotate(${r}deg) scale(${emojiSpring.scale.get()})`),
        }}
      >
        {emoji}
      </animated.span>
      {label && <span className="hidden sm:inline relative z-10">{label}</span>}
      {children}
    </animated.button>
  );
};
