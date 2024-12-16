import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Correct import
import { API_ENDPOINT } from './Api';
import './Login.css'; // Import the CSS file

function Login() {

    const navigate = useNavigate();
    const [ user, setUser ] = useState(null);

    useEffect (() => {
        const fetchUser = async () => {
            try {
                const response = JSON.parse(localStorage.getItem('token'))
                setUser(response.data);

                navigate("/login");
            } catch (error) {
                navigate ("/login");
            }
        };
        fetchUser();
    }, []);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_ENDPOINT}/auth/login`,{
                username,
                passwords: password,
            });

            localStorage.setItem("token", JSON.stringify(response));
            setError('');

            navigate("/dashboard");

        } catch (error) {
            setError('Inavlid Username or Password');
        }
    };


    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="title">URBAN <br></br>ViBE</h1>
                <p className="subtitle">Log in to craft your signature style.</p>

                <form className="login-form" onSubmit={handleSubmit}>
                    {error && <p className="error-message">{error}</p>}

                    <div className="input-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button className="login-btn" type="submit">
                        Login
                    </button>
                </form>

                <div className="links">
                    <a href="/register">Don’t have an account? Register</a>
                </div>
            </div>
        </div>
    );
}

export default Login;
