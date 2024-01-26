import React, { useState, useEffect, useCallback } from 'react';
import { useWikiSearch, actionTypes } from 'src/contexts/wiki-search-context';
import axios from 'axios';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';
import _debounce from 'lodash/debounce';

const WikiSearch = () => {
  const { dispatch } = useWikiSearch();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback(
    _debounce(async (query) => {
      try {
        const response = await axios.get(`http://localhost:8081/user/wiki-search/${query}`);
        const searchResults = response.data.query.search.map((result) => ({
          id: result.pageid,
          createdAt: result.timestamp,
          description: result.snippet.replace(/<[^>]*>/g, ''),
          logo: '../assets/logos/wikipedia-logo.svg', 
          title: result.title,
          wordcount: result.wordcount,
        }));
        dispatch({ type: actionTypes.SET_SEARCH_RESULTS, payload: searchResults });
      } catch (error) {
        console.error('Error in WikiSearch:', error);
      }
    }, 2000),
    [dispatch]
  );

  useEffect(() => {
    // Only invoke handleSearch if searchQuery is not empty
    if (searchQuery.trim() !== '') {
      handleSearch(searchQuery);
    }
  }, [searchQuery, handleSearch]);

  return (
    <Card sx={{ p: 2 }}>
      <OutlinedInput
        defaultValue=""
        fullWidth
        placeholder="Search here"
        startAdornment={(
          <InputAdornment position="start">
            <SvgIcon color="action" fontSize="small">
              <MagnifyingGlassIcon />
            </SvgIcon>
          </InputAdornment>
        )}
        sx={{ maxWidth: 1200 }}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </Card>
  );
};

export { WikiSearch };
