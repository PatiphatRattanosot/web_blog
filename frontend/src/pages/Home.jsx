import React, { useEffect, useState } from 'react'
import PostsServices from '../services/posts.service'

function Home() {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await PostsServices.getAllPosts()
      
    }
  }, [])

  return (
    <>
      <div className="flex flex-col space-y-6">
        { }
      </div>
    </>
  )
}

export default Home