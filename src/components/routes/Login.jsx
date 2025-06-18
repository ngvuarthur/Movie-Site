import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { setApiKey } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://loki.trentu.ca/~shubarnasunuwar/3430/assn/assign2/api/users/session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: `Username=${encodeURIComponent(username)}&Password=${encodeURIComponent(password)}`,
            });

            if (response.ok) {
                const data = await response.json();
                setApiKey(data.api_key);
                navigate("/");
            } else {
                const err = await response.json();
                setError(err.error || "Login failed");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="login-page">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                {error && <p className="error">{error}</p>}
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
