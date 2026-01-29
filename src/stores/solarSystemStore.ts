import { create } from 'zustand';
import type { PlanetData } from '../data/planets';
import type { MoonData } from '../data/moons';
import type { SunData } from '../data/sun';
import type { ConstellationData } from '../data/constellations';

export type CelestialBodyType = 'sun' | 'planet' | 'moon' | 'constellation';

export interface SelectedBody {
  type: CelestialBodyType;
  data: PlanetData | MoonData | SunData | ConstellationData;
}

export type CameraMode = 'free' | 'follow' | 'orbit' | 'cinematic';
export type ScaleMode = 'visual' | 'accurate-size' | 'accurate-distance';
export type InfoPanelTab = 'overview' | 'physical' | 'orbital' | 'composition' | 'exploration' | 'facts';
export type ScaleVisualizationMode = 'artistic' | 'true-size' | 'true-distance';
export type TourMode = 'idle' | 'playing' | 'paused';

// Import types from data files
import type { HistoricalEvent } from '../data/history';
import type { SpacecraftMission, MissionWaypoint } from '../data/missions';

export type { HistoricalEvent, SpacecraftMission, MissionWaypoint };

interface SolarSystemState {
  // Playback controls
  isPlaying: boolean;
  speed: number;
  timeScale: number; // for realistic time simulation

  // Display toggles
  showOrbits: boolean;
  showConstellations: boolean;
  showMoons: boolean;
  showLabels: boolean;
  showDistances: boolean;
  showComparisons: boolean;
  showAtmospheres: boolean;

  // Scale and view
  scaleMode: ScaleMode;
  zoomLevel: number;

  // Selection
  selectedBody: SelectedBody | null;
  hoveredBody: string | null;
  comparisonBody: SelectedBody | null; // for size comparisons

  // Info panel
  infoPanelTab: InfoPanelTab;
  infoPanelExpanded: boolean;

  // Camera
  cameraMode: CameraMode;
  cameraTarget: [number, number, number] | null;
  followTarget: string | null; // id of body to follow
  shouldResetCamera: boolean;
  cameraDistance: number;

  // Search and filter
  searchQuery: string;
  filterCategory: 'all' | 'planets' | 'moons' | 'constellations';

  // UI state
  showHelp: boolean;
  showSettings: boolean;
  showSearch: boolean;

  // ===== EDUCATIONAL FEATURES =====

  // Feature 1: Calculators
  calculatorPanelOpen: boolean;
  activeCalculator: 'weight' | 'age' | 'day' | 'survive' | null;

  // Feature 2: Scale & Distance Visualizer
  scaleVisualizationMode: ScaleVisualizationMode;
  showLightSpeedAnimation: boolean;
  lightPhotonPosition: number;
  lightSpeedTarget: string | null;
  travelCalculatorOpen: boolean;

  // Feature 3: Time Machine
  timeMachineActive: boolean;
  selectedDate: Date;
  dateMode: 'current' | 'custom' | 'historical' | 'birthday';
  selectedHistoricalEvent: HistoricalEvent | null;

  // Feature 4: Guided Tours
  tourMode: TourMode;
  currentTourId: string | null;
  currentWaypointIndex: number;
  quizActive: boolean;
  quizScore: number;
  tourMenuOpen: boolean;

  // Feature 5: Mission Explorer
  missionExplorerOpen: boolean;
  selectedMission: SpacecraftMission | null;
  missionPlaybackTime: number;
  missionPlaybackPlaying: boolean;
  showMissionPath: boolean;
  customMissionWaypoints: MissionWaypoint[];

  // Actions
  setIsPlaying: (playing: boolean) => void;
  togglePlaying: () => void;
  setSpeed: (speed: number) => void;
  setTimeScale: (scale: number) => void;

  setShowOrbits: (show: boolean) => void;
  toggleOrbits: () => void;
  setShowConstellations: (show: boolean) => void;
  toggleConstellations: () => void;
  setShowMoons: (show: boolean) => void;
  toggleMoons: () => void;
  setShowLabels: (show: boolean) => void;
  toggleLabels: () => void;
  setShowDistances: (show: boolean) => void;
  setShowComparisons: (show: boolean) => void;
  setShowAtmospheres: (show: boolean) => void;

