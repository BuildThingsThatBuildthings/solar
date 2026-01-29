import { useState, useMemo } from 'react';
import { calculateAgeOnAllPlanets } from '../../../data/calculations';
import { AnimatedNumber } from '../shared/AnimatedNumber';

export const AgeCalculator = () => {
  const [earthAge, setEarthAge] = useState(25);
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);

  const results = useMemo(() => {
    return calculateAgeOnAllPlanets(earthAge);
  }, [earthAge]);

  const selectedResult = selectedPlanet
    ? results.find(r => r.planetId === selectedPlanet)
    : null;

  // Sort by age (descending - most birthdays first)
  const sortedResults = [...results].sort((a, b) => b.ageYears - a.ageYears);

  const formatAge = (years: number): string => {
    if (years >= 1) {
      const wholeYears = Math.floor(years);
      const months = Math.floor((years - wholeYears) * 12);
      if (months > 0) {
        return `${wholeYears} years, ${months} months`;
      }
      return `${wholeYears} years`;
    } else {
      const months = Math.floor(years * 12);
      const days = Math.floor((years * 365.25) % 30.44);
      if (months > 0) {
        return `${months} months, ${days} days`;
      }
      return `${Math.floor(years * 365.25)} days`;
    }
  };

  const getBirthdayEmoji = (ageYears: number): string => {
    if (ageYears > 100) return '🎂';
    if (ageYears > 50) return '🎉';
    if (ageYears > 10) return '🎈';
    if (ageYears > 1) return '🎁';
    return '👶';
  };

  return (
    <div className="space-y-4">
      {/* Age Input */}
      <div className="bg-white/5 rounded-xl p-4 space-y-3">
        <label className="text-sm text-gray-400 font-medium block">
          Your age on Earth (years)
        </label>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => setEarthAge(Math.max(0, earthAge - 1))}
            className="w-12 h-12 rounded-xl bg-white/10 text-white text-xl font-bold
                     hover:bg-white/20 transition-colors"
          >
            -
          </button>
          <input
            type="number"
            value={earthAge}
            onChange={(e) => setEarthAge(Math.max(0, Math.min(150, Number(e.target.value))))}
            className="flex-1 bg-white/10 text-white text-3xl font-bold rounded-xl px-4 py-3
                     border border-white/20 focus:outline-none focus:border-rainbow-blue text-center"
            min="0"
            max="150"
          />
          <button
            onClick={() => setEarthAge(Math.min(150, earthAge + 1))}
            className="w-12 h-12 rounded-xl bg-white/10 text-white text-xl font-bold
                     hover:bg-white/20 transition-colors"
          >
            +
          </button>
        </div>
        {/* Quick age buttons */}
        <div className="flex flex-wrap gap-2 justify-center">
          {[5, 10, 18, 25, 50, 84].map((age) => (
            <button
              key={age}
              onClick={() => setEarthAge(age)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                earthAge === age
                  ? 'bg-rainbow-blue text-white'
                  : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'
              }`}
            >
              {age}
            </button>
          ))}
        </div>
      </div>

      {/* Results Grid */}
      <div className="space-y-2">
        <p className="text-sm text-gray-400">How old would you be?</p>
        <div className="grid grid-cols-1 gap-2 max-h-[280px] overflow-y-auto pr-2">
          {sortedResults.map((result) => (
            <button
              key={result.planetId}
              onClick={() => setSelectedPlanet(
                selectedPlanet === result.planetId ? null : result.planetId
              )}
              className={`
                flex items-center gap-3 p-3 rounded-xl transition-all text-left
                ${selectedPlanet === result.planetId
                  ? 'bg-gradient-to-r from-rainbow-purple/30 to-rainbow-pink/30 border border-rainbow-purple/50'
                  : 'bg-white/5 hover:bg-white/10 border border-transparent'
                }
              `}
            >
              <span className="text-2xl w-8 text-center">{result.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">{result.planetName}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-rainbow-purple font-bold">
                      <AnimatedNumber
                        value={result.ageYears}
                        decimals={result.ageYears < 1 ? 2 : 1}
                        suffix=" yrs"
                      />
                    </span>
                    <span className="text-lg">{getBirthdayEmoji(result.ageYears)}</span>
                  </div>
                </div>
                <p className="text-gray-500 text-xs">
                  {result.planetId === 'earth'
                    ? 'Your actual age'
                    : `1 year = ${(result.orbitalPeriodDays / 365.25).toFixed(2)} Earth years`
                  }
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Planet Details */}
      {selectedResult && (
        <div className="bg-gradient-to-br from-rainbow-purple/20 to-rainbow-pink/20 rounded-xl p-4 border border-rainbow-purple/30">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{selectedResult.emoji}</span>
            <div>
              <h3 className="text-white font-bold text-lg">{selectedResult.planetName}</h3>
              <p className="text-gray-400 text-sm">
                You would be {formatAge(selectedResult.ageYears)} old
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-gray-300 text-sm">
              {selectedResult.planetId !== 'earth' && (
                <>
                  <span className="text-rainbow-yellow">
                    {Math.floor(selectedResult.ageYears)} birthdays
                  </span>{' '}
                  celebrated so far on {selectedResult.planetName}!
                </>
              )}
            </p>
            <p className="text-rainbow-purple text-sm italic">
              💡 {selectedResult.funFact}
            </p>
          </div>
        </div>
      )}

      {/* Fun Facts */}
      <div className="text-center text-sm text-gray-500 space-y-1">
        <p>
          Most birthdays on <span className="text-rainbow-yellow">Mercury</span> (
          <AnimatedNumber
            value={results.find(r => r.planetId === 'mercury')?.ageYears || 0}
            decimals={1}
            className="font-bold"
          />
          )
        </p>
        <p>
          Fewest birthdays on <span className="text-rainbow-blue">Neptune</span> (
          <AnimatedNumber
            value={results.find(r => r.planetId === 'neptune')?.ageYears || 0}
            decimals={2}
            className="font-bold"
          />
          )
        </p>
      </div>
    </div>
  );
};
