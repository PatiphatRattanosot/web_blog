import api from "./api";
const api_url = import.meta.env.VITE_POSTS_URL;

const createPost = async (post) => {
  console.log("Create :" + post);
  for (const [key, value] of post.entries()) {
    console.log(`${key}:`, value);
  }

  const response = await api.post(`${api_url}/`, post, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

const getAllPosts = async () => await api.get(`${api_url}/`);

const getPostById = async (id) => await api.get(`${api_url}/${id}`);

const updatePost = async (id, post) => {
  // console.log("Update :" + post);
  // for (const [key, value] of post.entries()) {
  //   console.log(`${key}:`, value);
  // }
  console.log(`${api_url}/${id}`);

  const response = await api.put(
    `http://localhost:3001${api_url}/${id}`,
    post,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
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
