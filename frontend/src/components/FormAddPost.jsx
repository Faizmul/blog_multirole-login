import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddPost = () => {
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [post, setPost] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const savePost = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/posts", {
                author: author,
                title: title,
                category: category,
                post: post,

            });
            navigate("/posts");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    return (
        <div>
            <h1 className='title'>Posts</h1>
            <h2 className='subtitle'>Add New Post</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={savePost}>
                            <p className="has-text-centered">{msg}</p>
                            <div className="field">
                                <label className="label">Author</label>
                                <div className="controll">
                                    <input type="text" className="input" value={author}
                                        onChange={(e) => setAuthor(e.target.value)} placeholder='Author' />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Title</label>
                                <div className="controll">
                                    <input type="text" className="input" value={title}
                                        onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Category</label>
                                <div className="controll">
                                    <input type="text" className="input" value={category}
                                        onChange={(e) => setCategory(e.target.value)} placeholder='Category' />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Post</label>
                                <div className="controll">
                                    <input type="text" className="input" value={post}
                                        onChange={(e) => setPost(e.target.value)} placeholder='Tulis disini...' />
                                </div>
                            </div>
                            <div className="field">
                                <div className="controll">
                                    <button type="submit" className="button is-success">Save</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormAddPost