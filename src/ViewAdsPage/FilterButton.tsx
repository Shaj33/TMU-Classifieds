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
    currentFilter: AdFilterOptions;
    cities: string[];
}

const FilterButton = ({ updateFilter, currentFilter, cities }: FilterProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
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