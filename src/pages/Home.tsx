import React from 'react';
import './Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <h2 className="top-feed-header">Exclusive</h2>
      <div className="news-grid">
      {/* Row 1 */}
      <div className="grid-section grid-section-r1-c1">
        <div className="breaking-news-title">Breaking News</div>
        <div className="breaking-news-subtitle">Dynamic content from NewsAPI will appear here</div>
      </div>
      <div className="grid-section grid-section-r1-c3">
        <h1 className="main-headline">
          Paramount Skydance prepares bid for Warner Bros Discovery, source says
        </h1>
      </div>
      <div className="grid-section grid-section-r1-c4"></div>
      
      {/* Row 2 - First two sections covered by the spanning image above */}
      <div className="grid-section grid-section-r2-c3">
        <div className="news-article-text">
          The political operator known for his capacity for intrigue and spin was fired by Prime Minister Keir Starmer on Thursday. This would be where the news article will display.
        </div>
        <button className="read-more-link" onClick={() => console.log('Navigate to article')}>
          Read more
        </button>
      </div>
      <div className="grid-section grid-section-r2-c4"></div>
      
      {/* Row 3 */}
      <div className="grid-section grid-section-r3-c1">
        <h3 className="news-headline-small">In surprise twist, Armani&apos;s will sets stage for sale of fashion empire</h3>
        <div className="news-image-area">Dynamic image content from NewsAPI will appear here</div>
      </div>
      <div className="grid-section grid-section-r3-c2">
        <h3 className="news-headline-small">Freed prisoners thank Trump but some say they would rather have stayed in Belarus</h3>
        <div className="news-image-area">Dynamic image content from NewsAPI will appear here</div>
      </div>
      <div className="grid-section grid-section-r3-c3">
        <h3 className="news-headline-small">Exclusive: Taiwan updates security handbook, wary of China threat</h3>
        <div className="news-image-area">Dynamic image content from NewsAPI will appear here</div>
      </div>
      <div className="grid-section grid-section-r3-c4">
        <h3 className="news-headline-small">UK turns to King Charles and royals to mollify Trump like no others can</h3>
        <div className="news-image-area">Dynamic image content from NewsAPI will appear here</div>
      </div>
      </div>

      {/* Section header - positioned outside grid structure */}
      <h2 className="section-header">Business</h2>
      
      {/* Bottom sections container */}
      <div className="bottom-sections">
      {/* Row 4 */}
      <div className="grid-section grid-section-r4-c1">
        Dynamic content from NewsAPI will appear here
      </div>
      <div className="grid-section grid-section-r4-c2">
        <div>
          <h3>NATO to beef up defence of Europe&apos;s eastern flank after Poland shot down drones</h3>
          <div className="news-article-text">
            NATO announced plans to beef up the defence of Europe&apos;s eastern flank on Friday, two days after Poland shot down drones that had violated its airspace in the first known action of its kind by a member of the Western alliance during Russia&apos;s war in Ukraine. <button className="read-more-link" onClick={() => window.open('https://www.example.com/nato-defence-article', '_blank')}>Read more...</button>
          </div>
        </div>
      </div>
      <div className="grid-section grid-section-r4-c3">
        Dynamic content from NewsAPI will appear here
      </div>
      <div className="grid-section grid-section-r4-c4">
        <div>
          <h3>Global markets surge as inflation data shows cooling trend across major economies</h3>
          <div className="news-article-text">
            Stock markets worldwide posted significant gains on Friday as new inflation data revealed a cooling trend across major economies, raising hopes for potential interest rate cuts in the coming months and boosting investor confidence in economic stability. <button className="read-more-link" onClick={() => window.open('https://www.example.com/markets-surge-article', '_blank')}>Read more...</button>
          </div>
        </div>
      </div>
      </div>

      {/* Second Grid - Row 5 only */}
      <div className="news-grid-2">
        {/* Row 5 */}
        <div className="grid-section grid-section-r5-c1">
          Dynamic content from NewsAPI will appear here
        </div>
        <div className="grid-section grid-section-r5-c2">
          <div>
            <h3>NATO to beef up defence of Europe&apos;s eastern flank after Poland shot down drones</h3>
            <div className="news-article-text">
              NATO announced plans to beef up the defence of Europe&apos;s eastern flank on Friday, two days after Poland shot down drones that had violated its airspace in the first known action of its kind by a member of the Western alliance during Russia&apos;s war in Ukraine. <button className="read-more-link" onClick={() => window.open('https://www.example.com/nato-defence-article', '_blank')}>Read more...</button>
            </div>
          </div>
        </div>
        <div className="grid-section grid-section-r5-c3">
          Dynamic content from NewsAPI will appear here
        </div>
        <div className="grid-section grid-section-r5-c4">
          <div>
            <h3>Global markets surge as inflation data shows cooling trend across major economies</h3>
            <div className="news-article-text">
              Stock markets worldwide posted significant gains on Friday as new inflation data revealed a cooling trend across major economies, raising hopes for potential interest rate cuts in the coming months and boosting investor confidence in economic stability. <button className="read-more-link" onClick={() => window.open('https://www.example.com/markets-surge-article', '_blank')}>Read more...</button>
            </div>
          </div>
        </div>
      </div>

      {/* World section header - positioned outside grid structure */}
      <h2 className="world-header">World</h2>

      {/* Third Grid - Rows 6-8 together */}
      <div className="news-grid-3">
        {/* Row 6 */}
        <div className="grid-section grid-section-r6-c1">
          <div className="row6-image-space">Image placeholder</div>
          <h3 className="news-headline-small">Tether to Launch New US Stablecoin, Bo Hines to Lead Project</h3>
          <div className="row6-bottom-section">
            <h3 className="news-headline-small">OpenAI&apos;s $100 Billion Pivot Blurs Its &apos;Mission&apos; Further</h3>
          </div>
        </div>
        <div className="grid-section grid-section-r6-c2">
          <div className="row6-image-space">Image placeholder</div>
          <h3 className="news-headline-small">OpenAI&apos;s $100 Billion Pivot Blurs Its &apos;Mission&apos; Further</h3>
          <div className="row6-bottom-section">
            <h3 className="news-headline-small">ECB&apos;s Nagel Says More Rate Cuts Could Jeopardize Stable Prices</h3>
          </div>
        </div>
        <div className="grid-section grid-section-r6-c3">
          <div className="row6-image-space">Image placeholder</div>
          <h3 className="news-headline-small">ECB&apos;s Nagel Says More Rate Cuts Could Jeopardize Stable Prices</h3>
          <div className="row6-bottom-section">
            <h3 className="news-headline-small">Peter Mandelson Told Epstein &apos;I Think the World of You,&apos; Emails Reveal</h3>
          </div>
        </div>
        <div className="grid-section grid-section-r6-c4">
          <div className="row6-image-space">Image placeholder</div>
          <h3 className="news-headline-small">Peter Mandelson Told Epstein &apos;I Think the World of You,&apos; Emails Reveal</h3>
          <div className="row6-bottom-section">
            <h3 className="news-headline-small">Tether to Launch New US Stablecoin, Bo Hines to Lead Project</h3>
          </div>
        </div>
        
        {/* Technology section header positioned above row 7 */}
        <h2 className="technology-header">Technology</h2>
        
        {/* Row 7 */}
        <div className="grid-section grid-section-r7-c1">
          <h3 className="news-headline-small">ICE officer kills man in Chicago suburb during arrest attempt</h3>
          <div className="news-article-text">
            DHS said the ICE officer used &quot;appropriate force&quot; during the incident. Lilian Jimenez, an Illinois state representative in Chicago, criticized ICE for the death. &quot;This endangers all of our community for ICE to operate in this manner,&quot; she said.
          </div>
          <button className="read-more-link" onClick={() => window.open('https://www.example.com/ice-officer-article', '_blank')}>
            Read more
          </button>
        </div>
        <div className="grid-section grid-section-r7-c2">
          <div className="newsapi-image-container-wide">
            <div className="newsapi-image-placeholder-wide">Single Broad NewsAPI Image will appear here</div>
          </div>
        </div>
        <div className="grid-section grid-section-r7-c3">
          {/* This column is part of the wide image container */}
        </div>
        <div className="grid-section grid-section-r7-c4"></div>
        
        {/* Row 8 */}
        <div className="grid-section grid-section-r8-c1"></div>
        <div className="grid-section grid-section-r8-c2"></div>
        <div className="grid-section grid-section-r8-c3"></div>
        <div className="grid-section grid-section-r8-c4"></div>
      </div>

      {/* New 4x4 Grid - Separate from above */}
      <div className="news-grid-5">
        {/* Row 9 */}
        <div className="grid-section grid-section-r9-c1">Row 9, Column 1</div>
        <div className="grid-section grid-section-r9-c2">Row 9, Column 2</div>
        <div className="grid-section grid-section-r9-c3">Row 9, Column 3</div>
        <div className="grid-section grid-section-r9-c4">Row 9, Column 4</div>
        
        {/* Row 10 */}
        <div className="grid-section grid-section-r10-c1">Row 10, Column 1</div>
        <div className="grid-section grid-section-r10-c2">Row 10, Column 2</div>
        <div className="grid-section grid-section-r10-c3">Row 10, Column 3</div>
        <div className="grid-section grid-section-r10-c4">Row 10, Column 4</div>
        
        {/* Row 11 */}
        <div className="grid-section grid-section-r11-c1">Row 11, Column 1</div>
        <div className="grid-section grid-section-r11-c2">Row 11, Column 2</div>
        <div className="grid-section grid-section-r11-c3">Row 11, Column 3</div>
        <div className="grid-section grid-section-r11-c4">Row 11, Column 4</div>
        
        {/* Row 12 */}
        <div className="grid-section grid-section-r12-c1">Row 12, Column 1</div>
        <div className="grid-section grid-section-r12-c2">Row 12, Column 2</div>
        <div className="grid-section grid-section-r12-c3">Row 12, Column 3</div>
        <div className="grid-section grid-section-r12-c4">Row 12, Column 4</div>
      </div>
    </div>
  );
}
