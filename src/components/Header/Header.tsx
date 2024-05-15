import React, { useRef, useEffect } from 'react';
import {
  AppBar, Toolbar, TextField, Typography, Box, Grid, InputAdornment, List, ListItem, ListItemText
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useRecentSearches } from '../../hooks/useRecentSearches'; // custom hook

interface HeaderProps {
  setPage: (page: number) => void; 
  setSearchKeyword: (keyword: string) => void; 
}

const Header: React.FC<HeaderProps> = React.memo(({ setPage, setSearchKeyword }) => {
  // custom hook for header functionality
  const { searchTerm, setSearchTerm, recentSearches, handleSearch, setShowList, showList } = useRecentSearches(setPage, setSearchKeyword);
  // ref for not displaying search list is user click outside the search list
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <AppBar position="fixed" className='fixedNavbar'>
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item xs={6} md={8}>
            <Typography variant="h6">Xtracap</Typography>
          </Grid>
          <Grid item xs={6} md={4}>
            <Box ref={searchRef} sx={{ position: 'relative', width: 'auto' }}>
              <TextField
                size="small"
                className='search'
                autoComplete="off"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
                onClick={()=> setShowList(true)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon sx={{ cursor: "pointer" }} onClick={() => handleSearch(searchTerm)} />
                    </InputAdornment>
                  ),
                }}
              />
              {showList && recentSearches.length > 0 && (
                <List className="searchList" sx={{ top: '50px', position: 'absolute', zIndex: 1 }}>
                  {recentSearches.map((search, index) => (
                    <ListItem button key={index} onClick={() => handleSearch(search)}>
                      <ListItemText secondary={search} />
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
});

export default Header;
