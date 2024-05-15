import { useState, useCallback } from 'react';

export const useRecentSearches = (setPage: (page: number) => void, setSearchKeyword: (keyword: string) => void) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [showList, setShowList] = useState<boolean>(false)
    const [recentSearches, setRecentSearches] = useState<string[]>(() => {
        const savedSearches = localStorage.getItem('recentSearches');
        return savedSearches ? JSON.parse(savedSearches) : [];
    });

    const handleSearch = useCallback((term: string): void => {
        if (!recentSearches.includes(term)) {
            const updatedSearches = [term, ...recentSearches].slice(0, 5);
            setRecentSearches(updatedSearches);
            localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
        }
        setPage(1);
        setSearchKeyword(term);
        setSearchTerm(term);
        setShowList(false)
    }, [setPage, setSearchKeyword, recentSearches]);

    return {
        searchTerm,
        setSearchTerm,
        recentSearches,
        handleSearch,
        showList,
        setShowList
    };
};
