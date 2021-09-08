import axios from 'axios';
import React, { useContext, useState } from 'react';
import { DataContext } from '../../../hidden/DataContext';
import EditPostModal from '../../modals/EditPostModal';


function PostHeader({title, author, time, ownerID, post}) {

    const { displayTime, thisUser, URL } = useContext(DataContext);

    const [showEditModal, setShowEditModal] = useState(false);

    const editPost = () => {
        setShowEditModal(true);
    }

    const deletePost = () => {
        console.log(post._id)
        axios.delete(`${URL}/posts/${post._id}`)
            .catch(console.error);
    }

    return (
        <div className='PostHeader'>
            {showEditModal &&
                <EditPostModal post={post} setShowEditModal={setShowEditModal}/>
            }
            <div>
                <h2 className='post-title'>{title}</h2>
                <div className='post-header-info'>
                    <h3 className='post-author'><span style={{fontStyle: 'italic', fontSize: 'small'}}>posted by</span> {author}</h3>
                    <h3 className='post-time'>{displayTime(time)}</h3> 
                </div>
            </div>
            {(ownerID === thisUser.userID) && 
                <div>
                    <button className='edit-post-button' type='button' onClick={editPost} >edit post</button>
                    <button className='delete-post-button' type='button' onClick={deletePost} >delete post</button>
                </div>
            }
        </div>
    );
}

export default PostHeader;