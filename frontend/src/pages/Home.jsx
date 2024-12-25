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
    <>
      <div className="flex flex-col space-y-6">
        <div className="justify-center items-center">
          <div className="">
            {posts.length > 0 &&
              posts.map((post, index) => {
                return <Post key={index} {...post} />;
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
