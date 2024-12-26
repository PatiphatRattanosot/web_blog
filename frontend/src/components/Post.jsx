import React from "react";
import { format } from "date-fns";

const baseUrl = import.meta.env.VITE_BASE_URL;

function Post({ title, author, summary, cover, createdAt, _id }) {
  return (
    <div className="card card-side bg-base-100 shadow-xl flex-row">
      <figure className="w-1/3">
        <a href={`/post/${_id}`} className="block">
          <img
            src={`${baseUrl}/${cover}`}
            alt={title}
            className="object-cover w-full h-full"
          />
        </a>
      </figure>
      <div className="card-body w-2/3">
        <a href={`/post/${_id}`} className="hover:text-primary">
          <h2 className="card-title">{title}</h2>
        </a>
        <p className="text-sm text-gray-500">
          {author.username} — {format(new Date(createdAt), "dd MMMM yyyy HH:mm")}
        </p>
        <p className="mt-2">{summary}</p>
        <div className="card-actions justify-end">
          <a href={`/post/${_id}`} className="btn btn-primary btn-sm">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
}

export default Post;
