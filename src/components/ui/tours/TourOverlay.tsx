import { useState } from 'react';
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

  if (tourMode === 'idle' || !currentTour || !currentWaypoint) return null;

  const progress = ((currentWaypointIndex + 1) / currentTour.waypoints.length) * 100;

  const handleQuizAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);

    if (currentWaypoint.quizQuestion && index === currentWaypoint.quizQuestion.correctIndex) {
      incrementQuizScore();
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
      <div className="fixed bottom-24 left-4 right-4 z-50 pointer-events-none">
        <div className="max-w-2xl mx-auto pointer-events-auto">
          <div className="glass rounded-2xl overflow-hidden">
            {/* Progress Bar */}
            <div className="h-2 bg-gray-800">
              <div
                className="h-full bg-gradient-to-r from-rainbow-blue to-rainbow-purple transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{currentTour.emoji}</span>
                  <div>
                    <h3 className="text-white font-bold text-sm">{currentTour.name}</h3>
                    <p className="text-gray-500 text-xs">
                      Stop {currentWaypointIndex + 1} of {currentTour.waypoints.length}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {quizScore > 0 && (
                    <span className="px-3 py-1 rounded-full bg-rainbow-yellow/20 text-rainbow-yellow text-sm font-bold">
                      <AnimatedNumber value={quizScore} decimals={0} /> pts
                    </span>
                  )}
                  <button
                    onClick={handleEndTour}
                    className="px-3 py-1 rounded-full bg-white/10 text-gray-400 text-sm
                             hover:bg-white/20 hover:text-white transition-colors"
                  >
                    Exit
                  </button>
                </div>
              </div>

              {/* Waypoint Title */}
              <h2 className="text-xl font-bold text-rainbow-yellow mb-2">
                {currentWaypoint.title}
              </h2>

              {/* Narration */}
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                {currentWaypoint.narration}
              </p>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between">
                <button
                  onClick={previousWaypoint}
                  disabled={currentWaypointIndex === 0}
                  className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                    currentWaypointIndex === 0
                      ? 'bg-white/5 text-gray-600 cursor-not-allowed'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  ← Previous
                </button>

                <div className="flex gap-1">
                  {currentTour.waypoints.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentWaypointIndex
                          ? 'bg-rainbow-yellow w-4'
                          : index < currentWaypointIndex
                            ? 'bg-rainbow-blue'
                            : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>

                {tourMode === 'paused' && !quizActive ? (
                  <button
                    onClick={() => setTourMode('playing')}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-rainbow-blue to-rainbow-purple
                             text-white font-medium text-sm"
                  >
                    ▶ Continue
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (currentWaypoint.quizQuestion && !quizActive) {
                        setQuizActive(true);
                        setTourMode('paused');
                      } else {
                        advanceWaypoint();
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-rainbow-blue to-rainbow-purple
                             text-white font-medium text-sm"
                  >
                    {isLastWaypoint ? 'Finish Tour' : 'Next →'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Modal */}
      {quizActive && currentWaypoint.quizQuestion && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="glass rounded-2xl w-full max-w-md overflow-hidden">
            <div className="bg-gradient-to-r from-rainbow-purple to-rainbow-pink p-4">
              <h3 className="text-white font-bold text-lg flex items-center gap-2">
                <span className="text-2xl">🧠</span>
                Quiz Time!
              </h3>
            </div>

            <div className="p-4 space-y-4">
              <p className="text-white font-medium">
                {currentWaypoint.quizQuestion.question}
              </p>

              <div className="space-y-2">
                {currentWaypoint.quizQuestion.options.map((option, index) => {
                  const isCorrect = index === currentWaypoint.quizQuestion!.correctIndex;
                  const isSelected = selectedAnswer === index;

                  let buttonStyle = 'bg-white/10 hover:bg-white/20 border-white/20';
                  if (showResult) {
                    if (isCorrect) {
                      buttonStyle = 'bg-green-500/30 border-green-500';
                    } else if (isSelected && !isCorrect) {
                      buttonStyle = 'bg-red-500/30 border-red-500';
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleQuizAnswer(index)}
                      disabled={showResult}
                      className={`w-full text-left p-3 rounded-xl border transition-all ${buttonStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center
                                       ${showResult && isCorrect ? 'bg-green-500' :
                                         showResult && isSelected && !isCorrect ? 'bg-red-500' :
                                         'bg-white/10'} font-bold text-white`}>
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="text-white flex-1">{option}</span>
                        {showResult && isCorrect && <span className="text-2xl">✓</span>}
                        {showResult && isSelected && !isCorrect && <span className="text-2xl">✗</span>}
                      </div>
                    </button>
                  );
                })}
              </div>

              {showResult && (
                <div className={`rounded-xl p-3 ${
                  selectedAnswer === currentWaypoint.quizQuestion.correctIndex
                    ? 'bg-green-500/20 border border-green-500/30'
                    : 'bg-orange-500/20 border border-orange-500/30'
                }`}>
                  <p className="text-white font-medium mb-1">
                    {selectedAnswer === currentWaypoint.quizQuestion.correctIndex
                      ? '🎉 Correct!'
                      : '💡 Not quite!'}
                  </p>
                  <p className="text-gray-300 text-sm">
                    {currentWaypoint.quizQuestion.explanation}
                  </p>
                </div>
              )}

              {showResult && (
                <button
                  onClick={handleQuizContinue}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-rainbow-blue to-rainbow-purple
                           text-white font-bold"
                >
                  Continue Tour →
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
