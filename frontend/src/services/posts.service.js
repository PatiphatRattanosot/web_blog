import api from "./api";
const api_url = import.meta.env.VITE_POSTS_URL;

const createPost = async (post) => {
  const response = await api.post(`${api_url}/`, post, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

const getAllPosts = async () => await api.get(`${api_url}/`);

const getPostById = async (id) => await api.get(`${api_url}/${id}`);

const updatePost = async (post, id) => {
  const response = await api.post(`${api_url}/${id}`, post, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

const deletePost = async (id) => api.delete(`${api_url}/${id}`);

const PostsServices = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};

export default PostsServices;
