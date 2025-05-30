import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import Button from '../Button';

interface SearchDropdownProps {
    className?: string;
    placeholder?: string;
}

interface RecentSearch {
    id: string;
    text: string;
    type: 'aircraft' | 'part' | 'location';
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({
    className,
    placeholder = "Search here"
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [recentSearches] = useState<RecentSearch[]>([
        { id: '1', text: 'Piper PA-28', type: 'aircraft' },
        { id: '2', text: 'Cessna 172', type: 'aircraft' },
        { id: '3', text: 'Avionics', type: 'part' },
        { id: '4', text: 'Florida', type: 'location' }
    ]);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputFocus = () => {
        setIsOpen(true);
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchValue.trim()) {
            console.log('Searching for:', searchValue);
            setIsOpen(false);
        }
    };

    const handleRecentSearchClick = (search: RecentSearch) => {
        setSearchValue(search.text);
        setIsOpen(false);
    };

    const clearRecentSearch = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        console.log('Clear search:', id);
    };

    return (
        <div ref={dropdownRef} className={cn("relative w-full max-w-md", className)}>
            <form onSubmit={handleSearchSubmit} className="relative">
                <div className="relative">
                    <svg
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                    <input
                        ref={inputRef}
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onFocus={handleInputFocus}
                        placeholder={placeholder}
                        className="w-full pl-10 pr-12 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#305DB3] focus:border-transparent"
                    />
                    <Button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                        onClick={() => inputRef.current?.focus()}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a5 5 0 1110 0v6a3 3 0 01-3 3z" />
                        </svg>
                    </Button>
                </div>
            </form>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                    {searchValue.trim() === '' && (
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-sm font-medium text-gray-900">Recent</h3>
                                <Button className="text-xs text-[#305DB3] hover:underline">
                                    Edit
                                </Button>
                            </div>

                            <div className="space-y-2">
                                {recentSearches.map((search) => (
                                    <div
                                        key={search.id}
                                        onClick={() => handleRecentSearchClick(search)}
                                        className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer group"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                                {search.type === 'aircraft' && (
                                                    <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                                                    </svg>
                                                )}
                                                {search.type === 'part' && (
                                                    <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                                    </svg>
                                                )}
                                                {search.type === 'location' && (
                                                    <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                                    </svg>
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{search.text}</p>
                                                <p className="text-xs text-gray-500">2 New Listing</p>
                                            </div>
                                        </div>
                                        <Button
                                            onClick={(e) => clearRecentSearch(search.id, e)}
                                            className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-gray-600 transition-opacity"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {searchValue.trim() !== '' && (
                        <div className="p-4">
                            <div className="text-sm text-gray-500 mb-2">
                                Search results for "{searchValue}"
                            </div>
                            <div className="space-y-2">
                                <div className="p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                                    <p className="text-sm font-medium text-gray-900">{searchValue}</p>
                                    <p className="text-xs text-gray-500">in Aircraft</p>
                                </div>
                                <div className="p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                                    <p className="text-sm font-medium text-gray-900">{searchValue}</p>
                                    <p className="text-xs text-gray-500">in Parts</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchDropdown;