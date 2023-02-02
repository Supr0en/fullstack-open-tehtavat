import { useState, useEffect, useRef } from 'react';
import Login from './components/login';
import Blogs from './components/Blogs';
import loginService from './services/logins';
import blogsService from './services/blogs';
import Alert from './components/Alert';
import '../src/App.css';

const App = () => {
    const [user, setUser] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [alert, setAlert] = useState({ show: false });
    const userRef = useRef();
    const passRef = useRef();

    const fetchBlogs = async () => {
        const blogs = await blogsService.getUsersBlogs();
        setBlogs(blogs.sort((a, b) => b.likes - a.likes));
    };

    const showAlert = (type, message) => {
        if (alert.show) return;
        setAlert({ show: true, type: type, message: message });
        setTimeout(() => setAlert({ show: false }), 5000);
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const username = userRef.current.value;
            const password = passRef.current.value;
            const userData = await loginService.login({ username, password });

            setUser(userData);
            blogsService.setToken(userData.token);
            showAlert('success', 'You have been logged in successfully');
            window.localStorage.setItem('user', JSON.stringify(userData));
        } catch (err) {
            showAlert('error', 'Invalid username or password');
        }
    };

    const handleLogout = async (event) => {
        setUser(null);
        blogsService.setToken('');
        window.localStorage.removeItem('user');
    };

    useEffect(() => {
        const isUserLogged = window.localStorage.getItem('user');
        if (isUserLogged) {
            const userData = JSON.parse(isUserLogged);
            setUser(userData);
            blogsService.setToken(userData.token);
        }
        fetchBlogs();
    }, []);

    if (user === null) {
        return (
            <>
                {alert.show && <Alert id='alert' alert={alert} />}
                <Login
                    handleLogin={handleLogin}
                    userRef={userRef}
                    passRef={passRef}
                />
            </>
        );
    }

    return (
        <div>
            <h2>blogs</h2>
            {alert.show && <Alert id='alert' alert={alert} />}
            <p>
                Logged in as {user.name}
                <button type='submit' onClick={handleLogout}>
                    Log out
                </button>
            </p>
            <Blogs
                id='blogs'
                user={user}
                blogs={blogs}
                setBlogs={setBlogs}
                showAlert={showAlert}
            />
        </div>
    );
};

export default App;
