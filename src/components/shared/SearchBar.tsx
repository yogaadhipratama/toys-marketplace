'use client';

import { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
}

const SearchBar = ({ placeholder = 'Search products...', className, onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const [isSearching, setIsSearching] = useState(false);


  useEffect(() => {
    // Initialize from URL search params if available
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const searchQuery = urlParams.get('search');
      if (searchQuery) {
        setQuery(searchQuery);
      }
    }
  }, []);

  // const handleSearch = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (query.trim()) {
  //     if (onSearch) {
  //       onSearch(query.trim());
  //     } else {
  //       router.push(`/catalog?search=${encodeURIComponent(query.trim())}`);
  //     }
  //   }
  // };

  const handleSearch = () => {
    if (query.trim()) {
      setIsSearching(true);
      onSearch(query.trim());

      // Update URL
      const params = new URLSearchParams();
      params.set('search', query.trim());
      router.push(`/catalog?${params.toString()}`);

      setIsSearching(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Button type="submit" className="ml-2" disabled={!query.trim()}>
        {isSearching ? 'Searching...' : 'Search'}
      </Button>
    </form>
  );
};

export default SearchBar;
