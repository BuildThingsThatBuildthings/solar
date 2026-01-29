import type { ReactNode } from 'react';
import { animated, useSpring } from '@react-spring/web';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  title?: string;
  titleEmoji?: string;
  onClose?: () => void;
  isOpen?: boolean;
  position?: 'left' | 'right' | 'center' | 'bottom';
}

export const GlassPanel = ({
  children,
  className = '',
  title,
  titleEmoji,
  onClose,
  isOpen = true,
  position = 'center',
}: GlassPanelProps) => {
  const getPositionStyles = () => {
    switch (position) {
      case 'left':
        return 'left-4 top-1/2 -translate-y-1/2';
      case 'right':
        return 'right-4 top-1/2 -translate-y-1/2';
      case 'bottom':
        return 'bottom-24 left-1/2 -translate-x-1/2';
      default:
        return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
    }
  };

  const slideAnimation = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen
      ? 'scale(1) translateY(0px)'
      : 'scale(0.95) translateY(20px)',
    config: { tension: 300, friction: 25 },
  });

  if (!isOpen) return null;

  return (
    <animated.div
      style={slideAnimation}
      className={`
        fixed z-50 glass rounded-2xl shadow-2xl
        border border-white/10
        max-h-[80vh] overflow-hidden flex flex-col
        ${getPositionStyles()}
        ${className}
      `}
    >
      {/* Header */}
      {(title || onClose) && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          {title && (
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              {titleEmoji && <span className="text-xl">{titleEmoji}</span>}
              {title}
            </h2>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20
                       flex items-center justify-center transition-colors
                       text-gray-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      )}

      {/* Content */}
      <div className="overflow-y-auto flex-1 p-4">
        {children}
      </div>
    </animated.div>
  );
};
