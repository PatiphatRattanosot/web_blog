import { useAuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuthContext();

  return (
    <div className="navbar bg-base-100 shadow-md px-5">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost normal-case text-xl text-primary">
          SE Blog
        </a>
      </div>

      <div className="navbar-center hidden md:flex">
        <a href="/create" className="btn btn-primary normal-case">
          Create Post
        </a>
      </div>

      <div className="navbar-end">
        {user ? (
          <div className="flex items-center space-x-4">
            <p className="text-gray-600">
              Welcome,{" "}
              <span className="font-semibold text-gray-800">
                {user.username}
              </span>
            </p>
            <button
              className="btn btn-error text-white"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex space-x-4">
            <a
              href="/sign-in"
              className="btn btn-outline btn-primary"
            >
              Login
            </a>
            <a
              href="/sign-up"
              className="btn btn-outline btn-accent"
            >
              Register
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
