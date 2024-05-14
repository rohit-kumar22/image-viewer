import React, { useState, useEffect, useCallback } from 'react';
import { Grid } from "@mui/material";
import Header from "./Header/Header";
import CardGrid from "./CardGrid/CardGrid";
import {Image} from '../types/image'

const Main = () => {
    const [page, setPage] = useState<number>(1);
    const [imageData, setImageData] = useState<Image[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [totalPage, setTotalPage] = useState<number>(99999999);
    const clientId = `client_id=${process.env.REACT_APP_ACCESS_KEY}`;
    const baseUrl = 'https://api.unsplash.com/';

    const fetchData = useCallback(async () => {
        if (!isLoading && page < totalPage) {
            setIsLoading(true);
            const url = searchKeyword 
                ? `${baseUrl}search/photos?page=${page}&query=${encodeURIComponent(searchKeyword)}&${clientId}`
                : `${baseUrl}photos?page=${page}&${clientId}`;
    
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const newData = await response.json();
                const dataToAdd = searchKeyword ? newData.results : newData;
                setImageData((prev) => [...prev, ...dataToAdd]);
                setPage(prev => prev + 1);
                setTotalPage(newData?.total_pages || 99999);
            } catch (error) {
                // Handle error (e.g., by logging or displaying a message)
            } finally {
                setIsLoading(false);
            }
        }
    }, [isLoading, page, searchKeyword, clientId, baseUrl, totalPage]);
    

    useEffect(() => {    
        setImageData([]);
        fetchData();
    }, [searchKeyword]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
                fetchData();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
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

export default Main;
