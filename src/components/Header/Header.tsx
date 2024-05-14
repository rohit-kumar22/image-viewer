import React, { useState, useEffect, useRef, KeyboardEvent, ChangeEvent } from "react";
import {
  AppBar,
  Toolbar,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  FormControl,
  InputAdornment,
  Box,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface HeaderProps {
  setPage: (page: number) => void; 
  setSearchKeyword: (keyword: string) => void; 
}

const Header: React.FC<HeaderProps> = ({ setPage, setSearchKeyword }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    return savedSearches ? JSON.parse(savedSearches) : [];
  });
  const [showRecentSearch, setShowRecentSearch] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearch = (term: string): void => {
    if (!recentSearches.includes(term)) {
      const updatedSearches = [term, ...recentSearches].slice(0, 5);
      setRecentSearches(updatedSearches);
    }
    setPage(1);
    setSearchKeyword(term);
    setSearchTerm(term);
    setShowRecentSearch(false);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
    setShowRecentSearch(true);
  };

  const handleSearchSelect = (event: React.MouseEvent<HTMLDivElement>, term: string): void => {
    event.stopPropagation();
    handleSearch(term);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter" && searchTerm !== "") {
      handleSearch(searchTerm);
    }
  };

  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowRecentSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#30343b", height: "5rem" }} className="smallScreen">
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item xs={6} md={8}>
            <Typography variant="h6">
              My Application
            </Typography>
          </Grid>
          <Grid item xs={6} md={4}>
            <Box ref={searchRef} sx={{ position: 'relative', width: 'auto' }}>
              <FormControl onClick={() => setShowRecentSearch(true)} className="search">
                <TextField
                  size="small"
                  autoComplete="off"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDown}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon sx={{ cursor: "pointer" }} onClick={() => handleSearch(searchTerm)} />
                      </InputAdornment>
                    ),
                  }}
                />
                {showRecentSearch && recentSearches.length > 0 && (
                  <List className="searchList" sx={{ top: '50px', position: 'absolute', zIndex: 1 }}>
                    {recentSearches.map((item, index) => (
                      <ListItem button key={index} onClick={(e) => handleSearchSelect(e,item)}>
                        <ListItemText secondary={item} />
                      </ListItem>
                    ))}
                  </List>
                )}
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;