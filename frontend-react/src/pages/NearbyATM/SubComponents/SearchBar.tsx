import { Loader2, Search } from "lucide-react";

// Fix: Add proper TypeScript interface
interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  loading: boolean;
}

export default function SearchBar({ searchQuery, setSearchQuery, handleSearch, loading }: SearchBarProps) {
  return (
    <form onSubmit={handleSearch} className="flex mb-4">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by address, city, or landmark"
        className="flex-grow p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button 
        type="submit" 
        className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600 flex items-center justify-center"
        disabled={loading}
      >
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
      </button>
    </form>
  );
}
