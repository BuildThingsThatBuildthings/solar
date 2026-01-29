import { useState, useMemo } from 'react';
import { useSolarSystemStore } from '../../../stores/solarSystemStore';
import { GlassPanel } from '../shared/GlassPanel';
import { PlanetGridPicker } from '../shared/PlanetPicker';
import { AnimatedNumber } from '../shared/AnimatedNumber';
import { calculateTravelTime, TRAVEL_SPEEDS } from '../../../data/scale';
import type { TravelTimeResult } from '../../../data/scale';

export const TravelCalculator = () => {
  const { travelCalculatorOpen, setTravelCalculatorOpen } = useSolarSystemStore();

  const [origin, setOrigin] = useState('earth');
  const [destination, setDestination] = useState('mars');
  const [selectedSpeed, setSelectedSpeed] = useState('rocket');

  const result = useMemo(() => {
    return calculateTravelTime(origin, destination, selectedSpeed);
  }, [origin, destination, selectedSpeed]);

  const allResults = useMemo(() => {
    return TRAVEL_SPEEDS.map(speed =>
      calculateTravelTime(origin, destination, speed.id)
    ).filter(Boolean) as TravelTimeResult[];
  }, [origin, destination]);

  const swapDestinations = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  return (
    <GlassPanel
      isOpen={travelCalculatorOpen}
      onClose={() => setTravelCalculatorOpen(false)}
      title="Space Travel Calculator"
      titleEmoji="🚀"
      position="center"
      className="w-[90vw] max-w-lg"
    >
      <div className="space-y-4">
        {/* Origin Selection */}
        <div>
          <label className="text-sm text-gray-400 font-medium mb-2 block">
            Starting from:
          </label>
          <PlanetGridPicker
            value={origin}
            onChange={setOrigin}
            includeSun={true}
            excludePlanets={[destination]}
            columns={5}
          />
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <button
            onClick={swapDestinations}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20
                     text-gray-300 hover:text-white transition-all flex items-center gap-2"
          >
            <span className="text-xl">🔄</span>
            Swap
          </button>
        </div>

        {/* Destination Selection */}
        <div>
          <label className="text-sm text-gray-400 font-medium mb-2 block">
            Traveling to:
          </label>
          <PlanetGridPicker
            value={destination}
            onChange={setDestination}
            includeSun={true}
            excludePlanets={[origin]}
            columns={5}
          />
        </div>

        {/* Speed Selection */}
        <div>
          <label className="text-sm text-gray-400 font-medium mb-2 block">
            How are you traveling?
          </label>
          <div className="grid grid-cols-4 gap-2">
            {TRAVEL_SPEEDS.filter(s => s.id !== 'light').map((speed) => (
              <button
                key={speed.id}
                onClick={() => setSelectedSpeed(speed.id)}
                className={`
                  p-2 rounded-xl flex flex-col items-center gap-1 transition-all
                  ${selectedSpeed === speed.id
                    ? 'bg-gradient-to-br from-rainbow-blue/30 to-rainbow-purple/30 border-2 border-rainbow-blue/50'
                    : 'bg-white/5 hover:bg-white/10 border border-white/10'
                  }
                `}
              >
                <span className="text-2xl">{speed.emoji}</span>
                <span className="text-xs text-gray-300">{speed.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Result Display */}
        {result && origin !== destination && (
          <div className="bg-gradient-to-br from-rainbow-blue/20 to-rainbow-purple/20 rounded-xl p-4 border border-rainbow-blue/30">
            <div className="text-center mb-3">
              <p className="text-gray-400 text-sm">Travel time at {result.travelSpeed.name} speed:</p>
              <p className="text-4xl font-bold text-rainbow-yellow mt-2">
                {result.travelTimeFormatted}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm mb-3">
              <div className="bg-black/20 rounded-lg p-2">
                <p className="text-gray-500 text-xs">Distance</p>
                <p className="text-white font-bold">
                  <AnimatedNumber
                    value={result.distanceKm / 1_000_000}
                    decimals={1}
                    suffix=" million km"
                  />
                </p>
              </div>
              <div className="bg-black/20 rounded-lg p-2">
                <p className="text-gray-500 text-xs">Speed</p>
                <p className="text-white font-bold">
                  {result.travelSpeed.speedKmPerHour.toLocaleString()} km/h
                </p>
              </div>
            </div>

            <p className="text-rainbow-purple text-sm italic text-center">
              💡 {result.funComparison}
            </p>
          </div>
        )}

        {/* Same destination warning */}
        {origin === destination && (
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <span className="text-2xl">🤔</span>
            <p className="text-gray-400 mt-2">
              You're already there! Pick a different destination.
            </p>
          </div>
        )}

        {/* Comparison Table */}
        {origin !== destination && (
          <div>
            <p className="text-sm text-gray-400 font-medium mb-2">
              Compare all travel methods:
            </p>
            <div className="bg-white/5 rounded-xl overflow-hidden">
              <div className="max-h-[150px] overflow-y-auto">
                {allResults.map((r) => (
                  <div
                    key={r.travelSpeed.id}
                    className={`flex items-center justify-between px-3 py-2 border-b border-white/5 last:border-0
                              ${r.travelSpeed.id === selectedSpeed ? 'bg-white/10' : ''}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{r.travelSpeed.emoji}</span>
                      <span className="text-gray-300 text-sm">{r.travelSpeed.name}</span>
                    </div>
                    <span className="text-rainbow-yellow font-bold text-sm">
                      {r.travelTimeFormatted}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Light Speed Note */}
        <div className="bg-yellow-500/10 rounded-xl p-3 text-center">
          <p className="text-gray-400 text-xs">
            <span className="text-yellow-400">⚡</span> Even at light speed (299,792 km/s),
            it would take{' '}
            <span className="text-yellow-400 font-bold">
              {origin !== destination
                ? calculateTravelTime(origin, destination, 'light')?.travelTimeFormatted
                : '0 seconds'
              }
            </span>
          </p>
        </div>
      </div>
    </GlassPanel>
  );
};
