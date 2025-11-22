import React, { useState } from 'react';
import { physicsChapters, Chapter } from '../data/physicsTopics';

interface TopicSelectionScreenProps {
  onTopicSelected: (chapter: Chapter, topicName: string) => void;
  initialYear: '1st Year PUC' | '2nd Year PUC' | null;
}

export const TopicSelectionScreen: React.FC<TopicSelectionScreenProps> = ({ onTopicSelected, initialYear }) => {
  const [selectedYear, setSelectedYear] = useState<'1st Year PUC' | '2nd Year PUC'>(initialYear || '1st Year PUC');
  const [openChapter, setOpenChapter] = useState<string | null>(null);
  
  const filteredChapters = physicsChapters.filter(c => c.year === selectedYear);
  const years: ('1st Year PUC' | '2nd Year PUC')[] = ['1st Year PUC', '2nd Year PUC'];

  return (
    <div className="container mx-auto p-4 md:p-8 animate-fadeIn">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[color:var(--text-heading)]">Select a Topic</h1>
        <p className="text-lg text-[color:var(--text-subheading)] mt-2">Choose a chapter and topic to begin.</p>
      </div>
      
      {/* Year Selection Tabs */}
      <div className="flex justify-center mb-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-full p-1 max-w-sm mx-auto shadow-sm">
        {years.map(year => {
          const isActive = selectedYear === year;
          return (
            <button
              key={year}
              onClick={() => {
                setSelectedYear(year);
                setOpenChapter(null); // Close accordion on year change
              }}
              className={`w-full py-2 px-4 rounded-full text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-[var(--accent-primary)] ${
                isActive
                  ? 'bg-[var(--accent-primary)] text-white shadow'
                  : 'text-[color:var(--text-secondary)] hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              {year}
            </button>
          );
        })}
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {filteredChapters.map((chapter, index) => (
          <div key={chapter.name} className="border rounded-xl shadow-sm overflow-hidden dark:backdrop-blur-xl animate-card-enter" 
            style={{ 
                background: 'var(--card-bg)',
                borderColor: 'var(--card-border)',
                boxShadow: 'var(--card-shadow)',
                animationDelay: `${index * 80}ms` 
            }}>
            <button
              onClick={() => setOpenChapter(openChapter === chapter.name ? null : chapter.name)}
              className="w-full flex justify-between items-center p-4 hover:bg-emerald-100/30 dark:hover:bg-white/5 text-left transition-colors"
            >
              <span className="font-semibold text-lg text-[color:var(--text-primary)]">{chapter.name}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform duration-300 ${openChapter === chapter.name ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6"></path></svg>
            </button>
            {openChapter === chapter.name && (
              <div className="p-4 bg-emerald-50/20 dark:bg-black/20 border-t" style={{ borderColor: 'var(--card-border)' }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {chapter.topics.map(topic => (
                    <button key={topic.name} onClick={() => onTopicSelected(chapter, topic.name)} className="text-left p-3 rounded-lg hover:bg-[var(--accent-primary)] hover:text-white text-[color:var(--text-secondary)] transition-colors">
                      {topic.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};