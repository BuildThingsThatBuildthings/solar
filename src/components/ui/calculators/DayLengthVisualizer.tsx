import { useState, useMemo } from 'react';
import { getAllDayLengths } from '../../../data/calculations';
import { AnimatedNumber } from '../shared/AnimatedNumber';

export const DayLengthVisualizer = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);

  const results = useMemo(() => getAllDayLengths(), []);

  const selectedResult = selectedPlanet
    ? results.find(r => r.planetId === selectedPlanet)
    : null;

  // Sort by day length for visual comparison
  const sortedResults = [...results].sort((a, b) => b.dayLengthHours - a.dayLengthHours);

  // For visualization, cap the bar at 48 hours to make shorter days visible
  const visualMax = 48; // hours

  const formatDayLength = (hours: number): string => {
    if (hours < 24) {
      return `${hours.toFixed(1)} hours`;
    } else if (hours < 168) { // Less than a week
      const days = hours / 24;
      return `${days.toFixed(1)} Earth days`;
    } else {
      const days = Math.floor(hours / 24);
      return `${days} Earth days`;
    }
  };

  const getSpeedIndicator = (hours: number): { emoji: string; label: string } => {
    if (hours < 12) return { emoji: '🚀', label: 'Super fast!' };
    if (hours < 20) return { emoji: '⚡', label: 'Fast' };
    if (hours < 30) return { emoji: '🌍', label: 'Earth-like' };
    if (hours < 100) return { emoji: '🐢', label: 'Slow' };
    return { emoji: '🦥', label: 'Very slow' };
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white/5 rounded-xl p-4">
        <h3 className="text-white font-bold mb-2">How long is a day?</h3>
        <p className="text-gray-400 text-sm">
          A "day" is how long it takes a planet to spin once on its axis.
          Some planets spin incredibly fast, others take months!
        </p>
      </div>

      {/* Visual Comparison */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-gray-500 px-2">
          <span>0h</span>
          <span>24h (Earth)</span>
          <span>48h+</span>
        </div>
        <div className="space-y-2 max-h-[280px] overflow-y-auto pr-2">
          {sortedResults.map((result) => {
            const barWidth = Math.min(100, (result.dayLengthHours / visualMax) * 100);
            const isOverMax = result.dayLengthHours > visualMax;
            const speedInfo = getSpeedIndicator(result.dayLengthHours);

            return (
              <button
                key={result.planetId}
                onClick={() => setSelectedPlanet(
                  selectedPlanet === result.planetId ? null : result.planetId
                )}
                className={`
                  w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left
                  ${selectedPlanet === result.planetId
                    ? 'bg-gradient-to-r from-rainbow-orange/30 to-rainbow-yellow/30 border border-rainbow-orange/50'
                    : 'bg-white/5 hover:bg-white/10 border border-transparent'
                  }
                `}
              >
                <span className="text-2xl w-8 text-center">{result.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white font-medium text-sm">{result.planetName}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-400">{speedInfo.emoji}</span>
                      <span className="text-rainbow-orange font-bold text-sm">
                        {formatDayLength(result.dayLengthHours)}
                      </span>
                    </div>
                  </div>
                  {/* Day length bar */}
                  <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
                    {/* Earth reference line at 24h */}
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-white/30 z-10"
                      style={{ left: `${(24 / visualMax) * 100}%` }}
                    />
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isOverMax
                          ? 'bg-gradient-to-r from-rainbow-orange to-rainbow-red'
                          : 'bg-gradient-to-r from-rainbow-yellow to-rainbow-orange'
                      }`}
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 text-xs">
        <span className="flex items-center gap-1 text-gray-400">
          <div className="w-3 h-3 bg-white/30 rounded-sm" />
          Earth (24h)
        </span>
        <span className="flex items-center gap-1 text-gray-400">
          <div className="w-3 h-3 bg-gradient-to-r from-rainbow-yellow to-rainbow-orange rounded-sm" />
          Day length
        </span>
      </div>

      {/* Selected Planet Details */}
      {selectedResult && (
        <div className="bg-gradient-to-br from-rainbow-orange/20 to-rainbow-yellow/20 rounded-xl p-4 border border-rainbow-orange/30">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{selectedResult.emoji}</span>
            <div>
              <h3 className="text-white font-bold text-lg">{selectedResult.planetName}</h3>
              <p className="text-gray-400 text-sm">
                Day length: {formatDayLength(selectedResult.dayLengthHours)}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-gray-300 text-sm">
              <span className="text-rainbow-orange">{selectedResult.comparedToEarth}</span> than Earth's day
            </p>
            {selectedResult.planetId !== 'earth' && (
              <p className="text-gray-300 text-sm">
                In one Earth day, {selectedResult.planetName} completes{' '}
                <span className="text-rainbow-yellow font-bold">
                  <AnimatedNumber
                    value={24 / selectedResult.dayLengthHours}
                    decimals={2}
                  />
                </span>{' '}
                {selectedResult.dayLengthHours < 24 ? 'rotations' : 'of a rotation'}
              </p>
            )}
            <p className="text-rainbow-orange text-sm italic">
              💡 {selectedResult.funFact}
            </p>
          </div>
        </div>
      )}

      {/* Fun Facts */}
      <div className="text-center text-sm text-gray-500">
        <p>
          <span className="text-rainbow-yellow">Jupiter</span> has the shortest day (9.9h) while{' '}
          <span className="text-rainbow-orange">Venus</span> has the longest (243 Earth days)!
        </p>
      </div>
    </div>
  );
};
