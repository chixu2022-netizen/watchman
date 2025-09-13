// Archived NewsLayout component (moved from src/components)
import React from 'react';
import baseStyles from './NewsLayout.base.module.css';
import leftStyles from './NewsLayout.left.module.css';
import rightStyles from './NewsLayout.right.module.css';
import NewsCard from './NewsCard';

type Story = { id: number; source: string; title: string; excerpt?: string; time?: string; author?: string; image?: string };

// sample arrays retained for archive
const SAMPLE_LEFT: Story[] = [ /* archived sample data */ ];
const SAMPLE_RIGHT = { local: [], picks: [] };

export default function NewsLayout(): React.ReactElement {
  return (
    <div className={baseStyles['news-container']} style={{ gridTemplateColumns: '1fr 360px' }}>
      {/* archived layout content */}
    </div>
  );
}
