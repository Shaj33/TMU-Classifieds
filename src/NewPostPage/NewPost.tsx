import React, { FormEvent, useState, useEffect } from 'react';

//New Post page
function NewPost(): JSX.Element {
    //Title and Content Hooks
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [postType, setPostType] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [picture, setPicture] = useState('');
    const [cities, setCities] = useState<string[]>([]);

    const userId = 100;

    useEffect(() => {
        fetchCities();
    }, []);

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

        const postOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: userId,
                title: title,
                content: content,
                type: postType,
                location: location,
                price: '$' + price,
                picture: picture,
                date: getFormattedDate()
            })
        }

        fetch(`http://127.0.0.1:8000/app/post_ad/`, postOptions)
            .then(async (response) => console.log(response))


        setTitle('');
        setContent('');
        setPostType('');
        setLocation('');
        setPrice('');
        setPicture('');
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result?.toString() || '';
                setPicture(base64String);
            };
            reader.readAsDataURL(file);
        }
    }

    //Returns the form to facilitate submission
    return (
        <div className='Left'>
            <h2>Add a New Post</h2>
            <form onSubmit={handleSubmit} className='post'>
                <div className='post-title'>
                    <label>Title: </label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className='post-content'>
                    <label>Content: </label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                </div>
                <div className='post-type'>
                    <label>Choose post type</label>
                    <select id='postTypes' value={postType} onChange={(e) => setPostType(e.target.value)}>
                        <option value=''>Select...</option>
                        <option value='Wanted'>Item&#40;s&#41; Wanted</option>
                        <option value='Sale'>Item&#40;s&#41; For Sale</option>
                        <option value='Services'>Academic Service</option>
                    </select>
                </div>
                <div className='post-location'>
                    <label>Location: </label>
                    <select value={location} onChange={(e) => setLocation(e.target.value)}>
                        <option value=''>Select...</option>
                        {cities.map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>
                <div className='post-price'>
                    <label>Price&#40;$&#41;: </label>
                    <textarea value={price} onChange={(e) => setPrice(e.target.value)}></textarea>
                </div>
                <div className='post-picture'>
                    <label>Picture:</label>
                    <input type='file' onChange={handleFileChange}></input>
                </div>
                <button type="submit" className='post-button'>Post Ad</button>
            </form>
        </div>
    );
}

export default NewPost;