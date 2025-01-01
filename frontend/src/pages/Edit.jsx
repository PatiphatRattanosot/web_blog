import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import PostService from "../services/posts.service";
import Editor from "../components/Editor";

const Edit = () => {
  const [postDetail, setPostDetail] = useState({
    title: "",
    summary: "",
    content: "",
    file: null,
  });
  const [content, setContent] = useState("");
  const editorRef = useRef();

  const navigate = useNavigate();
  const { id } = useParams();


  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await PostService.getPostById(id);
        if (response.status === 200) {
          setPostDetail(response.data);
          setContent(content);
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: error?.response?.data?.message || "Failed to load post details.",
          icon: "error",
        });
      }
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "file") {
      setPostDetail({ ...postDetail, [name]: e.target.files[0] });
    } else {
      setPostDetail({ ...postDetail, [name]: value });
    }
  };

  const handleContentChange = (value) => {
    setContent(value);
    setPostDetail({ ...postDetail, content: value });
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.set("title", postDetail.title);
      data.set("summary", postDetail.summary);
      data.set("content", postDetail.content);
      if (postDetail.file) data.set("file", postDetail.file);

      // for (const [key, value] of data.entries()) {
      //   console.log(`${key}:`, value);
      // }

      const response = await PostService.updatePost(id, data);

      if (response.status === 200) {
        Swal.fire({
          title: "Post Updated Successfully",
          text: response.data.message,
          icon: "success",
        }).then(() => {
          navigate("/");
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Update Failed",
        text: error?.response?.data?.message || error.message,
        icon: "error",
      });
    }
  };


  return (
    <div className="bg-white p-8 rounded-lg max-w-4xl w-full shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Edit Post
      </h2>
      <label>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Title"
            value={postDetail.title}
            onChange={handleChange}
            name="title"
            className="input input-bordered input-info w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Summary"
            value={postDetail.summary}
            onChange={handleChange}
            name="summary"
            className="input input-bordered input-info w-full"
          />
        </div>

        <div className="h-64">
          <Editor
            value={content}
            onChange={handleContentChange}
            ref={editorRef}
          />
        </div>

        <div className="mb-4">
          <input
            type="file"
            name="file"
            onChange={handleChange}
            className="file-input file-input-bordered file-input-accent w-full"
          />
        </div>
        <button className="btn btn-primary w-full" onClick={handleSubmit}>
          Update
        </button>
      </label>
    </div>
  );
};

export default Edit;
