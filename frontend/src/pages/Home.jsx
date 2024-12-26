import { useEffect, useState } from "react";
import PostsServices from "../services/posts.service";
import Post from "../components/Post";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await PostsServices.getAllPosts();
      if (response.status === 200) {
        setPosts(response.data);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-6">
        {posts.length > 0 ? (
          posts.map((post, index) => <Post key={index} {...post} />)
        ) : (
          <p className="text-center text-gray-500">No posts available.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
