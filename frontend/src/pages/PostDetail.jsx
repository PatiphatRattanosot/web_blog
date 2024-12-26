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
          text: "Your post has been deleted.",
          icon: "success",
        });
        navigate("/");
      }
    });
  };

  return (
    <div className="">
      {postDetail ? (
        <div className="card w-full max-w-4xl bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="card-title text-4xl font-bold mb-6 text-gray-800">
              {postDetail.title}
            </h1>
            <div className="flex justify-between items-center text-sm text-gray-600 mb-6">
              <div>
                <time className="block">
                  {format(new Date(postDetail.createdAt), "dd MMMM yyyy HH:mm")}
                </time>
                <span>
                  By{" "}
                  <span className="text-primary font-semibold">
                    @{postDetail.author.username}
                  </span>
                </span>
              </div>
              {user?.id === postDetail.author._id && (
                <div className="flex space-x-4">
                  <a
                    href={`/edit/${id}`}
                    className="btn btn-warning text-white"
                  >
                    Edit Post
                  </a>
                  <button
                    onClick={() => handleDelete(postDetail._id)}
                    className="btn btn-error text-white"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
            <div
              className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl text-gray-700"
              dangerouslySetInnerHTML={{ __html: postDetail.content }}
            ></div>
          </div>
        </div>
      ) : (
        <div className="alert alert-error shadow-lg max-w-xl">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
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
            <span>{err || "Post not found"}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
