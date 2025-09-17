import { Link } from 'react-router-dom';

function Header({ user, onLogout }) {
  return (
    // This <header> element is the full-width background container
    <header className="bg-gray-800 text-white shadow-md w-full">
      {/* This <nav> element centers the content */}
      <nav className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Website Name/Logo */}
        <Link to="/" className="text-2xl font-bold hover:text-blue-400 transition-colors">
          📌 Tick Task
        </Link>

        {/* Login/Logout Buttons */}
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-300">Hi, {user.username}!</span>
              <button
                onClick={onLogout}
                className="px-4 py-2 font-semibold text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;