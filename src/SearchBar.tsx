import React, { useState } from 'react';
import { InputBase, IconButton, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [expanded, setExpanded] = useState(false); // Track whether search bar is expanded
  const [searchQuery, setSearchQuery] = useState('');

  // Handle expanding the search bar when search icon is clicked
  const handleExpand = () => {
    setExpanded(true);
  };

  // Handle search input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Trigger search when user presses Enter or submits the search
  const handleSearch = () => {
    onSearch(searchQuery); // Call the parent function with the search query
  };

  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: expanded ? 400 : 50, // Expand on click
        transition: 'width 0.3s ease-in-out',
      }}
    >
      <IconButton onClick={handleExpand} sx={{ p: '10px' }}>
        <SearchIcon />
      </IconButton>
      {expanded && (
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search users"
          inputProps={{ 'aria-label': 'search users' }}
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSearch(); // Trigger search on pressing Enter
            }
          }}
        />
      )}
    </Paper>
  );
};

export default SearchBar;
