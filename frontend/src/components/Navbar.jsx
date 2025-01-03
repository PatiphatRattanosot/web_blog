import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

function Navbar() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate()
  const handleLogout = () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You will be logged out from your account.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, log out",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          logout()

          Swal.fire({
            title: "Logged Out",
            text: "You have been successfully logged out.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });


          navigate("/");
        }
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Something went wrong during logout.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };


  return (
    <div className="navbar bg-base-100 shadow-md px-5">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost normal-case text-xl text-primary">
          SE Blog
        </a>
      </div>

      {user && (
        <div className="navbar-center space-x-4 hidden md:flex">
          <a href="/create" className="btn btn-primary normal-case">
            Create Post
          </a>
          <a href={`/author/${user.id}`} className="btn btn-primary normal-case" >Post</a>
        </div>
      )}

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
              onClick={handleLogout}
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
