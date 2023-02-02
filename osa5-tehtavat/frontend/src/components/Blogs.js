import Blog from './Blog';
import CreateBlog from './createBlog';

const Blogs = ({ user, setBlogs, blogs, showAlert }) => {
    return (
        <div>
            <CreateBlog
                blogs={blogs}
                user={user}
                setBlogs={setBlogs}
                showAlert={showAlert}
            />
            {blogs?.map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    showAlert={showAlert}
                    user={user}
                    blogs={blogs}
                    setBlogs={setBlogs}
                />
            ))}
        </div>
    );
};

export default Blogs;
