import { useState, useEffect } from 'react';
import { useSpring, animated, useTrail, config } from '@react-spring/web';
import { useSolarSystemStore } from '../../../stores/solarSystemStore';
import { useTourController } from '../../../hooks/useTourController';
import { AnimatedNumber } from '../shared/AnimatedNumber';

export const TourOverlay = () => {
  const {
    tourMode,
    quizActive,
    quizScore,
    setTourMode,
    endTour,
    setQuizActive,
    incrementQuizScore,
    resumeTour,
  } = useSolarSystemStore();

  const {
    currentTour,
    currentWaypoint,
    currentWaypointIndex,
    isLastWaypoint,
    advanceWaypoint,
    previousWaypoint,
  } = useTourController();

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Reset confetti when waypoint changes
  useEffect(() => {
    setShowConfetti(false);
  }, [currentWaypointIndex]);

  if (tourMode === 'idle' || !currentTour || !currentWaypoint) return null;

  const progress = ((currentWaypointIndex + 1) / currentTour.waypoints.length) * 100;

  const handleQuizAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);

    if (currentWaypoint.quizQuestion && index === currentWaypoint.quizQuestion.correctIndex) {
      incrementQuizScore();
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };

  const handleQuizContinue = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizActive(false);
    advanceWaypoint();
    if (!isLastWaypoint) {
      resumeTour();
    }
  };

  const handleEndTour = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    endTour();
  };

  return (
    <>
      {/* Main Tour Overlay */}
      <TourPanel
        tourMode={tourMode}
        currentTour={currentTour}
        currentWaypoint={currentWaypoint}
        currentWaypointIndex={currentWaypointIndex}
        isLastWaypoint={isLastWaypoint}
        progress={progress}
        quizScore={quizScore}
        quizActive={quizActive}
        onEndTour={handleEndTour}
        onPrevious={previousWaypoint}
        onNext={() => {
          if (currentWaypoint.quizQuestion && !quizActive) {
            setQuizActive(true);
            setTourMode('paused');
          } else {
            advanceWaypoint();
          }
        }}
        onContinue={() => setTourMode('playing')}
      />

      {/* Quiz Modal */}
      {quizActive && currentWaypoint.quizQuestion && (
        <QuizModal
          question={currentWaypoint.quizQuestion}
          selectedAnswer={selectedAnswer}
          showResult={showResult}
          showConfetti={showConfetti}
          onAnswer={handleQuizAnswer}
          onContinue={handleQuizContinue}
        />
      )}
    </>
  );
};

interface TourPanelProps {
  tourMode: string;
  currentTour: { name: string; emoji: string; waypoints: unknown[] };
  currentWaypoint: { title: string; narration: string; quizQuestion?: unknown };
  currentWaypointIndex: number;
  isLastWaypoint: boolean;
  progress: number;
  quizScore: number;
  quizActive: boolean;
  onEndTour: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onContinue: () => void;
}

