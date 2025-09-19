# Section IDs Reference Guide

This document lists all the unique IDs for each section and component in the Home page, making it easy to reference specific elements when requesting edits.

## 🏠 Main Sections

### 1. Hero Section

- **ID**: `hero-section`
- **Description**: The top exclusive news section with a full-width image and two text cards
- **Contains**: Hero image section spanning both columns, breaking news card, and featured article card

#### Hero Sub-components:

- **Hero Image Section**: `hero-image-section` - Full-width image area spanning both columns
- **Breaking News Card**: `breaking-news-card` - Left column text card
- **Featured Article**: `featured-article` - Right column text card

### 2. Quick News Section

- **ID**: `quick-news-section`
- **Description**: Horizontal row of 4 quick news cards with images and headlines
- **Individual Cards**: `quick-news-card-1`, `quick-news-card-2`, `quick-news-card-3`, `quick-news-card-4`

### 3. Business Section

- **ID**: `business-section`
- **Description**: Business news grid with article cards
- **Individual Cards**: `business-card-1`, `business-card-2`

### 4. World Section

- **ID**: `world-section`
- **Description**: World news grid with secondary headlines
- **Individual Cards**: `world-card-1`, `world-card-2`, `world-card-3`, `world-card-4`

### 5. Technology Section

- **ID**: `technology-section`
- **Description**: Technology news with featured article and large image section
- **Sub-components**:
  - **Tech Featured Card**: `tech-featured-card`
  - **Tech Image Section**: `tech-image-section`

### 6. Additional News Section

- **ID**: `additional-news-section`
- **Description**: 4x4 grid of additional news cards (16 total)
- **Individual Cards**: `additional-card-1` through `additional-card-16`

## 📋 Quick Reference for Edits

When asking for edits, you can reference sections like this:

### Examples:

- "Edit the **hero-section**" - Changes the entire top exclusive section
- "Modify **breaking-news-card**" - Changes just the breaking news card
- "Update **business-card-1**" - Changes the first business news card
- "Change **tech-image-section**" - Modifies the large image area in technology
- "Edit **additional-card-5**" - Changes the 5th card in the additional news grid

### Section Patterns:

- **Hero area**: `hero-section`, `hero-image-section`, `breaking-news-card`, `featured-article`
- **Quick news**: `quick-news-section`, `quick-news-card-[1-4]`
- **Category sections**: `business-section`, `world-section`, `technology-section`
- **Category cards**: `[category]-card-[number]` (e.g., `world-card-3`)
- **Additional news**: `additional-news-section`, `additional-card-[1-16]`

## 🎯 Common Edit Requests

### Layout Changes:

- Reference the main section ID for overall layout changes
- Reference specific card IDs for individual card modifications

### Content Changes:

- Use card IDs to change headlines, descriptions, or images
- Use section IDs to change section titles or overall structure

### Styling Changes:

- Section IDs for section-wide styling
- Card IDs for individual card styling
- Component IDs for specific elements (like `tech-image-section`)

---

**Last Updated**: September 15, 2025
**File Location**: `/Users/mac/Downloads/watchman/SECTION_IDS_REFERENCE.md`
