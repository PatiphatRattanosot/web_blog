import React from 'react'
const baseUrl = import.meta.env.VITE_BASE_URL
function Post({ title, author, summary, cover, createdAt, _id }) {
    return (
        <div className='card card-side bg-base-100 shadow-xl'>
            <figure className='md:1/2 flex item-center justify-center'>
                <a href={`/post/${_id}`} className='href'>
                    <img src={`${baseUrl}/${cover}`} alt={title} />
                </a>
            </figure>
            <div className="p-6 md:1/2 flex flex-col justify-between card-body">
                <a href={`/post/${_id}`} className='href'>
                    <h2 className="card-titel">{title}</h2>
                </a>
                <p>{author.username}---{createdAt}</p>
                <p>{summary}</p>
            </div>
        </div>
    )
}

export default Post
