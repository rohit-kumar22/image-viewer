const BASE_URL = process.env.REACT_APP_BASE_URL || 'https://api.unsplash.com/';
const DEFAULT_TOTAL_PAGES = parseInt(process.env.REACT_APP_DEFAULT_TOTAL_PAGES || '10000');

export const constructUrl = (page: number, searchKeyword: string, clientId: string): string => {
    return searchKeyword 
        ? `${BASE_URL}search/photos?page=${page}&query=${encodeURIComponent(searchKeyword)}&${clientId}`
        : `${BASE_URL}photos?page=${page}&${clientId}`;
}

export { DEFAULT_TOTAL_PAGES };
