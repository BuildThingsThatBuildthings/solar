import { useState, useMemo } from 'react';
import { calculateWeightOnAllPlanets, calculateWeightOnSun } from '../../../data/calculations';
import { AnimatedNumber } from '../shared/AnimatedNumber';

export const WeightCalculator = () => {
  const [weight, setWeight] = useState(70);
  const [unit, setUnit] = useState<'kg' | 'lbs'>('kg');
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);

  const weightInKg = unit === 'kg' ? weight : weight / 2.20462;

  const results = useMemo(() => {
    const planets = calculateWeightOnAllPlanets(weightInKg);
    const sun = calculateWeightOnSun(weightInKg);
    return [sun, ...planets];
  }, [weightInKg]);

  const selectedResult = selectedPlanet
    ? results.find(r => r.planetId === selectedPlanet)
    : null;

  // Sort by weight for visual interest
  const sortedResults = [...results].sort((a, b) => b.weightKg - a.weightKg);

  const maxWeight = Math.max(...results.map(r => r.weightKg));

  return (
    <div className="space-y-4">
      {/* Weight Input */}
      <div className="bg-white/5 rounded-xl p-4 space-y-3">
        <label className="text-sm text-gray-400 font-medium block">
          Your weight on Earth
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(Math.max(0, Number(e.target.value)))}
            className="flex-1 bg-white/10 text-white text-2xl font-bold rounded-xl px-4 py-3
                     border border-white/20 focus:outline-none focus:border-rainbow-blue"
            min="0"
            max="1000"
          />
          <div className="flex rounded-xl overflow-hidden border border-white/20">
            <button
              onClick={() => {
                if (unit === 'lbs') {
                  setWeight(Math.round(weight / 2.20462));
                  setUnit('kg');
                }
              }}
              className={`px-4 py-3 font-bold transition-colors ${
                unit === 'kg'
                  ? 'bg-rainbow-blue text-white'
                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
              }`}
            >
              kg
            </button>
            <button
              onClick={() => {
                if (unit === 'kg') {
                  setWeight(Math.round(weight * 2.20462));
                  setUnit('lbs');
                }
              }}
              className={`px-4 py-3 font-bold transition-colors ${
                unit === 'lbs'
                  ? 'bg-rainbow-blue text-white'
                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
              }`}
            >
              lbs
            </button>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="space-y-2">
        <p className="text-sm text-gray-400">Click a planet to see details</p>
        <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-2">
          {sortedResults.map((result) => (
            <button
              key={result.planetId}
              onClick={() => setSelectedPlanet(
                selectedPlanet === result.planetId ? null : result.planetId
              )}
              className={`
                flex items-center gap-3 p-3 rounded-xl transition-all text-left
                ${selectedPlanet === result.planetId
                  ? 'bg-gradient-to-r from-rainbow-blue/30 to-rainbow-purple/30 border border-rainbow-blue/50'
                  : 'bg-white/5 hover:bg-white/10 border border-transparent'
                }
              `}
            >
              <span className="text-2xl w-8 text-center">{result.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-white font-medium">{result.planetName}</span>
                  <span className="text-rainbow-yellow font-bold">
                    <AnimatedNumber
                      value={unit === 'kg' ? result.weightKg : result.weightLbs}
                      decimals={1}
                      suffix={unit === 'kg' ? ' kg' : ' lbs'}
                    />
                  </span>
                </div>
                {/* Weight bar */}
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-rainbow-green to-rainbow-blue rounded-full transition-all duration-500"
                    style={{ width: `${(result.weightKg / maxWeight) * 100}%` }}
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Planet Details */}
      {selectedResult && (
        <div className="bg-gradient-to-br from-rainbow-blue/20 to-rainbow-purple/20 rounded-xl p-4 border border-rainbow-blue/30">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{selectedResult.emoji}</span>
            <div>
              <h3 className="text-white font-bold text-lg">{selectedResult.planetName}</h3>
              <p className="text-gray-400 text-sm">
                Surface gravity: {selectedResult.gravity.toFixed(2)} m/s²
                ({(selectedResult.gravityRatio * 100).toFixed(0)}% of Earth)
              </p>
            </div>
          </div>
          <p className="text-rainbow-yellow text-sm italic">
            💡 {selectedResult.funFact}
          </p>
        </div>
      )}

      {/* Fun Summary */}
      <div className="text-center text-sm text-gray-500">
        {weight > 0 && (
          <>
            You'd weigh the most on the <span className="text-rainbow-yellow">Sun</span> (
            <AnimatedNumber value={results[0].weightKg} decimals={0} suffix=" kg" className="font-bold" />
            ) and the least on <span className="text-rainbow-green">Mercury</span> (
            <AnimatedNumber
              value={results.find(r => r.planetId === 'mercury')?.weightKg || 0}
              decimals={1}
              suffix=" kg"
              className="font-bold"
            />
            )
          </>
        )}
      </div>
    </div>
  );
};
