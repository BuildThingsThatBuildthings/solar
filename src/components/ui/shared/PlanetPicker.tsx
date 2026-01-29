import { planetsData } from '../../../data/planets';
import { sunData } from '../../../data/sun';

interface PlanetPickerProps {
  value: string;
  onChange: (planetId: string) => void;
  label?: string;
  includeSun?: boolean;
  excludePlanets?: string[];
  className?: string;
  showEmoji?: boolean;
}

export const PlanetPicker = ({
  value,
  onChange,
  label,
  includeSun = false,
  excludePlanets = [],
  className = '',
  showEmoji = true,
}: PlanetPickerProps) => {
  const planets = planetsData.filter((p) => !excludePlanets.includes(p.id));

  const getSelectedBody = () => {
    if (value === 'sun') return { emoji: sunData.emoji, name: sunData.name };
    const planet = planetsData.find((p) => p.id === value);
    return planet ? { emoji: planet.emoji, name: planet.name } : null;
  };

  const selected = getSelectedBody();

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm text-gray-400 font-medium">{label}</label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            w-full appearance-none
            bg-white/10 text-white rounded-xl
            px-4 py-3 pr-10
            border border-white/20
            focus:outline-none focus:border-rainbow-blue
            cursor-pointer
            font-medium
          "
        >
          {includeSun && (
            <option value="sun">
              {showEmoji ? `${sunData.emoji} ` : ''}Sun
            </option>
          )}
          {planets.map((planet) => (
            <option key={planet.id} value={planet.id}>
              {showEmoji ? `${planet.emoji} ` : ''}{planet.name}
            </option>
          ))}
        </select>

        {/* Custom dropdown arrow */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
          ▼
        </div>

        {/* Selected emoji display (overlays the text) */}
        {showEmoji && selected && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-xl">
            {selected.emoji}
          </div>
        )}
      </div>
    </div>
  );
};

// Grid version for visual selection
interface PlanetGridPickerProps {
  value: string;
  onChange: (planetId: string) => void;
  includeSun?: boolean;
  excludePlanets?: string[];
  className?: string;
  columns?: 3 | 4 | 5;
}

export const PlanetGridPicker = ({
  value,
  onChange,
  includeSun = false,
  excludePlanets = [],
  className = '',
  columns = 5,
}: PlanetGridPickerProps) => {
  const planets = planetsData.filter((p) => !excludePlanets.includes(p.id));

  const gridCols = {
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-2 ${className}`}>
      {includeSun && (
        <button
          onClick={() => onChange('sun')}
          className={`
            p-3 rounded-xl flex flex-col items-center gap-1
            transition-all btn-bounce
            ${value === 'sun'
              ? 'bg-gradient-to-br from-yellow-500/30 to-orange-500/30 border-2 border-yellow-500/50'
              : 'bg-white/5 hover:bg-white/10 border border-white/10'
            }
          `}
        >
          <span className="text-2xl">{sunData.emoji}</span>
          <span className="text-xs text-gray-300">Sun</span>
        </button>
      )}
      {planets.map((planet) => (
        <button
          key={planet.id}
          onClick={() => onChange(planet.id)}
          className={`
            p-3 rounded-xl flex flex-col items-center gap-1
            transition-all btn-bounce
            ${value === planet.id
              ? `bg-gradient-to-br border-2`
              : 'bg-white/5 hover:bg-white/10 border border-white/10'
            }
          `}
          style={value === planet.id ? {
            borderColor: planet.color,
            background: `linear-gradient(135deg, ${planet.color}20, ${planet.color}10)`,
          } : undefined}
        >
          <span className="text-2xl">{planet.emoji}</span>
          <span className="text-xs text-gray-300">{planet.name}</span>
        </button>
      ))}
    </div>
  );
};
