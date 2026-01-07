'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Tab {
  label: string;
  image: string;
  alt: string;
}

interface TabbedImagesProps {
  tabs: Tab[];
}

export function TabbedImages({ tabs }: TabbedImagesProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex gap-2 mb-4 border-b border-slate-200 dark:border-slate-700">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-6 py-3 font-semibold transition-colors relative ${
              activeTab === index
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {tab.label}
            {activeTab === index && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="rounded-xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700">
        <Image
          src={tabs[activeTab].image}
          alt={tabs[activeTab].alt}
          width={1200}
          height={800}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}
