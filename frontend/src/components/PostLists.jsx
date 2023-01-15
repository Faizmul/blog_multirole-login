import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";

const PostLists = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = async () => {
        const response = await axios.get("http://localhost:5000/posts");
        setPosts(response.data);
    };

    const deletePost = async (postId) => {
        await axios.delete(`http://localhost:5000/posts/${postId}`);
        getPosts();
    };

    return (
        <div>
            <h1 className='title'>Posts</h1>
            <h2 className='subtitle'>List of Posts</h2>
            <Link to="/posts/add" className="button is-primary mb-2">
                Add New
            </Link>
            <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Author</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Post</th>
                        <th>Created By</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post, index) => (
                        <tr key={post.uuid}>
                            <td>{index + 1}</td>
                            <td>{post.author}</td>
                            <td>{post.title}</td>
                            <td>{post.category}</td>
                            <td>{post.post}</td>
                            <td>{post.user.name}</td>
                            <td>
                                <Link
                                    to={`/posts/edit/${post.uuid}`}
                                    className="button is-small is-info"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => deletePost(post.uuid)}
                                    className="button is-small is-danger"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default PostLists