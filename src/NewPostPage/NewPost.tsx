import React, { FormEvent, useState } from 'react';

//New Post page
function NewPost(): JSX.Element {
    //Title and Content Hooks
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    
    //Handle submit currently empty right now to prevent errors
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setTitle('');
        setContent('');
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
                <button type="submit" className='post-button'>Add Post</button>
            </form>
        </div>
    );
}

export default NewPost;