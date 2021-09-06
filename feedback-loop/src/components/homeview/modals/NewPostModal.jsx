import React, { useContext, useState } from 'react';
import { DataContext } from '../../hidden/DataContext';
import '../../../styles/NewPostModal.css';
import axios from 'axios';

function NewPostModal(props) {

    const { setAddPost, thisUser, getPosts } = useContext(DataContext);

    const initialNewPostState = {
        title: '',
        body: '',
        tags: ''
    }

    const [newPost, setNewPost] = useState(initialNewPostState);

    const languageTags = ['HTML', 'CSS', 'JavaScript', 'Python', 'C#', 'C++', 'Git', 'CLI'];

    const handleChange = (e) => {
        setNewPost({...newPost, [e.target.id]: e.target.value})
        console.log(newPost);
    }

    const handleSubmit = () => {
        let newPostObj = {
            username: thisUser.username,
            title: newPost.title,
            body: newPost.body,
            tags: newPost.tags.split(', ')
        }

        axios.post('http://localhost:4000/posts', newPostObj)
            .then(getPosts());

        setNewPost(initialNewPostState);
        setAddPost(false);

    }

    return (
        <div className='NewPostModal'>
            <div className='modal'>
                <div className='modal-textbox'>
                    
                    <div className='form'>
                        <input className='title-input' id='title' type='text' placeholder='title' value={newPost.title} onChange={handleChange}/>
                        <textarea className='body-input' id='body' rows='10' cols='30' placeholder='say what you need to say' value={newPost.body} onChange={handleChange}/>
                        <div className='tags'>
                            <div>
                                <label for='tag-input'>
                                    enter tags separated by commas
                                    <input className='tag-input' id='tags' name='tag-input' type='text' placeHolder='e.g. javscript, react, components' value={newPost.tags} onChange={handleChange} />
                                </label>
                                
                            </div>
                            
                        </div>
                        <div className='form-buttons'>
                            <button className='new-post-submit-button' type='button' onClick={handleSubmit}>submit</button>
                            <button className='cancel-button' type='button' onClick={() => setAddPost(false)} >cancel</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewPostModal;