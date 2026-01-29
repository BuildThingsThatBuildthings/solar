import { SolarSystem } from './components/canvas/SolarSystem';
import { InfoPanel } from './components/ui/InfoPanel';
import { ControlPanel } from './components/ui/ControlPanel';
import { PlanetSelector } from './components/ui/PlanetSelector';
import { CalculatorPanel } from './components/ui/calculators';
import { TravelCalculator } from './components/ui/scale/TravelCalculator';
import { TimeMachinePanel } from './components/ui/timemachine/TimeMachinePanel';
import { TourMenu } from './components/ui/tours/TourMenu';
import { TourOverlay } from './components/ui/tours/TourOverlay';
import { MissionExplorerPanel } from './components/ui/missions/MissionExplorerPanel';

function App() {
  return (
    <div className="w-full h-full relative">
      {/* Header */}
      <header className="fixed top-4 left-4 z-50 pointer-events-none">
        <div className="glass rounded-2xl px-6 py-3 pointer-events-auto">
          <h1 className="text-2xl font-bold text-rainbow">
            🚀 Solar System Explorer
          </h1>
          <p className="text-gray-400 text-sm">
            Click any planet, moon, or constellation to learn!
          </p>
        </div>
      </header>

      {/* 3D Solar System Canvas */}
      <div className="absolute inset-0">
        <SolarSystem />
      </div>

      {/* UI Overlays */}
      <InfoPanel />
      <ControlPanel />
      <PlanetSelector />

      {/* Educational Feature Panels */}
      <CalculatorPanel />
      <TravelCalculator />
      <TimeMachinePanel />
      <TourMenu />
      <TourOverlay />
      <MissionExplorerPanel />
    </div>
  );
}

export default App;
