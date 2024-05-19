import React from "react";
import {
  AppBar,
  Toolbar,
  TextField,
  Typography,
  Box,
  Grid,
  Autocomplete,
  ListItem,
  IconButton,
  InputAdornment,
  Paper,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { useRecentSearches } from "../../hooks/useRecentSearches"; // custom hook

interface HeaderProps {
  setPage: (page: number) => void;
  setSearchKeyword: (keyword: string) => void;
}

const Header: React.FC<HeaderProps> = React.memo(
  ({ setPage, setSearchKeyword }) => {
    // custom hook for header functionality
    const {
      searchTerm,
      setSearchTerm,
      recentSearches,
      handleSearch,
      setShowList,
      showList,
      removeSearch,
    } = useRecentSearches(setPage, setSearchKeyword);

    return (
      <AppBar position="fixed" className="fixedNavbar">
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item xs={6} md={8}>
              <Typography variant="h6">Xtracap</Typography>
            </Grid>
            <Grid item xs={6} md={4}>
              <Box sx={{ position: "relative", width: "auto" }}>
                <Autocomplete
                  disablePortal
                  disableClearable
                  freeSolo
                  id="combo-box-demo"
                  options={recentSearches}
                  getOptionLabel={(option) => option}
                  sx={{ width: 300 }}
                  PaperComponent={(props) => (
                    <Paper {...props} style={{ marginTop: "8px" }} />
                  )}
                  value={searchTerm}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setSearchTerm(newValue);
                      handleSearch(newValue);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Search..."
                      className="search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleSearch(searchTerm)
                      }
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <InputAdornment position="end">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                  renderOption={(props, option) => (
                    <ListItem
                      {...props}
                      sx={{
                        backgroundColor:
                          option === searchTerm ? "lightgray" : "inherit",
                      }}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          onClick={(event) => {
                            event.stopPropagation();
                            removeSearch(option);
                          }}
                        >
                          <ClearIcon />
                        </IconButton>
                      }
                    >
                      {option}
                    </ListItem>
                  )}
                />
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
);

export default Header;