import { useSolarSystemStore } from '../../../stores/solarSystemStore';
import { GlassPanel } from '../shared/GlassPanel';
import { TOURS } from '../../../data/tours';
import type { Tour } from '../../../data/tours';

export const TourMenu = () => {
  const {
    tourMenuOpen,
    setTourMenuOpen,
    startTour,
  } = useSolarSystemStore();

  const getDifficultyColor = (difficulty: Tour['difficulty']): string => {
    switch (difficulty) {
      case 'beginner': return 'from-rainbow-green to-rainbow-teal';
      case 'intermediate': return 'from-rainbow-yellow to-rainbow-orange';
      case 'advanced': return 'from-rainbow-red to-rainbow-pink';
    }
  };

  const getDifficultyEmoji = (difficulty: Tour['difficulty']): string => {
    switch (difficulty) {
      case 'beginner': return '🌱';
      case 'intermediate': return '🚀';
      case 'advanced': return '🌟';
    }
  };

  const getCategoryEmoji = (category: Tour['category']): string => {
    switch (category) {
      case 'exploration': return '🔭';
      case 'science': return '🔬';
      case 'comparison': return '⚖️';
      case 'history': return '📜';
    }
  };

  const handleStartTour = (tourId: string) => {
    startTour(tourId);
  };

  return (
    <GlassPanel
      isOpen={tourMenuOpen}
      onClose={() => setTourMenuOpen(false)}
      title="Guided Tours"
      titleEmoji="🎓"
      position="center"
      className="w-[90vw] max-w-lg"
    >
      <div className="space-y-4">
        {/* Introduction */}
        <div className="bg-white/5 rounded-xl p-4 text-center">
          <p className="text-gray-300 text-sm">
            Take a guided journey through the solar system!
            Learn fascinating facts and test your knowledge with quizzes.
          </p>
        </div>

        {/* Tour Cards */}
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {TOURS.map((tour) => (
            <button
              key={tour.id}
              onClick={() => handleStartTour(tour.id)}
              className="w-full text-left bg-white/5 hover:bg-white/10 rounded-xl p-4
                       transition-all border border-white/10 hover:border-white/20"
            >
              <div className="flex items-start gap-3">
                <span className="text-4xl">{tour.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-bold">{tour.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full bg-gradient-to-r ${getDifficultyColor(tour.difficulty)} text-white`}>
                      {getDifficultyEmoji(tour.difficulty)} {tour.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{tour.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      {getCategoryEmoji(tour.category)} {tour.category}
                    </span>
                    <span className="flex items-center gap-1">
                      ⏱️ {tour.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      📍 {tour.waypoints.length} stops
                    </span>
                  </div>
                </div>
                <div className="text-gray-500 text-2xl">▶</div>
              </div>
            </button>
          ))}
        </div>

        {/* Legend */}
        <div className="bg-white/5 rounded-xl p-3">
          <p className="text-gray-400 text-xs font-medium mb-2">Difficulty Levels:</p>
          <div className="flex gap-4 justify-center">
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <span className="w-2 h-2 rounded-full bg-rainbow-green" />
              Beginner
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <span className="w-2 h-2 rounded-full bg-rainbow-orange" />
              Intermediate
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <span className="w-2 h-2 rounded-full bg-rainbow-red" />
              Advanced
            </span>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
};
