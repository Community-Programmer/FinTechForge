import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import RecentSearchService, { RecentSearch } from '@/services/RecentSearchService';

interface RecentSearchesProps {
  type: 'stock' | 'news';
  onSearchSelect: (query: string) => void;
  maxItems?: number;
}

const RecentSearches: React.FC<RecentSearchesProps> = ({ 
  type, 
  onSearchSelect, 
  maxItems = 10 
}) => {
  const [recentSearches, setRecentSearches] = React.useState<RecentSearch[]>(
    RecentSearchService.getByType(type)
  );

  React.useEffect(() => {
    // Update state when localStorage changes (in case of updates from other components)
    setRecentSearches(RecentSearchService.getByType(type));
  }, [type]);

  const handleRecentSearchClick = (searchQuery: string) => {
    // Add to recent searches again to update the order
    RecentSearchService.add(searchQuery, type);
    setRecentSearches(RecentSearchService.getByType(type));
    onSearchSelect(searchQuery);
  };

  const handleRemoveSearch = (searchId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    RecentSearchService.remove(searchId);
    setRecentSearches(RecentSearchService.getByType(type));
  };

  const handleClearAll = () => {
    RecentSearchService.clearByType(type);
    setRecentSearches([]);
  };

  if (recentSearches.length === 0) {
    return null;
  }

  return (
    <div className="bg-muted p-4 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">Recent Searches</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearAll}
          className="h-6 p-1 text-xs"
        >
          Clear All
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {recentSearches.slice(0, maxItems).map((search) => (
          <Button
            key={search.id}
            variant="secondary"
            size="sm"
            onClick={() => handleRecentSearchClick(search.query)}
            className="text-xs h-7 px-3 py-1 flex items-center gap-1"
          >
            {search.query}
            <X 
              className="h-3 w-3 ml-1" 
              onClick={(e) => handleRemoveSearch(search.id, e)}
            />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;