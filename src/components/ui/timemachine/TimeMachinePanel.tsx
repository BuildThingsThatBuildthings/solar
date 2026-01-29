import { useState, useMemo } from 'react';
import { useSolarSystemStore } from '../../../stores/solarSystemStore';
import { GlassPanel } from '../shared/GlassPanel';
import { HISTORICAL_EVENTS, FUTURE_EVENTS } from '../../../data/history';
import type { HistoricalEvent } from '../../../data/history';

export const TimeMachinePanel = () => {
  const {
    timeMachineActive,
    setTimeMachineActive,
    selectedDate,
    setSelectedDate,
    dateMode,
    setDateMode,
    jumpToHistoricalEvent,
    selectedHistoricalEvent,
  } = useSolarSystemStore();

  const [birthdayInput, setBirthdayInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'mission' | 'discovery' | 'celestial' | 'human'>('all');

  const allEvents = useMemo(() => {
    const events = [...HISTORICAL_EVENTS, ...FUTURE_EVENTS].sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
    if (selectedCategory === 'all') return events;
    return events.filter(e => e.category === selectedCategory);
  }, [selectedCategory]);

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    if (!isNaN(date.getTime())) {
      setSelectedDate(date);
      setDateMode('custom');
    }
  };

  const handleBirthdaySubmit = () => {
    const date = new Date(birthdayInput);
    if (!isNaN(date.getTime())) {
      setSelectedDate(date);
      setDateMode('birthday');
    }
  };

  const goToToday = () => {
    setSelectedDate(new Date());
    setDateMode('current');
  };

  const getCategoryEmoji = (category: HistoricalEvent['category']): string => {
    switch (category) {
      case 'mission': return '🚀';
      case 'discovery': return '🔭';
      case 'celestial': return '✨';
      case 'human': return '👨‍🚀';
    }
  };

  const isFutureEvent = (event: HistoricalEvent): boolean => {
    return event.date.getTime() > new Date().getTime();
  };

  if (!timeMachineActive) return null;

  return (
    <GlassPanel
      isOpen={timeMachineActive}
      onClose={() => setTimeMachineActive(false)}
      title="Time Machine"
      titleEmoji="⏰"
      position="left"
      className="w-[90vw] max-w-sm"
    >
      <div className="space-y-4">
        {/* Current Date Display */}
        <div className="bg-gradient-to-br from-rainbow-orange/20 to-rainbow-yellow/20 rounded-xl p-4 text-center border border-rainbow-orange/30">
          <p className="text-gray-400 text-sm">Viewing the solar system on:</p>
          <p className="text-2xl font-bold text-white mt-1">
            {formatDate(selectedDate)}
          </p>
          {dateMode === 'birthday' && (
            <p className="text-rainbow-yellow text-sm mt-1">Your birthday!</p>
          )}
          {dateMode === 'historical' && selectedHistoricalEvent && (
            <p className="text-rainbow-orange text-sm mt-1">
              {selectedHistoricalEvent.emoji} {selectedHistoricalEvent.name}
            </p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={goToToday}
            className={`px-4 py-3 rounded-xl font-bold transition-all ${
              dateMode === 'current'
                ? 'bg-gradient-to-r from-rainbow-blue to-rainbow-purple text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            📅 Today
          </button>
          <button
            onClick={() => setDateMode('custom')}
            className={`px-4 py-3 rounded-xl font-bold transition-all ${
              dateMode === 'custom'
                ? 'bg-gradient-to-r from-rainbow-blue to-rainbow-purple text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            🔧 Custom
          </button>
        </div>

        {/* Custom Date Picker */}
        {dateMode === 'custom' && (
          <div className="bg-white/5 rounded-xl p-3">
            <label className="text-sm text-gray-400 block mb-2">Select a date:</label>
            <input
              type="date"
              value={selectedDate.toISOString().split('T')[0]}
              onChange={handleDateChange}
              className="w-full bg-white/10 text-white rounded-lg px-4 py-2 border border-white/20
                       focus:outline-none focus:border-rainbow-blue"
              min="1600-01-01"
              max="2100-12-31"
            />
          </div>
        )}

        {/* Birthday Mode */}
        <div className="bg-white/5 rounded-xl p-3">
          <label className="text-sm text-gray-400 block mb-2">
            🎂 Where were the planets when you were born?
          </label>
          <div className="flex gap-2">
            <input
              type="date"
              value={birthdayInput}
              onChange={(e) => setBirthdayInput(e.target.value)}
              className="flex-1 bg-white/10 text-white rounded-lg px-3 py-2 border border-white/20
                       focus:outline-none focus:border-rainbow-pink text-sm"
            />
            <button
              onClick={handleBirthdaySubmit}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-rainbow-pink to-rainbow-purple
                       text-white font-bold text-sm"
            >
              Go!
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-1 justify-center">
          {(['all', 'mission', 'discovery', 'celestial', 'human'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-rainbow-blue text-white'
                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
              }`}
            >
              {cat === 'all' ? '🌟 All' : `${getCategoryEmoji(cat)} ${cat}`}
            </button>
          ))}
        </div>

        {/* Historical Events Timeline */}
        <div>
          <p className="text-sm text-gray-400 font-medium mb-2">
            Jump to a historical event:
          </p>
          <div className="space-y-2 max-h-[250px] overflow-y-auto pr-2">
            {allEvents.map((event) => (
              <button
                key={event.id}
                onClick={() => jumpToHistoricalEvent(event)}
                className={`
                  w-full text-left p-3 rounded-xl transition-all
                  ${selectedHistoricalEvent?.id === event.id
                    ? 'bg-gradient-to-r from-rainbow-orange/30 to-rainbow-yellow/30 border border-rainbow-orange/50'
                    : 'bg-white/5 hover:bg-white/10 border border-transparent'
                  }
                  ${isFutureEvent(event) ? 'opacity-70' : ''}
                `}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{event.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium text-sm truncate">
                        {event.name}
                      </span>
                      {isFutureEvent(event) && (
                        <span className="text-xs bg-rainbow-blue/30 text-rainbow-blue px-2 py-0.5 rounded-full">
                          Future
                        </span>
                      )}
                    </div>
                    <p className="text-gray-500 text-xs">
                      {event.date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </p>
                    <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                      {event.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Event Details */}
        {selectedHistoricalEvent && (
          <div className="bg-gradient-to-br from-rainbow-purple/20 to-rainbow-pink/20 rounded-xl p-3 border border-rainbow-purple/30">
            <p className="text-rainbow-purple text-xs font-bold mb-1">
              {getCategoryEmoji(selectedHistoricalEvent.category)} Selected Event
            </p>
            <p className="text-white font-bold">
              {selectedHistoricalEvent.emoji} {selectedHistoricalEvent.name}
            </p>
            <p className="text-gray-300 text-sm mt-1">
              {selectedHistoricalEvent.significance}
            </p>
          </div>
        )}

        {/* Info Note */}
        <div className="text-center text-xs text-gray-500">
          <p>
            🔭 Planet positions are calculated using simplified orbital mechanics.
          </p>
          <p>
            Actual positions may vary slightly from these approximations.
          </p>
        </div>
      </div>
    </GlassPanel>
  );
};
