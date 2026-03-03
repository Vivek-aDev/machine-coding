import React from "react";
import { Post } from "../types";
import Image from "next/image";

interface Props {
  post: Post;
  onLike: (id: string) => void;
}

function PostCard({ post, onLike }: Props) {
  return (
    <div
      style={{
        background: "white",
        padding: 16,
        marginBottom: 20,
        borderRadius: 8,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <h4>{post.author}</h4>

      <div
        style={{
          position: "relative",
          width: "100%",
          height: 300,
        }}
      >
        <Image
          src={post.image}
          alt={post.caption || "Post image"}
          fill
          sizes="(max-width: 768px) 100vw, 600px"
          style={{
            objectFit: "cover",
            borderRadius: 6,
          }}
        />
      </div>

      <p>{post.caption}</p>

      <button
        onClick={() => onLike(post.id)}
        style={{
          padding: "6px 12px",
          cursor: "pointer",
        }}
      >
        {post.isLiked ? "Unlike" : "Like"} ({post.likesCount})
      </button>
    </div>
  );
}

export default React.memo(PostCard);