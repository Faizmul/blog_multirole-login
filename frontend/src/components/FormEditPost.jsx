import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditPost = () => {
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [post, setPost] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const getPostById = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/posts/${id}`
                );
                setAuthor(response.data.author);
                setTitle(response.data.title);
                setCategory(response.data.category);
                setPost(response.data.post);
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        };
        getPostById();
    }, [id]);

    const updatePost = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/posts/${id}`, {
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
            <h2 className='subtitle'>Edit Post</h2>
            <div className="card is-shadowless">
                <div className="card-content">
                    <div className="content">
                        <form onSubmit={updatePost}>
                            <p className="has-text-centered">{msg}</p>
                            <div className="field">
                                <label className="label">Author</label>
                                <div className="controll">
                                    <input type="text" className="input" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder='Author' />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Title</label>
                                <div className="controll">
                                    <input type="text" className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Category</label>
                                <div className="controll">
                                    <input type="text" className="input" value={category} onChange={(e) => setCategory(e.target.value)} placeholder='Category' />
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Post</label>
                                <div className="controll">
                                    <textarea type="text" className="input" value={post} onChange={(e) => setPost(e.target.value)} placeholder='Tulis disini...' />
                                </div>
                            </div>
                            <div className="field">
                                <div className="controll">
                                    <button type="submit" className="button is-success">Update</button>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormEditPost
