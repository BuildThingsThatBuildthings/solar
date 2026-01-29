import { useState, useMemo } from 'react';
import { getAllSurvivability } from '../../../data/calculations';
import type { SurvivabilityRating } from '../../../data/calculations';

export const SurvivabilityChecker = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>('mars');

  const results = useMemo(() => getAllSurvivability(), []);

  const selectedResult = selectedPlanet
    ? results.find(r => r.planetId === selectedPlanet)
    : null;

  const getRatingColor = (rating: SurvivabilityRating): string => {
    switch (rating) {
      case 'comfortable': return 'from-rainbow-green to-rainbow-teal';
      case 'survivable-with-tech': return 'from-rainbow-teal to-rainbow-blue';
      case 'days': return 'from-rainbow-blue to-rainbow-purple';
      case 'hours': return 'from-rainbow-purple to-rainbow-pink';
      case 'minutes': return 'from-rainbow-orange to-rainbow-red';
      case 'instant-death': return 'from-rainbow-red to-red-900';
    }
  };

  const getRatingLabel = (rating: SurvivabilityRating): string => {
    switch (rating) {
      case 'comfortable': return 'Home Sweet Home';
      case 'survivable-with-tech': return 'With Technology';
      case 'days': return 'Days';
      case 'hours': return 'Hours';
      case 'minutes': return 'Minutes';
      case 'instant-death': return 'Instant Death';
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white/5 rounded-xl p-4">
        <h3 className="text-white font-bold mb-2 flex items-center gap-2">
          <span className="text-2xl">🧑‍🚀</span>
          Could You Survive?
        </h3>
        <p className="text-gray-400 text-sm">
          What would happen if you suddenly appeared on another planet without a spacesuit?
          (Spoiler: It's usually not good!)
        </p>
      </div>

      {/* Planet Selection Grid */}
      <div className="grid grid-cols-4 gap-2">
        {results.map((result) => (
          <button
            key={result.planetId}
            onClick={() => setSelectedPlanet(result.planetId)}
            className={`
              p-3 rounded-xl flex flex-col items-center gap-1 transition-all
              ${selectedPlanet === result.planetId
                ? `bg-gradient-to-br ${getRatingColor(result.rating)} border-2 border-white/30`
                : 'bg-white/5 hover:bg-white/10 border border-white/10'
              }
            `}
          >
            <span className="text-2xl">{result.emoji}</span>
            <span className="text-xs text-gray-300 font-medium">{result.planetName}</span>
            <span className="text-lg">{result.ratingEmoji}</span>
          </button>
        ))}
      </div>

      {/* Selected Planet Details */}
      {selectedResult && (
        <div className={`bg-gradient-to-br ${getRatingColor(selectedResult.rating)}/20 rounded-xl p-4 border border-white/20`}>
          <div className="flex items-start gap-4 mb-4">
            <div className="text-5xl">{selectedResult.emoji}</div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-xl">{selectedResult.planetName}</h3>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${getRatingColor(selectedResult.rating)} mt-1`}>
                <span className="text-lg">{selectedResult.ratingEmoji}</span>
                <span className="text-white font-bold text-sm">{getRatingLabel(selectedResult.rating)}</span>
              </div>
            </div>
          </div>

          {/* Survival Time */}
          <div className="mb-4">
            <p className="text-gray-400 text-sm mb-1">Survival time without protection:</p>
            <p className="text-white text-xl font-bold">{selectedResult.survivalTime}</p>
          </div>

          {/* Dangers */}
          <div className="mb-4">
            <p className="text-gray-400 text-sm mb-2">Main dangers:</p>
            <ul className="space-y-1">
              {selectedResult.dangers.map((danger, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                  <span className="text-rainbow-red">⚠️</span>
                  {danger}
                </li>
              ))}
            </ul>
          </div>

          {/* What Would Happen */}
          <div className="bg-black/20 rounded-xl p-3 mb-4">
            <p className="text-gray-400 text-xs mb-1">What would happen:</p>
            <p className="text-white text-sm">{selectedResult.whatWouldHappen}</p>
          </div>

          {/* Colonization */}
          <div className="bg-rainbow-blue/10 rounded-xl p-3">
            <p className="text-rainbow-blue text-xs mb-1 font-bold">🚀 Could we colonize it?</p>
            <p className="text-gray-300 text-sm">{selectedResult.couldWeColonize}</p>
          </div>
        </div>
      )}

      {/* Survival Ranking */}
      <div className="bg-white/5 rounded-xl p-3">
        <p className="text-gray-400 text-xs mb-2 font-medium">Survival Ranking (best to worst):</p>
        <div className="flex flex-wrap gap-1">
          {['earth', 'mars', 'venus', 'mercury', 'jupiter', 'saturn', 'uranus', 'neptune'].map((id, index) => {
            const result = results.find(r => r.planetId === id);
            if (!result) return null;
            return (
              <span
                key={id}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 text-xs"
              >
                <span className="text-gray-500">{index + 1}.</span>
                <span>{result.emoji}</span>
                <span className="text-gray-400">{result.planetName}</span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};
