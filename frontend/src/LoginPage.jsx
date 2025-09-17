import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            onLogin(data.user);
            navigate('/');
        } else {
            alert(data.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                {/* Header */}
                <h2 className="text-3xl font-extrabold text-center text-gray-900">
                    Sign in to your account
                </h2>

                {/* Form */}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="sr-only">Email address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Email address"
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Password"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 px-4 text-lg font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                        Sign in
                    </button>
                </form>

                {/* Link to Register Page */}
                <p className="text-sm text-center text-gray-600">
                    Not a member?{' '}
                    <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;