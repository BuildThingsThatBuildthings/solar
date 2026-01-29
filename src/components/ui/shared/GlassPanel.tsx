import { useState } from 'react';
import type { ReactNode } from 'react';
import { animated, useSpring, config } from '@react-spring/web';

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
  const [isClosing, setIsClosing] = useState(false);
  const [closeHovered, setCloseHovered] = useState(false);
  const [emojiHovered, setEmojiHovered] = useState(false);

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

  const getInitialTransform = () => {
    switch (position) {
      case 'left':
        return 'scale(0.9) translateX(-50px)';
      case 'right':
        return 'scale(0.9) translateX(50px)';
      case 'bottom':
        return 'scale(0.9) translateY(50px)';
      default:
        return 'scale(0.9) translateY(30px)';
    }
  };

  const slideAnimation = useSpring({
    opacity: isOpen && !isClosing ? 1 : 0,
    transform: isOpen && !isClosing
      ? 'scale(1) translateY(0px) translateX(0px)'
      : getInitialTransform(),
    config: config.gentle,
  });

  const backdropAnimation = useSpring({
    opacity: isOpen && !isClosing ? 1 : 0,
    config: config.gentle,
  });

  const closeButtonSpring = useSpring({
    scale: closeHovered ? 1.2 : 1,
    rotate: closeHovered ? 90 : 0,
    backgroundColor: closeHovered ? 'rgba(255, 107, 107, 0.3)' : 'rgba(255, 255, 255, 0.1)',
    config: config.wobbly,
  });

  const emojiSpring = useSpring({
    scale: emojiHovered ? 1.3 : 1,
    rotate: emojiHovered ? 15 : 0,
    config: config.wobbly,
  });

  const handleClose = () => {
    if (onClose) {
      setIsClosing(true);
      setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, 250);
    }
  };

  if (!isOpen && !isClosing) return null;

  return (
    <>
      {/* Backdrop */}
      <animated.div
        style={backdropAnimation}
        onClick={handleClose}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
      />

      {/* Panel */}
      <animated.div
        style={slideAnimation}
        className={`
          fixed z-50 glass rounded-3xl shadow-2xl
          border border-white/20 hover:border-white/30 transition-colors duration-300
          max-h-[85vh] overflow-hidden flex flex-col
          ${getPositionStyles()}
          ${className}
        `}
      >
        {/* Animated gradient border effect */}
        <div className="absolute inset-0 rounded-3xl opacity-30 pointer-events-none">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-rainbow-blue/20 via-transparent to-rainbow-purple/20" />
        </div>

        {/* Header */}
        {(title || onClose) && (
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10
                         bg-gradient-to-r from-white/5 to-transparent relative overflow-hidden">
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent
                           -translate-x-full hover:translate-x-full transition-transform duration-1000 ease-out" />

            {title && (
              <h2 className="text-xl font-bold text-white flex items-center gap-3 relative">
                {titleEmoji && (
                  <animated.span
                    className="text-2xl cursor-pointer"
                    style={{
                      transform: emojiSpring.scale.to(s => `scale(${s}) rotate(${emojiSpring.rotate.get()}deg)`),
                    }}
                    onMouseEnter={() => setEmojiHovered(true)}
                    onMouseLeave={() => setEmojiHovered(false)}
                  >
                    {titleEmoji}
                  </animated.span>
                )}
                <span className="text-shimmer">{title}</span>
              </h2>
            )}
            {onClose && (
              <animated.button
                onClick={handleClose}
                onMouseEnter={() => setCloseHovered(true)}
                onMouseLeave={() => setCloseHovered(false)}
                style={{
                  transform: closeButtonSpring.scale.to(s => `scale(${s}) rotate(${closeButtonSpring.rotate.get()}deg)`),
                  backgroundColor: closeButtonSpring.backgroundColor,
                }}
                className="w-9 h-9 rounded-full flex items-center justify-center
                          text-gray-400 hover:text-white transition-colors relative"
              >
                <span className="text-lg">✕</span>
              </animated.button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-5 relative">
          {children}
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-space-dark/30 to-transparent pointer-events-none" />
      </animated.div>
    </>
  );
};
