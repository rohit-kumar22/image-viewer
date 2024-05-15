import { useState, useCallback, useEffect } from 'react';
import { Grid } from "@mui/material";
import Header from "./Header/Header";
import CardGrid from "./CardGrid/CardGrid";
import { Image } from '../types/image';
import { constructUrl, DEFAULT_TOTAL_PAGES } from '../utils/urlHelper';

const Dashboard = () => {
    const [page, setPage] = useState<number>(1);
    const [imageData, setImageData] = useState<Image[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [totalPage, setTotalPage] = useState<number>(DEFAULT_TOTAL_PAGES);
    const clientId = `client_id=${process.env.REACT_APP_ACCESS_KEY}`;


    // Data fetching function
    const fetchData = useCallback(async () => {
        if (!isLoading && page <= totalPage) {
            setIsLoading(true);
            const url = constructUrl(page, searchKeyword, clientId); // apiConstruct helper function
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('Network response was not ok');
                const newData = await response.json();
                const dataToAdd = searchKeyword ? newData.results : newData;
                setImageData(prev => [...prev, ...dataToAdd]);
                setPage(prev => prev + 1);
                setTotalPage(newData.total_pages || DEFAULT_TOTAL_PAGES);
            } catch (error) {
                console.error('Fetch error:', error);
            } finally {
                setIsLoading(false);
            }
        }
    }, [page, isLoading, searchKeyword, clientId, totalPage]);

    useEffect(() => {
        setImageData([]);
        setPage(1);
        fetchData();
    }, [searchKeyword]);


    // page scroll method
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
                fetchData();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [fetchData]);

    return (
        <Grid container>
            <Grid item xs={12}>
                <Header setPage={setPage} setSearchKeyword={setSearchKeyword} />
            </Grid>
            <Grid item xs={12} mt={10}>
                <CardGrid imageData={imageData} isLoading={isLoading} />
            </Grid>
        </Grid>
    );
};

export default Dashboard;
