// RecentSearchService.ts
export interface RecentSearch {
  id: string;
  query: string;
  type: 'stock' | 'news';
  timestamp: Date;
}

class RecentSearchService {
  private static readonly STORAGE_KEY = 'finTechForge_recentSearches';
  private static readonly MAX_SEARCHES = 10;

  /**
   * Get all recent searches from localStorage
   */
  static getAll(): RecentSearch[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return [];

      const parsed = JSON.parse(stored);
      return parsed.map((item: any) => ({
        ...item,
        timestamp: new Date(item.timestamp)
      }));
    } catch (error) {
      console.error('Error reading recent searches from localStorage:', error);
      return [];
    }
  }

  /**
   * Add a new search to history
   */
  static add(query: string, type: 'stock' | 'news'): RecentSearch[] {
    if (!query.trim()) return this.getAll();

    const searches = this.getAll();
    const newSearch: RecentSearch = {
      id: `${type}_${Date.now()}`, // Unique ID based on type and timestamp
      query: query.trim(),
      type,
      timestamp: new Date()
    };

    // Remove duplicate searches (same query and type)
    const filtered = searches.filter(
      search => !(search.query.toLowerCase() === query.toLowerCase() && search.type === type)
    );

    // Add new search at the beginning
    const updated = [newSearch, ...filtered];

    // Limit to max searches
    const finalSearches = updated.slice(0, this.MAX_SEARCHES);

    // Save to localStorage
    this.save(finalSearches);

    return finalSearches;
  }

  /**
   * Remove a specific search from history
   */
  static remove(searchId: string): RecentSearch[] {
    const searches = this.getAll();
    const updated = searches.filter(search => search.id !== searchId);
    this.save(updated);
    return updated;
  }

  /**
   * Clear all searches of a specific type
   */
  static clearByType(type: 'stock' | 'news'): RecentSearch[] {
    const searches = this.getAll();
    const updated = searches.filter(search => search.type !== type);
    this.save(updated);
    return updated;
  }

  /**
   * Clear all recent searches
   */
  static clearAll(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  /**
   * Get recent searches for a specific type
   */
  static getByType(type: 'stock' | 'news'): RecentSearch[] {
    const allSearches = this.getAll();
    return allSearches.filter(search => search.type === type);
  }

  /**
   * Save searches to localStorage
   */
  private static save(searches: RecentSearch[]): void {
    try {
      // Convert dates to ISO strings for storage
      const serializable = searches.map(search => ({
        ...search,
        timestamp: search.timestamp.toISOString()
      }));
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(serializable));
    } catch (error) {
      console.error('Error saving recent searches to localStorage:', error);
    }
  }
}

export default RecentSearchService;