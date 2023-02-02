import axios from 'axios';

const baseUrl = 'http://localhost:3003/api/login';

const login = async (user) => {
    const res = await axios.post(baseUrl, user);
    return res.data;
}

export default { login };