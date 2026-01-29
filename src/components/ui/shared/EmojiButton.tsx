import type { ReactNode } from 'react';

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

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={tooltip}
      className={`
        rounded-xl font-bold flex items-center justify-center
        btn-bounce shadow-lg transition-all
        ${sizeStyles[size]}
        ${disabled
          ? 'opacity-50 cursor-not-allowed bg-gray-800/50 text-gray-500'
          : active
            ? `bg-gradient-to-r ${activeColor} text-white`
            : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80 hover:text-white'
        }
      `}
    >
      <span className={emojiSizes[size]}>{emoji}</span>
      {label && <span className="hidden sm:inline">{label}</span>}
      {children}
    </button>
  );
};
