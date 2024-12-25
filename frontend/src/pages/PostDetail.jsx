import { useEffect, useState } from "react";
import PostsServices from "../services/posts.service";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { useAuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const PostDetail = () => {
  const [postDetail, setPostDetail] = useState(null);
  const [err, setErr] = useState(null);
  const { id } = useParams();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PostsServices.getPostById(id);

        if (response.status === 200) {
          setPostDetail(response.data);
        }
      } catch (err) {
        console.log(err);
        setErr(err?.response?.data?.message);
      }
    };
    fetchData();
  }, [id]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        PostsServices.deletePost(id);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        navigate("/");
      }
    });
  };

  return (
    <>
      {postDetail ? (
        <div className="min-h-screen bg-gray-50 flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-4xl w-full">
            <h1 className="text-4xl font-semibold text-gray-800 mb-6">
              {postDetail.title}
            </h1>
            <div className="flex justify-between text-gray-600 mb-4">
              <div>
                <time className="block mb-2">
                  {format(new Date(postDetail.createdAt), "dd MMMM yyyy HH:mm")}
                </time>
                <span className="text-gray-500">
                  By{" "}
                  <span className="text-blue-500">
                    @{postDetail.author.username}
                  </span>
                </span>
              </div>
              {user.id === postDetail.author._id && (
                <div className="flex space-x-4">
                  <a
                    href={`/edit/${id}`}
                    className="btn btn-warning px-4 py-2 rounded-md text-white bg-yellow-500 hover:bg-yellow-400 transition duration-200"
                  >
                    Edit Post
                  </a>
                  <a
                    onClick={() => {
                      handleDelete(postDetail?._id);
                    }}
                    className="btn btn-error px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-400 transition duration-200"
                  >
                    Delete
                  </a>
                </div>
              )}
            </div>
            <div
              className="content text-gray-700 leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: postDetail.content }}
            ></div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <div
            role="alert"
            className="alert alert-error max-w-xl p-4 bg-red-100 border border-red-300 rounded-lg shadow-md flex items-center space-x-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current text-red-600"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-red-800">{err || "Post not found"}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default PostDetail;
