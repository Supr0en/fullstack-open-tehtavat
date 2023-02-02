import { useState, useRef } from 'react';
import blogsService from '../services/blogs';

const CreateBlog = ({ user, blogs, setBlogs, showAlert }) => {
    const [showForm, setShowForm] = useState(false);
    const formRef = useRef();
    const titleRef = useRef();
    const authorRef = useRef();
    const urlRef = useRef();

    const createNewBlog = async (event) => {
        event.preventDefault();
        try {
            const title = titleRef.current.value;
            const author = authorRef.current.value;
            const url = urlRef.current.value;

            const newBlog = {
                title: title,
                author: author,
                url: url,
            };

            const createNewBlog = await blogsService.create(newBlog);

            setBlogs([
                ...blogs,
                { ...createNewBlog, user: { username: user.username } },
            ]);
            showAlert('success', `New blog ${title} added by ${author}`);
            setShowForm(false);
            formRef.current.reset();
        } catch (err) {
            showAlert('error', 'fill all fields');
        }
    };

    return (
        <>
            {showForm ? (
                <form id='blogForm' ref={formRef} onSubmit={createNewBlog}>
                    <h2>Create new</h2>
                    <div>
                        title: <input id='title' type='text' ref={titleRef} />
                    </div>
                    <div>
                        author:{' '}
                        <input id='author' type='text' ref={authorRef} />
                    </div>
                    <div>
                        url: <input id='url' type='text' ref={urlRef} />
                    </div>
                    <button id='newblog' type='submit'>
                        create
                    </button>
                    <button onClick={() => setShowForm(false)}>Cancel</button>
                </form>
            ) : (
                <button id='newblog' onClick={() => setShowForm(true)}>
                    new blog
                </button>
            )}
        </>
    );
};

export default CreateBlog;
