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

const Header = ({
  setPage,
  setSearchKeyword,
}: {
  setPage: any;
  setSearchKeyword: any;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showRecentSearch, setShowRecentSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null); // Ref to the search component

  const handleSearch = (term: string) => {
    if (!recentSearches.includes(term)) {
      const updatedSearches = [term, ...recentSearches].slice(0, 5);
      setRecentSearches(updatedSearches);
    }
    setPage(1);
    setSearchKeyword(term);
    setSearchTerm(term);  // Update the searchTerm for consistency
    setShowRecentSearch(false);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setShowRecentSearch(true);
  };

  const handleSearchSelect = (term: string) => {
    handleSearch(term);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchTerm !== "") {
      handleSearch(searchTerm);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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
    <AppBar position="fixed" sx={{ backgroundColor: "#30343b", height: "5rem" }}>
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
                      <ListItem button key={index} onClick={() => handleSearchSelect(item)}>
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
