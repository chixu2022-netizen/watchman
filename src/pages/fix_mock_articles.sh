#!/bin/bash

# Function to fix mockArticle functions
fix_mock_article() {
    local file=$1
    local category=$2
    
    # Replace incomplete mockArticle functions with complete ones
    sed -i '' "s/const mockArticle = (title: string, timeAgo: string = '2 hours ago'): NewsArticle => ({/const mockArticle = (title: string, timeAgo: string = '2 hours ago'): NewsArticle => ({/" "$file"
    sed -i '' "s/title,/id: Math.random().toString(),\n    title,\n    description: '${category} news description',/" "$file"
    sed -i '' "/imageUrl: \"\/ttttttt.jpg\",/a\\
    source: { name: '${category} News' },\\
    category: '${category}'" "$file"
}

# Fix each file
for file in AI.tsx Business.tsx Crypto.tsx Entertainment.tsx Health.tsx Local.tsx Politics.tsx Sports.tsx Technology.tsx World.tsx; do
    if [ -f "$file" ]; then
        category=$(echo "$file" | sed 's/.tsx//' | tr '[:upper:]' '[:lower:]')
        echo "Fixing $file with category $category"
    fi
done
