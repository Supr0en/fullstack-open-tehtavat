import { useState } from 'react';
import blogsService from '../services/blogs';

const Blog = ({ user, blogs, blog, setBlogs, showAlert }) => {
    const [showBlog, setShowBlog] = useState(false);

    const updateBlogLikes = async (newBlog) => {
        blogsService.update(newBlog.id, { likes: newBlog.likes + 1 });

        const updatedBlog = blogs.find((obj) => obj.id === newBlog.id);
        updatedBlog.likes = newBlog.likes + 1;

        setBlogs([...blogs]);
    };

    const handleDeleteBlog = (blog) => {
        if (
            window.confirm(
                `Do you wish to delete ${blog.title} by ${blog.author}`
            )
        ) {
            blogsService.deleteBlog(blog.id);
            setBlogs(blogs.filter((obj) => obj.id !== blog.id));
            showAlert('success', `Deleted blog ${blog.title}`);
        }
    };

    const isBlogYours = blog.user.username === user.username;

    return (
        <div className='blog'>
            <p>
                {blog.title}. Blog by {blog.author}
                <button id='view-btn' onClick={() => setShowBlog(!showBlog)}>
                    {showBlog ? 'Hide' : 'View'}
                </button>
            </p>

            {showBlog && (
                <>
                    <p>Link:{blog.url}</p>
                    <p>
                        Likes: {blog.likes}{' '}
                        <button
                            id='like-btn'
                            onClick={() => updateBlogLikes(blog)}
                        >
                            Like
                        </button>
                    </p>
                    <p>Name: {user.name}</p>
                    {isBlogYours && (
                        <button
                            id='delete-btn'
                            onClick={() => handleDeleteBlog(blog)}
                        >
                            Delete
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default Blog;
