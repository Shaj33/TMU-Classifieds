import React, { FormEvent, useState } from 'react';

//New Post page
function NewPost(): JSX.Element {
    //Title and Content Hooks
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [postType, setPostType] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('')

    
    //Handle submit currently empty right now to prevent errors
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setTitle('');
        setContent('');
        setPostType('');
        setLocation('');
        setPrice('');
    };

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
                        <option value='wanted'>Item&#40;s&#41; Wanted</option>
                        <option value='wanted'>Item&#40;s&#41; For Sale</option>
                        <option value='wanted'>Academic Service</option>
                    </select>
                </div>
                <div className='post-location'>
                    <label>Content: </label>
                    <textarea value={location} onChange={(e) => setLocation(e.target.value)}></textarea>
                </div>
                <div className='post-price'>
                    <label>Content: </label>
                    <textarea value={price} onChange={(e) => setPrice(e.target.value)}></textarea>
                </div>
                <button type="submit" className='post-button'>Post Ad</button>
            </form>
        </div>
    );
}

export default NewPost;