import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/blogs';

let token = null;

const setToken = (newToken) => {
    token = `Bearer ${newToken}`;
};

const getUsersBlogs = async () => {
    const req = await axios.get(baseUrl);
    return req.data;
};

const create = async (newBlog) => {
    const config = {
        headers: { Authorization: token },
    };

    const req = await axios.post(baseUrl, newBlog, config);
    return req.data;
};

const update = (id, newBlog) => {
    axios.put(`${baseUrl}/${id}`, newBlog);
};

const deleteBlog = (id) => {
    const config = {
        headers: { Authorization: token },
    };

    axios.delete(`${baseUrl}/${id}`, config);
};

export default { getUsersBlogs, setToken, create, update, deleteBlog };
