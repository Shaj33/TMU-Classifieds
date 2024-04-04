import React, { FormEvent, useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';



//New Post page
function NewPost(): JSX.Element {
    //  Form attribute hooks
    const userId = localStorage.getItem('token')
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [postType, setPostType] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [priceAvailable, setPriceAvailable] = useState(true); // Set to true by default
    const [picture, setPicture] = useState('');
    const [cities, setCities] = useState<string[]>([]);
    const [showAlert, setShowAlert] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [fileName, setFileName] = useState<string>('No file chosen');

    useEffect(() => {
        fetchCities();
    }, []);

    const handleChange = (event: SelectChangeEvent) => {
        setPostType(event.target.value as string);
    };

    // function to get list of cities in Ontario using API
    const fetchCities = async () => {
        try {
            const response = await fetch('https://countriesnow.space/api/v0.1/countries/state/cities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    country: 'Canada',
                    state: 'Ontario'
                })
            });
            if (response.ok) {
                const data = await response.json();
                const cityNames = data.data || []; // Assuming the response data has a 'data' field containing city names
                setCities(cityNames);
            } else {
                console.error('Failed to fetch city data');
            }
        } catch (error) {
            console.error('Error fetching city data:', error);
        }
    };

    // Function to format the date
    function getFormattedDate() {
        const currentDate = new Date(); // Get the current date
        const months = [
            'January', 'February', 'March', 'April',
            'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December'
        ];
        const monthIndex = currentDate.getMonth(); // Get the month index (0-11)
        const month = months[monthIndex]; // Get the month name
        const date = currentDate.getDate(); // Get the date (1-31)
        const year = currentDate.getFullYear(); // Get the full year

        return `${month}, ${date}, ${year}`;
    }


    //Handle submit currently empty right now to prevent errors
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // Determines if price was entered by user or not
        const priceToSend = priceAvailable ? 'Available Upon Contact' : `$${price}`;

        // Checks if user has not filled in required form fields and sends alert
        if (!title || !content || !location || !postType || priceToSend === '') {
            setShowAlert(true);
            return;
        }

        // Preparing the POST request
        const postOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: userId,
                title: title,
                content: content,
                type: postType,
                location: location,
                price: priceToSend,
                picture: picture,
                date: getFormattedDate()
            })
        }

        fetch(`http://127.0.0.1:8000/app/post_ad/`, postOptions)
            .then(async (response) => {
                if (response.ok) {
                    setShowAlert(false); // Hide the error alert if it was previously shown
                    setShowSuccessAlert(true); // Show the success alert
                } else {
                    console.error('Failed to submit post');
                }
            })
            .catch(error => console.error('Error submitting post:', error));

        setTitle('');
        setContent('');
        setPostType('');
        setLocation('');
        setPrice('');
        setPriceAvailable(true);
        setPicture('');
    };

    // Function to handle image file uploading
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result?.toString() || '';
                setPicture(base64String);
            };
            reader.readAsDataURL(file);
        } else {
            setFileName('No file chosen');
        }
    }

    //Returns a Please Login Page if User is not logged in
    if (!userId) return (
        <div>
            <h1>Please Log In</h1>
        </div>

    )

    //Returns the form to facilitate submission
    return (
        <div className='Left'>
            <h2>Add a New Post</h2>
            {showAlert && (
                <Alert severity="error">Please fill in all required fields.</Alert>
            )}
            {showSuccessAlert && (
                <Alert severity="success">Post submitted successfully.</Alert>
            )}
            <form onSubmit={handleSubmit} className='post'>
                <div className='post-title'>
                    <FormControl fullWidth>
                        <TextField
                            label='Title'
                            type="text"
                            placeholder='Max 100 Characters'
                            variant='outlined'
                            value={title}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value.length <= 100) {
                                    setTitle(value);
                                }
                            }}
                            inputProps={{ maxLength: 100 }}
                            required
                        />
                    </FormControl>
                </div>
                <br />
                <div className='post-content'>
                    <FormControl fullWidth>
                        <TextField
                            label='Content'
                            placeholder='Max 500 Characters'
                            value={content}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value.length <= 500) {
                                    setContent(value);
                                }
                            }}
                            inputProps={{ maxLength: 500 }}
                            required
                        />
                    </FormControl>
                </div>
                <br />
                <div className='post-type'>
                    <FormControl fullWidth>
                        <InputLabel id="postTypesLabel">Choose post type*</InputLabel>
                        <Select
                            labelId='postTypesLabel'
                            id='postTypes'
                            value={postType}
                            label='PostType'
                            onChange={(e) => setPostType(e.target.value)}
                            required
                        >
                            <MenuItem value='Wanted'>Item&#40;s&#41; Wanted</MenuItem>
                            <MenuItem value='Sale'>Item&#40;s&#41; For Sale</MenuItem>
                            <MenuItem value='Services'>Academic Service</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <br />
                <div className='post-location'>
                    <FormControl fullWidth>
                        <InputLabel id="postLocationLabel">Location*</InputLabel>
                        <Select
                            labelId='postLocationLabel'
                            id='postLocation'
                            value={location}
                            label='PostLocation'
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        >
                            {cities.map(city => (
                                <MenuItem key={city} value={city}>{city}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <br />
                <Box display="flex" alignItems="center">
                    <TextField
                        label="Price ($)"
                        variant="outlined"
                        value={price}
                        onChange={(e) => {
                            const value = e.target.value;
                            // Ensures that input is a valid price
                            if (/^\d*\.?\d{0,2}$/.test(value) && Number(value) >= 0) {
                                setPrice(value);
                            }
                        }}
                        disabled={priceAvailable} // Disable price input when "Available Upon Contact" is checked
                        required={!priceAvailable}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={priceAvailable}
                                onChange={() => {
                                    setPriceAvailable(!priceAvailable);
                                    if (priceAvailable) setPrice(''); // Clear price when checking "Available Upon Contact"
                                }}
                            />
                        }
                        label="Available Upon Contact"
                        sx={{ paddingLeft: 2 }}
                    />
                </Box>
                <br />
                <Box className='post-picture' display="flex" alignItems="center">
                    <Button
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload a Picture
                        <input
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                    </Button>
                    <Typography variant="body1" sx={{ paddingX: 2 }}>{fileName}</Typography>
                </Box>
                <br />

                <Button type="submit" variant="contained">
                    Post Ad
                </Button>
            </form>
        </div>
    );
}

export default NewPost;