import { useState, useCallback } from 'react';

export const useRecentSearches = (setPage: (page: number) => void, setSearchKeyword: (keyword: string) => void) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [showList, setShowList] = useState<boolean>(false);
    const [recentSearches, setRecentSearches] = useState<string[]>(() => {
        const savedSearches = localStorage.getItem('recentSearches');
        return savedSearches ? JSON.parse(savedSearches) : [];
    });

    const handleSearch = useCallback((term: string): void => {
        const trimmedTerm = term.trim();
        if (trimmedTerm && !recentSearches.includes(trimmedTerm)) {
            const updatedSearches = [trimmedTerm, ...recentSearches].slice(0, 5);
            setRecentSearches(updatedSearches);
            localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
        }
        setPage(1);
        setSearchKeyword(trimmedTerm);
        setSearchTerm(trimmedTerm);
        setShowList(false);
    }, [setPage, setSearchKeyword, recentSearches]);

    const removeSearch = useCallback((term: string): void => {
        const updatedSearches = recentSearches.filter(search => search !== term);
        setRecentSearches(updatedSearches);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
        if (searchTerm === term) {
            setSearchTerm(""); // Clear the search term if it matches the removed term
        }
    }, [recentSearches, searchTerm]);

    return {
        searchTerm,
        setSearchTerm,
        recentSearches,
        handleSearch,
        showList,
        setShowList,
        removeSearch
    };
};