const TourPanel = ({
  tourMode,
  currentTour,
  currentWaypoint,
  currentWaypointIndex,
  isLastWaypoint,
  progress,
  quizScore,
  quizActive,
  onEndTour,
  onPrevious,
  onNext,
  onContinue,
}: TourPanelProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const panelSpring = useSpring({
    from: { opacity: 0, y: 50, scale: 0.95 },
    to: { opacity: mounted ? 1 : 0, y: mounted ? 0 : 50, scale: mounted ? 1 : 0.95 },
    config: config.gentle,
  });

  const contentSpring = useSpring({
    from: { opacity: 0, x: -20 },
    to: { opacity: 1, x: 0 },
    delay: 200,
    config: config.gentle,
    reset: true,
    key: currentWaypointIndex,
  });

  const progressSpring = useSpring({
    width: progress,
    config: { tension: 120, friction: 14 },
  });

  const [exitHovered, setExitHovered] = useState(false);
  const exitSpring = useSpring({
    scale: exitHovered ? 1.1 : 1,
    config: config.wobbly,
  });

  return (
    <div className="fixed bottom-24 left-4 right-4 z-50 pointer-events-none">
      <animated.div
        style={panelSpring}
        className="max-w-2xl mx-auto pointer-events-auto"
      >
        <div className="glass rounded-2xl overflow-hidden shadow-2xl border border-white/20">
          {/* Progress Bar */}
          <div className="h-2 bg-gray-800 relative overflow-hidden">
            <animated.div
              className="h-full bg-gradient-to-r from-rainbow-blue via-rainbow-purple to-rainbow-pink"
              style={{ width: progressSpring.width.to(w => `${w}%`) }}
            />
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                          -translate-x-full animate-shimmer" style={{ animationDuration: '2s' }} />
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl animate-bounce" style={{ animationDuration: '2s' }}>
                  {currentTour.emoji}
                </span>
                <div>
                  <h3 className="text-white font-bold">{currentTour.name}</h3>
                  <p className="text-gray-500 text-xs">
                    Stop {currentWaypointIndex + 1} of {currentTour.waypoints.length}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {quizScore > 0 && (
                  <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-rainbow-yellow/30 to-rainbow-orange/30
                                 text-rainbow-yellow font-bold flex items-center gap-2 border border-rainbow-yellow/30">
                    <span>⭐</span>
                    <AnimatedNumber value={quizScore} decimals={0} /> pts
                  </span>
                )}
                <animated.button
                  onClick={onEndTour}
                  onMouseEnter={() => setExitHovered(true)}
                  onMouseLeave={() => setExitHovered(false)}
                  style={{ transform: exitSpring.scale.to(s => `scale(${s})`) }}
                  className="px-4 py-1.5 rounded-full bg-white/10 text-gray-400
                           hover:bg-red-500/20 hover:text-red-400 transition-colors"
                >
                  Exit
                </animated.button>
              </div>
            </div>

            {/* Waypoint Content */}
            <animated.div style={contentSpring}>
              <h2 className="text-2xl font-bold text-rainbow-yellow mb-3 flex items-center gap-2">
                <span className="text-rainbow-teal">📍</span>
                {currentWaypoint.title}
              </h2>

              <p className="text-gray-300 leading-relaxed mb-5">
                {currentWaypoint.narration}
              </p>
            </animated.div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between">
              <NavButton
                onClick={onPrevious}
                disabled={currentWaypointIndex === 0}
                direction="prev"
              />

              {/* Progress Dots */}
              <div className="flex gap-1.5">
                {currentTour.waypoints.map((_, index) => (
                  <ProgressDot
                    key={index}
                    index={index}
                    currentIndex={currentWaypointIndex}
                  />
                ))}
              </div>

              {tourMode === 'paused' && !quizActive ? (
                <NavButton onClick={onContinue} label="Continue" icon="▶" isPrimary />
              ) : (
                <NavButton
                  onClick={onNext}
                  label={isLastWaypoint ? 'Finish' : 'Next'}
                  direction="next"
                  isPrimary
                />
              )}
            </div>
          </div>
        </div>
      </animated.div>
    </div>
  );
};

const ProgressDot = ({ index, currentIndex }: { index: number; currentIndex: number }) => {
  const isActive = index === currentIndex;
  const isPast = index < currentIndex;

  const spring = useSpring({
    scale: isActive ? 1.3 : 1,
    width: isActive ? 16 : 8,
    config: config.wobbly,
  });

  return (
    <animated.div
      style={spring}
      className={`h-2 rounded-full transition-colors duration-300 ${
        isActive
          ? 'bg-gradient-to-r from-rainbow-yellow to-rainbow-orange'
          : isPast
            ? 'bg-rainbow-blue'
            : 'bg-gray-600'
      }`}
    />
  );
};

interface NavButtonProps {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
  icon?: string;
  direction?: 'prev' | 'next';
  isPrimary?: boolean;
}

const NavButton = ({ onClick, disabled, label, icon, direction, isPrimary }: NavButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const spring = useSpring({
    scale: disabled ? 1 : isHovered ? 1.05 : 1,
    y: isHovered && !disabled ? -2 : 0,
    config: config.wobbly,
  });

  const displayLabel = label || (direction === 'prev' ? 'Previous' : 'Next');
  const displayIcon = icon || (direction === 'prev' ? '←' : '→');

  return (
    <animated.button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ transform: spring.scale.to(s => `scale(${s}) translateY(${spring.y.get()}px)`) }}
      className={`px-5 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2 ${
        disabled
          ? 'bg-white/5 text-gray-600 cursor-not-allowed'
          : isPrimary
            ? 'bg-gradient-to-r from-rainbow-blue to-rainbow-purple text-white shadow-lg shadow-rainbow-purple/30'
            : 'bg-white/10 text-white hover:bg-white/20'
      }`}
    >
      {direction === 'prev' && <span>{displayIcon}</span>}
      {displayLabel}
      {direction === 'next' && <span>{displayIcon}</span>}
      {icon && !direction && <span>{icon}</span>}
    </animated.button>
  );
};

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface QuizModalProps {
  question: QuizQuestion;
  selectedAnswer: number | null;
  showResult: boolean;
  showConfetti: boolean;
  onAnswer: (index: number) => void;
  onContinue: () => void;
}

const QuizModal = ({
  question,
  selectedAnswer,
  showResult,
  showConfetti,
  onAnswer,
  onContinue,
}: QuizModalProps) => {
  const modalSpring = useSpring({
    from: { opacity: 0, scale: 0.9, y: 20 },
    to: { opacity: 1, scale: 1, y: 0 },
    config: config.gentle,
  });

  const optionsTrail = useTrail(question.options.length, {
    from: { opacity: 0, x: -20 },
    to: { opacity: 1, x: 0 },
    delay: 200,
    config: config.gentle,
  });

  const resultSpring = useSpring({
    opacity: showResult ? 1 : 0,
    y: showResult ? 0 : 10,
    config: config.gentle,
  });

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                backgroundColor: ['#FF6B6B', '#FECA57', '#5CD859', '#54A0FF', '#A55EEA'][Math.floor(Math.random() * 5)],
                width: '10px',
                height: '10px',
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}

      <animated.div
        style={modalSpring}
        className="glass rounded-3xl w-full max-w-md overflow-hidden shadow-2xl border border-white/20"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-rainbow-purple to-rainbow-pink p-5">
          <h3 className="text-white font-bold text-xl flex items-center gap-3">
            <span className="text-3xl animate-bounce" style={{ animationDuration: '1s' }}>🧠</span>
            Quiz Time!
          </h3>
        </div>

        <div className="p-5 space-y-5">
          {/* Question */}
          <p className="text-white font-medium text-lg leading-relaxed">
            {question.question}
          </p>

          {/* Options */}
          <div className="space-y-3">
            {optionsTrail.map((style, index) => {
              const isCorrect = index === question.correctIndex;
              const isSelected = selectedAnswer === index;

              return (
                <QuizOption
                  key={index}
                  style={style}
                  option={question.options[index]}
                  index={index}
                  isCorrect={isCorrect}
                  isSelected={isSelected}
                  showResult={showResult}
                  onClick={() => onAnswer(index)}
                />
              );
            })}
          </div>

          {/* Result */}
          <animated.div style={resultSpring}>
            {showResult && (
              <div className={`rounded-2xl p-4 ${
                selectedAnswer === question.correctIndex
                  ? 'bg-green-500/20 border border-green-500/40'
                  : 'bg-orange-500/20 border border-orange-500/40'
              }`}>
                <p className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                  {selectedAnswer === question.correctIndex
                    ? <><span className="text-2xl">🎉</span> Correct!</>
                    : <><span className="text-2xl">💡</span> Not quite!</>}
                </p>
                <p className="text-gray-300 leading-relaxed">
                  {question.explanation}
                </p>
              </div>
            )}
          </animated.div>

          {/* Continue Button */}
          {showResult && (
            <animated.button
              onClick={onContinue}
              style={{ opacity: resultSpring.opacity }}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-rainbow-blue to-rainbow-purple
                       text-white font-bold text-lg shadow-lg shadow-rainbow-purple/30
                       hover:shadow-xl hover:shadow-rainbow-purple/40 transition-shadow"
            >
              Continue Tour →
            </animated.button>
          )}
        </div>
      </animated.div>
    </div>
  );
};

interface QuizOptionProps {
  style: Record<string, unknown>;
  option: string;
  index: number;
  isCorrect: boolean;
  isSelected: boolean;
  showResult: boolean;
  onClick: () => void;
}

const QuizOption = ({ style, option, index, isCorrect, isSelected, showResult, onClick }: QuizOptionProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const hoverSpring = useSpring({
    scale: showResult ? 1 : isHovered ? 1.02 : 1,
    config: config.wobbly,
  });

  let bgColor = 'bg-white/10 hover:bg-white/20 border-white/20';
  if (showResult) {
    if (isCorrect) {
      bgColor = 'bg-green-500/30 border-green-500';
    } else if (isSelected && !isCorrect) {
      bgColor = 'bg-red-500/30 border-red-500';
    }
  }

  return (
    <animated.button
      onClick={onClick}
      disabled={showResult}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...(style as object),
        transform: hoverSpring.scale.to(s => `scale(${s})`),
      }}
      className={`w-full text-left p-4 rounded-xl border-2 transition-colors ${bgColor}`}
    >
      <div className="flex items-center gap-4">
        <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg
                       ${showResult && isCorrect ? 'bg-green-500 text-white' :
                         showResult && isSelected && !isCorrect ? 'bg-red-500 text-white' :
                         'bg-white/20 text-white'}`}>
          {String.fromCharCode(65 + index)}
        </span>
        <span className="text-white flex-1 font-medium">{option}</span>
        {showResult && isCorrect && (
          <span className="text-3xl animate-bounce" style={{ animationDuration: '0.5s' }}>✓</span>
        )}
        {showResult && isSelected && !isCorrect && (
          <span className="text-3xl animate-shake">✗</span>
        )}
      </div>
    </animated.button>
  );
};