  setScaleMode: (mode: ScaleMode) => void;
  setZoomLevel: (level: number) => void;

  selectBody: (body: SelectedBody | null) => void;
  setHoveredBody: (id: string | null) => void;
  setComparisonBody: (body: SelectedBody | null) => void;

  setInfoPanelTab: (tab: InfoPanelTab) => void;
  setInfoPanelExpanded: (expanded: boolean) => void;

  setCameraMode: (mode: CameraMode) => void;
  setCameraTarget: (target: [number, number, number] | null) => void;
  setFollowTarget: (targetId: string | null) => void;
  resetCamera: () => void;
  clearResetCamera: () => void;
  setCameraDistance: (distance: number) => void;

  setSearchQuery: (query: string) => void;
  setFilterCategory: (category: 'all' | 'planets' | 'moons' | 'constellations') => void;

  setShowHelp: (show: boolean) => void;
  setShowSettings: (show: boolean) => void;
  setShowSearch: (show: boolean) => void;

  // ===== EDUCATIONAL FEATURE ACTIONS =====

  // Feature 1: Calculators
  setCalculatorPanelOpen: (open: boolean) => void;
  setActiveCalculator: (calc: 'weight' | 'age' | 'day' | 'survive' | null) => void;

  // Feature 2: Scale & Distance Visualizer
  setScaleVisualizationMode: (mode: ScaleVisualizationMode) => void;
  setShowLightSpeedAnimation: (show: boolean) => void;
  setLightPhotonPosition: (pos: number) => void;
  startLightSpeedAnimation: (targetId: string) => void;
  stopLightSpeedAnimation: () => void;
  setTravelCalculatorOpen: (open: boolean) => void;

  // Feature 3: Time Machine
  setTimeMachineActive: (active: boolean) => void;
  setSelectedDate: (date: Date) => void;
  setDateMode: (mode: 'current' | 'custom' | 'historical' | 'birthday') => void;
  setSelectedHistoricalEvent: (event: HistoricalEvent | null) => void;
  jumpToHistoricalEvent: (event: HistoricalEvent) => void;

  // Feature 4: Guided Tours
  setTourMode: (mode: TourMode) => void;
  setCurrentTourId: (tourId: string | null) => void;
  setCurrentWaypointIndex: (index: number) => void;
  startTour: (tourId: string) => void;
  pauseTour: () => void;
  resumeTour: () => void;
  endTour: () => void;
  nextWaypoint: () => void;
  setQuizActive: (active: boolean) => void;
  setQuizScore: (score: number) => void;
  incrementQuizScore: () => void;
  setTourMenuOpen: (open: boolean) => void;

  // Feature 5: Mission Explorer
  setMissionExplorerOpen: (open: boolean) => void;
  setSelectedMission: (mission: SpacecraftMission | null) => void;
  setMissionPlaybackTime: (time: number) => void;
  setMissionPlaybackPlaying: (playing: boolean) => void;
  toggleMissionPlayback: () => void;
  setShowMissionPath: (show: boolean) => void;
  addCustomMissionWaypoint: (waypoint: MissionWaypoint) => void;
  removeCustomMissionWaypoint: (index: number) => void;
  clearCustomMissionWaypoints: () => void;

  // Compound actions
  focusOnBody: (body: SelectedBody, position: [number, number, number]) => void;
  startCinematicTour: () => void;
  stopCinematicTour: () => void;
}

