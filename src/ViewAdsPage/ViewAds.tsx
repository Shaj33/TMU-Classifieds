import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState, useEffect } from 'react';
import TabPanel from './TabPanel';
import TextField from '@mui/material/TextField';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import ClearIcon from '@mui/icons-material/Clear';
import AdsAccordion from './AdsAccordion';
import FilterListIcon from '@mui/icons-material/FilterList';
import Popover from '@mui/material/Popover';


const SearchBar = () => (
    <form>
        <TextField
            id="search-bar"
            className="text"
            onInput={(e) => {
                //   add search stuff
            }}
            placeholder='Search...'
            size="small"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment position="end">
                        <ClearIcon />
                        {/* Add onClick and hidden/shown */}
                    </InputAdornment>
                ),
            }}
        />
    </form>
);

const FilterButton = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="open filter options"
                onClick={handleClick}
                sx={{ mr: 2 }}
            >
                <FilterListIcon />
            </IconButton>
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Typography sx={{ p: 2 }}>Filter Options</Typography>
                {/* Add Filter stuff */}
            </Popover>
        </div>
    );
};

function ViewAds() {
    const [value, setValue] = useState(0);
    const [adData, setAdData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/app/get_all_ad_listings');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const jsonData = await response.json();
                const filtered = jsonData.filter((item: any) => {
                    if (value === 0) {
                        return item.type === 'Sale';
                    } else if (value === 1) {
                        return item.type === 'Wanted';
                    } else if (value === 2) {
                        return item.type === 'Academic';
                    }
                    return false;
                });
                setAdData(filtered);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [value]);


    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Container maxWidth={false}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Tabs
                            value={value}
                            onChange={handleTabChange}
                            scrollButtons="auto"
                            textColor="inherit"
                        // indicatorColor="inherit"
                        // centered
                        >
                            <Tab value={0} label="For Sale" wrapped />
                            <Tab value={1} label="Wanted" wrapped />
                            <Tab value={2} label="Academic Services" wrapped />
                        </Tabs>
                        <Box flexGrow={1} />
                        <SearchBar />
                        <FilterButton />
                    </Toolbar>
                </AppBar>
            </Box>

            {[0, 1, 2].map((index) => (
                <TabPanel index={index} value={value}>
                    <AdsAccordion adsList={adData} />
                </TabPanel>
            ))}

        </Container>
    );
}

export default ViewAds;
