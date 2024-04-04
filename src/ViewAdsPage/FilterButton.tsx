import FilterListIcon from '@mui/icons-material/FilterList';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import InputAdornment from '@mui/material/InputAdornment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export type AdFilterOptions = {
    city: string,
    dateBefore: string,
    dateAfter: string,
    priceLower: string,
    priceUpper: string
}

type FilterProps = {
    updateFilter: React.Dispatch<React.SetStateAction<AdFilterOptions>>;
    currentFilter: AdFilterOptions
}

const FilterButton = ({ updateFilter, currentFilter }: FilterProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const cities = [
        "Ajax",
        "Algoma",
        "Alliston",
        "Amherstburg",
        "Amigo Beach",
        "Ancaster",
        "Angus",
        "Arnprior",
        "Atikokan",
        "Attawapiskat",
        "Aurora",
        "Aylmer",
        "Azilda",
        "Ballantrae",
        "Bancroft",
        "Barrie",
        "Bath",
        "Belleville",
        "Bells Corners",
        "Belmont",
        "Binbrook",
        "Bluewater",
        "Bourget",
        "Bracebridge",
        "Brampton",
        "Brant",
        "Brantford",
        "Brockville",
        "Brussels",
        "Burford",
        "Burlington",
        "Cambridge",
        "Camlachie",
        "Capreol",
        "Carleton Place",
        "Casselman",
        "Chatham",
        "Chatham-Kent",
        "Clarence-Rockland",
        "Cobourg",
        "Cochrane District",
        "Collingwood",
        "Concord",
        "Constance Bay",
        "Cookstown",
        "Cornwall",
        "Corunna",
        "Deep River",
        "Delaware",
        "Deseronto",
        "Dorchester",
        "Dowling",
        "Dryden",
        "Durham",
        "Ear Falls",
        "East Gwillimbury",
        "East York",
        "Elliot Lake",
        "Elmvale",
        "Englehart",
        "Espanola",
        "Essex",
        "Etobicoke",
        "Fort Erie",
        "Fort Frances",
        "Gananoque",
        "Glencoe",
        "Goderich",
        "Golden",
        "Gravenhurst",
        "Greater Napanee",
        "Greater Sudbury",
        "Greenstone",
        "Guelph",
        "Haldimand County",
        "Haliburton Village",
        "Halton",
        "Hamilton",
        "Hanover",
        "Harriston",
        "Hawkesbury",
        "Hearst",
        "Hornepayne",
        "Huntsville",
        "Huron East",
        "Ingersoll",
        "Innisfil",
        "Iroquois Falls",
        "Jarvis",
        "Kanata",
        "Kapuskasing",
        "Kawartha Lakes",
        "Kenora",
        "Keswick",
        "Kincardine",
        "King",
        "Kingston",
        "Kirkland Lake",
        "Kitchener",
        "L'Orignal",
        "Lakefield",
        "Lambton Shores",
        "Lappe",
        "Leamington",
        "Limoges",
        "Lindsay",
        "Listowel",
        "Little Current",
        "Lively",
        "London",
        "Lucan",
        "Madoc",
        "Manitoulin District",
        "Manitouwadge",
        "Marathon",
        "Markdale",
        "Markham",
        "Mattawa",
        "Meaford",
        "Metcalfe",
        "Midland",
        "Mildmay",
        "Millbrook",
        "Milton",
        "Mississauga",
        "Mississauga Beach",
        "Moose Factory",
        "Moosonee",
        "Morrisburg",
        "Mount Albert",
        "Mount Brydges",
        "Napanee",
        "Napanee Downtown",
        "Neebing",
        "Nepean",
        "New Hamburg",
        "Newmarket",
        "Niagara Falls",
        "Nipissing District",
        "Norfolk County",
        "North Bay",
        "North Perth",
        "North York",
        "Norwood",
        "Oakville",
        "Omemee",
        "Orangeville",
        "Orillia",
        "Osgoode",
        "Oshawa",
        "Ottawa",
        "Owen Sound",
        "Paisley",
        "Paris",
        "Parkhill",
        "Parry Sound",
        "Parry Sound District",
        "Peel",
        "Pembroke",
        "Perth",
        "Petawawa",
        "Peterborough",
        "Petrolia",
        "Pickering",
        "Picton",
        "Plantagenet",
        "Plattsville",
        "Port Colborne",
        "Port Hope",
        "Port Rowan",
        "Port Stanley",
        "Powassan",
        "Prescott",
        "Prince Edward",
        "Queenswood Heights",
        "Quinte West",
        "Rainy River District",
        "Rayside-Balfour",
        "Red Lake",
        "Regional Municipality of Waterloo",
        "Renfrew",
        "Richmond",
        "Richmond Hill",
        "Ridgetown",
        "Rockwood",
        "Russell",
        "Sarnia",
        "Sault Ste. Marie",
        "Scarborough",
        "Seaforth",
        "Shelburne",
        "Simcoe",
        "Sioux Lookout",
        "Skatepark",
        "Smiths Falls",
        "South Huron",
        "South River",
        "St. Catharines",
        "St. George",
        "St. Thomas",
        "Stirling",
        "Stoney Point",
        "Stratford",
        "Sudbury",
        "Tavistock",
        "Temiskaming Shores",
        "Thessalon",
        "Thorold",
        "Thunder Bay",
        "Thunder Bay District",
        "Timiskaming District",
        "Timmins",
        "Tobermory",
        "Toronto",
        "Toronto county",
        "Tottenham",
        "Tweed",
        "Uxbridge",
        "Valley East",
        "Vanier",
        "Vaughan",
        "Vineland",
        "Virgil",
        "Walpole Island",
        "Wasaga Beach",
        "Waterford",
        "Waterloo",
        "Watford",
        "Wawa",
        "Welland",
        "Wellesley",
        "Wendover",
        "West Lorne",
        "Willowdale",
        "Winchester",
        "Windsor",
        "Wingham",
        "Woodstock",
        "York"
    ];

    const handleClearAll = () => {
        updateFilter({
            city: '',
            dateBefore: '',
            dateAfter: '',
            priceLower: '',
            priceUpper: ''
        });
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Tooltip title="Filters">
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
            </Tooltip>
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
                <Box sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                        <Typography variant='subtitle1'>Filter Options</Typography>
                        <Button
                            onClick={handleClearAll}
                            color='error'
                            variant="contained">Clear All</Button>
                    </Box>

                    <Autocomplete
                        id="combo-box-demo"
                        options={cities}
                        fullWidth
                        value={currentFilter.city || ''}
                        renderInput={(params) => <TextField {...params} label="City" />}
                        onChange={(_, value) => {
                            updateFilter({ ...currentFilter, city: value || '' });
                        }}
                    />
                    <br />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Ad Created Before Date"
                            sx={{ width: '100%', maxWidth:'300px' }}
                            onAccept={(value) => {
                                updateFilter({ ...currentFilter, dateBefore: value?.toString() || '' });
                            }}
                            value={(currentFilter.dateBefore) ? dayjs(currentFilter.dateBefore) : null}
                        />
                        <br />
                        <br />
                        <DatePicker
                            label="Ad Created After Date"
                            sx={{ width: '100%', maxWidth:'300px' }}
                            onAccept={(value) => {
                                updateFilter({ ...currentFilter, dateAfter: value?.toString() || '' });
                            }}
                            value={(currentFilter.dateAfter) ? dayjs(currentFilter.dateAfter) : null}
                        />
                    </LocalizationProvider>
                    <br />
                    <br />

                    <TextField
                        sx={{ width: '100%', maxWidth:'300px' }}
                        type="number"
                        label="Minimum Price"
                        variant="outlined"
                        value={(currentFilter.priceLower) ? parseFloat(currentFilter.priceLower) : undefined}
                        placeholder="Minimum Price"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            updateFilter({ ...currentFilter, priceLower: e.target.value || '' });
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AttachMoneyIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <br />
                    <br />
                    <TextField
                        sx={{ width: '100%', maxWidth:'300px' }}
                        type="number"
                        label="Maximum Price"
                        variant="outlined"
                        value={(currentFilter.priceUpper) ? parseFloat(currentFilter.priceUpper) : undefined}
                        placeholder="Maximum Price"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            updateFilter({ ...currentFilter, priceUpper: e.target.value || '' });
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AttachMoneyIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
            </Popover>
        </div>
    );
};

export default FilterButton;