export const useSolarSystemStore = create<SolarSystemState>((set) => ({
  // Initial state
  isPlaying: true,
  speed: 1,
  timeScale: 1,

  showOrbits: true,
  showConstellations: true,
  showMoons: true,
  showLabels: true,
  showDistances: false,
  showComparisons: false,
  showAtmospheres: true,

  scaleMode: 'visual',
  zoomLevel: 1,

  selectedBody: null,
  hoveredBody: null,
  comparisonBody: null,

  infoPanelTab: 'overview',
  infoPanelExpanded: false,

  cameraMode: 'free',
  cameraTarget: null,
  followTarget: null,
  shouldResetCamera: false,
  cameraDistance: 100,

  searchQuery: '',
  filterCategory: 'all',

  showHelp: false,
  showSettings: false,
  showSearch: false,

  // ===== EDUCATIONAL FEATURES INITIAL STATE =====

  // Feature 1: Calculators
  calculatorPanelOpen: false,
  activeCalculator: null,

  // Feature 2: Scale & Distance Visualizer
  scaleVisualizationMode: 'artistic',
  showLightSpeedAnimation: false,
  lightPhotonPosition: 0,
  lightSpeedTarget: null,
  travelCalculatorOpen: false,

  // Feature 3: Time Machine
  timeMachineActive: false,
  selectedDate: new Date(),
  dateMode: 'current',
  selectedHistoricalEvent: null,

  // Feature 4: Guided Tours
  tourMode: 'idle',
  currentTourId: null,
  currentWaypointIndex: 0,
  quizActive: false,
  quizScore: 0,
  tourMenuOpen: false,

  // Feature 5: Mission Explorer
  missionExplorerOpen: false,
  selectedMission: null,
  missionPlaybackTime: 0,
  missionPlaybackPlaying: false,
  showMissionPath: true,
  customMissionWaypoints: [],

  // Actions
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  togglePlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),

  setSpeed: (speed) => set({ speed: Math.max(0.1, Math.min(10, speed)) }),
  setTimeScale: (scale) => set({ timeScale: scale }),

  setShowOrbits: (show) => set({ showOrbits: show }),
  toggleOrbits: () => set((state) => ({ showOrbits: !state.showOrbits })),

  setShowConstellations: (show) => set({ showConstellations: show }),
  toggleConstellations: () => set((state) => ({ showConstellations: !state.showConstellations })),

  setShowMoons: (show) => set({ showMoons: show }),
  toggleMoons: () => set((state) => ({ showMoons: !state.showMoons })),

  setShowLabels: (show) => set({ showLabels: show }),
  toggleLabels: () => set((state) => ({ showLabels: !state.showLabels })),

  setShowDistances: (show) => set({ showDistances: show }),
  setShowComparisons: (show) => set({ showComparisons: show }),
  setShowAtmospheres: (show) => set({ showAtmospheres: show }),

  setScaleMode: (mode) => set({ scaleMode: mode }),
  setZoomLevel: (level) => set({ zoomLevel: Math.max(0.1, Math.min(10, level)) }),

  selectBody: (body) => set({
    selectedBody: body,
    infoPanelTab: 'overview',
    infoPanelExpanded: false,
  }),
  setHoveredBody: (id) => set({ hoveredBody: id }),
  setComparisonBody: (body) => set({ comparisonBody: body }),

  setInfoPanelTab: (tab) => set({ infoPanelTab: tab }),
  setInfoPanelExpanded: (expanded) => set({ infoPanelExpanded: expanded }),

  setCameraMode: (mode) => set({ cameraMode: mode }),
  setCameraTarget: (target) => set({ cameraTarget: target }),
  setFollowTarget: (targetId) => set({
    followTarget: targetId,
    cameraMode: targetId ? 'follow' : 'free',
  }),
  resetCamera: () => set({
    shouldResetCamera: true,
    cameraTarget: null,
    selectedBody: null,
    cameraMode: 'free',
    followTarget: null,
  }),
  clearResetCamera: () => set({ shouldResetCamera: false }),
  setCameraDistance: (distance) => set({ cameraDistance: Math.max(10, Math.min(500, distance)) }),

  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilterCategory: (category) => set({ filterCategory: category }),

  setShowHelp: (show) => set({ showHelp: show }),
  setShowSettings: (show) => set({ showSettings: show }),
  setShowSearch: (show) => set({ showSearch: show }),

  // ===== EDUCATIONAL FEATURE ACTIONS =====

  // Feature 1: Calculators
  setCalculatorPanelOpen: (open) => set({ calculatorPanelOpen: open }),
  setActiveCalculator: (calc) => set({ activeCalculator: calc }),

  // Feature 2: Scale & Distance Visualizer
  setScaleVisualizationMode: (mode) => set({ scaleVisualizationMode: mode }),
  setShowLightSpeedAnimation: (show) => set({ showLightSpeedAnimation: show }),
  setLightPhotonPosition: (pos) => set({ lightPhotonPosition: pos }),
  startLightSpeedAnimation: (targetId) => set({
    showLightSpeedAnimation: true,
    lightSpeedTarget: targetId,
    lightPhotonPosition: 0,
  }),
  stopLightSpeedAnimation: () => set({
    showLightSpeedAnimation: false,
    lightSpeedTarget: null,
    lightPhotonPosition: 0,
  }),
  setTravelCalculatorOpen: (open) => set({ travelCalculatorOpen: open }),

  // Feature 3: Time Machine
  setTimeMachineActive: (active) => set({ timeMachineActive: active }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setDateMode: (mode) => set({ dateMode: mode }),
  setSelectedHistoricalEvent: (event) => set({ selectedHistoricalEvent: event }),
  jumpToHistoricalEvent: (event) => set({
    timeMachineActive: true,
    selectedDate: event.date,
    dateMode: 'historical',
    selectedHistoricalEvent: event,
  }),

  // Feature 4: Guided Tours
  setTourMode: (mode) => set({ tourMode: mode }),
  setCurrentTourId: (tourId) => set({ currentTourId: tourId }),
  setCurrentWaypointIndex: (index) => set({ currentWaypointIndex: index }),
  startTour: (tourId) => set({
    tourMode: 'playing',
    currentTourId: tourId,
    currentWaypointIndex: 0,
    quizScore: 0,
    tourMenuOpen: false,
  }),
  pauseTour: () => set({ tourMode: 'paused' }),
  resumeTour: () => set({ tourMode: 'playing' }),
  endTour: () => set({
    tourMode: 'idle',
    currentTourId: null,
    currentWaypointIndex: 0,
    quizActive: false,
  }),
  nextWaypoint: () => set((state) => ({
    currentWaypointIndex: state.currentWaypointIndex + 1,
  })),
  setQuizActive: (active) => set({ quizActive: active }),
  setQuizScore: (score) => set({ quizScore: score }),
  incrementQuizScore: () => set((state) => ({ quizScore: state.quizScore + 1 })),
  setTourMenuOpen: (open) => set({ tourMenuOpen: open }),

  // Feature 5: Mission Explorer
  setMissionExplorerOpen: (open) => set({ missionExplorerOpen: open }),
  setSelectedMission: (mission) => set({
    selectedMission: mission,
    missionPlaybackTime: 0,
    missionPlaybackPlaying: false,
  }),
  setMissionPlaybackTime: (time) => set({ missionPlaybackTime: time }),
  setMissionPlaybackPlaying: (playing) => set({ missionPlaybackPlaying: playing }),
  toggleMissionPlayback: () => set((state) => ({
    missionPlaybackPlaying: !state.missionPlaybackPlaying,
  })),
  setShowMissionPath: (show) => set({ showMissionPath: show }),
  addCustomMissionWaypoint: (waypoint) => set((state) => ({
    customMissionWaypoints: [...state.customMissionWaypoints, waypoint],
  })),
  removeCustomMissionWaypoint: (index) => set((state) => ({
    customMissionWaypoints: state.customMissionWaypoints.filter((_, i) => i !== index),
  })),
  clearCustomMissionWaypoints: () => set({ customMissionWaypoints: [] }),

  // Compound actions
  focusOnBody: (body, position) => set({
    selectedBody: body,
    cameraTarget: position,
    cameraMode: 'orbit',
    infoPanelTab: 'overview',
  }),

  startCinematicTour: () => set({
    cameraMode: 'cinematic',
    isPlaying: true,
    speed: 0.5,
  }),

  stopCinematicTour: () => set({
    cameraMode: 'free',
  }),
}));
