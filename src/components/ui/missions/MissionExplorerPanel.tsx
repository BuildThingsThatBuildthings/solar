import { useState } from 'react';
import { useSolarSystemStore } from '../../../stores/solarSystemStore';
import { GlassPanel } from '../shared/GlassPanel';
import { MISSIONS, getMissionDuration } from '../../../data/missions';
import type { SpacecraftMission, MissionWaypoint } from '../../../data/missions';
import { planetsData } from '../../../data/planets';
import { sunData } from '../../../data/sun';

export const MissionExplorerPanel = () => {
  const {
    missionExplorerOpen,
    setMissionExplorerOpen,
    selectedMission,
    setSelectedMission,
    showMissionPath,
    setShowMissionPath,
  } = useSolarSystemStore();

  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const filteredMissions = MISSIONS.filter(m => {
    if (filter === 'all') return true;
    if (filter === 'active') return m.status === 'active' || m.status === 'extended';
    if (filter === 'completed') return m.status === 'completed' || m.status === 'lost';
    return true;
  });

  const getStatusColor = (status: SpacecraftMission['status']): string => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'extended': return 'bg-blue-500';
      case 'completed': return 'bg-gray-500';
      case 'lost': return 'bg-red-500';
    }
  };

  const getStatusLabel = (status: SpacecraftMission['status']): string => {
    switch (status) {
      case 'active': return 'Active';
      case 'extended': return 'Extended';
      case 'completed': return 'Completed';
      case 'lost': return 'Lost';
    }
  };

  const getBodyEmoji = (bodyId: string): string => {
    if (bodyId === 'sun') return sunData.emoji;
    const planet = planetsData.find(p => p.id === bodyId);
    return planet?.emoji || '🌟';
  };

  const getBodyName = (bodyId: string): string => {
    if (bodyId === 'sun') return 'Sun';
    const planet = planetsData.find(p => p.id === bodyId);
    return planet?.name || bodyId;
  };

  const getWaypointTypeEmoji = (type: MissionWaypoint['type']): string => {
    switch (type) {
      case 'launch': return '🚀';
      case 'flyby': return '👋';
      case 'orbit': return '🔄';
      case 'landing': return '🛬';
      case 'departure': return '💫';
      case 'current': return '📍';
    }
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <GlassPanel
      isOpen={missionExplorerOpen}
      onClose={() => setMissionExplorerOpen(false)}
      title="Mission Explorer"
      titleEmoji="🛸"
      position="center"
      className="w-[90vw] max-w-xl"
    >
      <div className="space-y-4">
        {/* Introduction */}
        <div className="bg-white/5 rounded-xl p-3 text-center">
          <p className="text-gray-300 text-sm">
            Explore the journeys of humanity's spacecraft through the solar system!
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 justify-center">
          {(['all', 'active', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                filter === f
                  ? 'bg-gradient-to-r from-rainbow-blue to-rainbow-purple text-white'
                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Mission not selected - Show List */}
        {!selectedMission && (
          <div className="space-y-2 max-h-[350px] overflow-y-auto pr-2">
            {filteredMissions.map((mission) => (
              <button
                key={mission.id}
                onClick={() => setSelectedMission(mission)}
                className="w-full text-left bg-white/5 hover:bg-white/10 rounded-xl p-4
                         transition-all border border-white/10 hover:border-white/20"
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{mission.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white font-bold">{mission.name}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs text-white ${getStatusColor(mission.status)}`}>
                        {getStatusLabel(mission.status)}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-1">{mission.agency}</p>
                    <p className="text-gray-500 text-xs">{mission.description}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                      <span>📅 {formatDate(mission.launchDate)}</span>
                      <span>⏱️ {getMissionDuration(mission)}</span>
                    </div>
                  </div>
                  <div className="text-gray-500">▶</div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Mission Selected - Show Details */}
        {selectedMission && (
          <div className="space-y-4">
            {/* Back Button */}
            <button
              onClick={() => setSelectedMission(null)}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              ← Back to missions
            </button>

            {/* Mission Header */}
            <div className="bg-gradient-to-br from-rainbow-blue/20 to-rainbow-purple/20 rounded-xl p-4 border border-rainbow-blue/30">
              <div className="flex items-start gap-4">
                <span className="text-5xl">{selectedMission.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-white font-bold text-xl">{selectedMission.name}</h2>
                    <span className={`px-2 py-0.5 rounded-full text-xs text-white ${getStatusColor(selectedMission.status)}`}>
                      {getStatusLabel(selectedMission.status)}
                    </span>
                  </div>
                  <p className="text-gray-400">{selectedMission.agency}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span>📅 Launched: {formatDate(selectedMission.launchDate)}</span>
                    <span>⏱️ {getMissionDuration(selectedMission)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Path Toggle */}
            <div className="flex items-center justify-between bg-white/5 rounded-xl p-3">
              <span className="text-gray-300 text-sm">Show mission path in 3D view</span>
              <button
                onClick={() => setShowMissionPath(!showMissionPath)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  showMissionPath ? 'bg-rainbow-blue' : 'bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-white transform transition-transform ${
                  showMissionPath ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            {/* Mission Timeline */}
            <div>
              <h3 className="text-white font-bold mb-2">Mission Timeline</h3>
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-700" />

                <div className="space-y-4">
                  {selectedMission.waypoints.map((waypoint, index) => (
                    <div key={index} className="relative flex items-start gap-4 pl-10">
                      {/* Timeline Dot */}
                      <div className={`absolute left-2 w-5 h-5 rounded-full flex items-center justify-center
                                    ${waypoint.type === 'current' ? 'bg-green-500 animate-pulse' : 'bg-rainbow-blue'}`}>
                        <span className="text-xs">{getWaypointTypeEmoji(waypoint.type)}</span>
                      </div>

                      {/* Waypoint Content */}
                      <div className="flex-1 bg-white/5 rounded-xl p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg">{getBodyEmoji(waypoint.bodyId)}</span>
                          <span className="text-white font-medium">{getBodyName(waypoint.bodyId)}</span>
                          <span className="text-gray-500 text-xs">
                            {waypoint.type === 'current' ? 'Present' : formatDate(waypoint.date)}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm">{waypoint.description}</p>
                        {waypoint.distanceFromSunAU && (
                          <p className="text-gray-500 text-xs mt-1">
                            Distance from Sun: {waypoint.distanceFromSunAU} AU
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div>
              <h3 className="text-white font-bold mb-2">Mission Highlights</h3>
              <ul className="space-y-2">
                {selectedMission.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                    <span className="text-rainbow-yellow">⭐</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Fun Fact */}
        <div className="bg-rainbow-purple/10 rounded-xl p-3 text-center">
          <p className="text-gray-400 text-xs">
            💡 Voyager 1 is over 24 billion km from Earth - its signals take 22+ hours to reach us!
          </p>
        </div>
      </div>
    </GlassPanel>
  );
};
