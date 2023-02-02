import PropTypes from 'prop-types';

const Login = ({ handleLogin, userRef, passRef }) => {
    return (
        <>
            <form onSubmit={handleLogin}>
                <h2>Log in to application</h2>

                <div>
                    Username: <input id='username' type='text' ref={userRef} />
                </div>
                <div>
                    password:{' '}
                    <input id='password' type='password' ref={passRef} />
                </div>
                <div>
                    <button id='submit' type='submit'>
                        Submit
                    </button>
                </div>
            </form>
        </>
    );
};

Login.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    userRef: PropTypes.object.isRequired,
    passRef: PropTypes.object.isRequired,
};

export default Login;
