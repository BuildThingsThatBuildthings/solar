import { useState } from 'react';
import { useSolarSystemStore } from '../../../stores/solarSystemStore';
import { GlassPanel } from '../shared/GlassPanel';
import { WeightCalculator } from './WeightCalculator';
import { AgeCalculator } from './AgeCalculator';
import { DayLengthVisualizer } from './DayLengthVisualizer';
import { SurvivabilityChecker } from './SurvivabilityChecker';

type CalculatorTab = 'weight' | 'age' | 'day' | 'survive';

interface TabInfo {
  id: CalculatorTab;
  emoji: string;
  label: string;
  shortLabel: string;
  description: string;
}

const TABS: TabInfo[] = [
  {
    id: 'weight',
    emoji: '⚖️',
    label: 'Weight',
    shortLabel: 'Weight',
    description: 'What would you weigh on other planets?',
  },
  {
    id: 'age',
    emoji: '🎂',
    label: 'Age',
    shortLabel: 'Age',
    description: 'How old would you be?',
  },
  {
    id: 'day',
    emoji: '🌅',
    label: 'Day Length',
    shortLabel: 'Days',
    description: 'How long is a day on each planet?',
  },
  {
    id: 'survive',
    emoji: '💀',
    label: 'Survive?',
    shortLabel: 'Survive',
    description: 'Could you survive there?',
  },
];

export const CalculatorPanel = () => {
  const { calculatorPanelOpen, setCalculatorPanelOpen } = useSolarSystemStore();
  const [activeTab, setActiveTab] = useState<CalculatorTab>('weight');

  const activeTabInfo = TABS.find(t => t.id === activeTab)!;

  const renderCalculator = () => {
    switch (activeTab) {
      case 'weight':
        return <WeightCalculator />;
      case 'age':
        return <AgeCalculator />;
      case 'day':
        return <DayLengthVisualizer />;
      case 'survive':
        return <SurvivabilityChecker />;
    }
  };

  return (
    <GlassPanel
      isOpen={calculatorPanelOpen}
      onClose={() => setCalculatorPanelOpen(false)}
      title="Space Calculators"
      titleEmoji="🔢"
      position="center"
      className="w-[90vw] max-w-md"
    >
      {/* Tab Navigation */}
      <div className="flex gap-1 mb-4 bg-white/5 rounded-xl p-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex-1 flex items-center justify-center gap-1 px-2 py-2 rounded-lg
              font-medium text-sm transition-all
              ${activeTab === tab.id
                ? 'bg-gradient-to-r from-rainbow-blue to-rainbow-purple text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
              }
            `}
          >
            <span className="text-lg">{tab.emoji}</span>
            <span className="hidden sm:inline">{tab.shortLabel}</span>
          </button>
        ))}
      </div>

      {/* Tab Description */}
      <p className="text-gray-400 text-sm mb-4 text-center">
        {activeTabInfo.description}
      </p>

      {/* Calculator Content */}
      <div className="min-h-[400px]">
        {renderCalculator()}
      </div>
    </GlassPanel>
  );
};
