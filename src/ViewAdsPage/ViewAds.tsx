import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import { useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import AdsCardGrid from './AdsCardGrid';
import TabPanel from './TabPanel';
import FilterButton, { AdFilterOptions } from './FilterButton';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { setFriendId, setPostId } from '../store/messagesSlice';

type SearchBarProps = {
    setSearch: React.Dispatch<React.SetStateAction<string>>,
    currentSearchValue: string
}


const SearchBar = ({ setSearch, currentSearchValue }: SearchBarProps) => {
    return (
        <form>
            <TextField
                id="search-bar"
                className="text"
                type='search'
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setSearch(e.target.value);
                }}
                value={currentSearchValue}
                placeholder='Search...'
                size="small"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    )
                }}
            />
        </form>
    )
};



function ViewAds() {
    const theme = useTheme();
    const isXSmall = useMediaQuery('(max-width:870px)')
    const isSmall = useMediaQuery('(max-width:1252px)')
    const isMed = useMediaQuery('(max-width:1624px)')
    const columnNum = isXSmall ? 1 : isSmall ? 2 : isMed ? 3 : 4
    const [value, setValue] = useState(0);
    const [adData, setAdData] = useState<any[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const [filterValues, setFilterValues] = useState<AdFilterOptions>({
        city: '',
        dateBefore: '',
        dateAfter: '',
        priceLower: '',
        priceUpper: ''
    });

    const [filteredAdData, setFilteredAdData] = useState<any[]>([]);

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const OpenMessageToUser = (ad: any) => {
        dispatch(setPostId(ad.id))
        dispatch(setFriendId(ad.user_id))
        navigate('/communication')
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/app/get_all_ad_listings');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const jsonData = await response.json();

                // reset filter values when switching between tabs
                setFilterValues({
                    city: '',
                    dateBefore: '',
                    dateAfter: '',
                    priceLower: '',
                    priceUpper: ''
                });
                const filteredByType = jsonData.filter((item: any) => {
                    if (!item.is_open) {
                        return false;
                    }
                    
                    if (value === 0) {
                        return item.type === 'Sale';
                    } else if (value === 1) {
                        return item.type === 'Wanted';
                    } else if (value === 2) {
                        return item.type === 'Academic';
                    }
                    return false;
                });
                setAdData(filteredByType);
                setFilteredAdData(filteredByType);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [value]);

    useEffect(() => {
        setFilteredAdData(adData.filter((item: any) => {
            const lowercaseSearchValue = searchValue.toLowerCase();

            if (item.content.toLowerCase().includes(lowercaseSearchValue) ||
                item.title.toLowerCase().includes(lowercaseSearchValue) ||
                item.location.toLowerCase().includes(lowercaseSearchValue)) {

                if (filterValues.city && item.location.toLowerCase() !== filterValues.city.toLowerCase()) {
                    return false;
                }

                if (filterValues.dateBefore && dayjs(item.date, 'MMMM DD, YYYY').isAfter(dayjs(filterValues.dateBefore))) {
                    return false;
                }

                if (filterValues.dateAfter && dayjs(item.date, 'MMMM DD, YYYY').isBefore(dayjs(filterValues.dateAfter))) {
                    return false;
                }

                if (item.price) {
                    const itemPrice = parseFloat(item.price.replace(/[$,]/g, ''));
                    if (!isNaN(itemPrice)) {
                        const priceLower = filterValues.priceLower ? parseFloat(filterValues.priceLower.replace(/[$,]/g, '')) : Number.MIN_SAFE_INTEGER;
                        const priceUpper = filterValues.priceUpper ? parseFloat(filterValues.priceUpper.replace(/[$,]/g, '')) : Number.MAX_SAFE_INTEGER;
                        if (itemPrice < priceLower || itemPrice > priceUpper) {
                            return false;
                        }
                    }
                }

                return true;
            }

            return false;
        }))
    }, [filterValues, searchValue, adData]);


    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div >
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Tabs
                            value={value}
                            onChange={handleTabChange}
                            scrollButtons
                            textColor="inherit"
                            variant="scrollable"
                            allowScrollButtonsMobile
                        >
                            <Tab value={0} label="For Sale" wrapped />
                            <Tab value={1} label="Wanted" wrapped />
                            <Tab value={2} label="Academic Services" wrapped />
                        </Tabs>
                        <Box flexGrow={1} />
                        <SearchBar setSearch={setSearchValue} currentSearchValue={searchValue} />
                        <FilterButton updateFilter={setFilterValues} currentFilter={filterValues} />
                    </Toolbar>
                </AppBar>
            </Box>

            {[0, 1, 2].map((index) => (
                <TabPanel index={index} value={value}>
                    <AdsCardGrid adsList={filteredAdData} openMessage={OpenMessageToUser} columnNum={columnNum} />
                </TabPanel>
            ))}

        </div>
    );
}

export default ViewAds;
