"use client";

import { useFeed } from "@/features/feed/hooks/useFeed";
import PostCard from "@/features/feed/components/PostCard";
import { Post } from "@/features/feed/types";

interface Props {
  initialPosts: Post[];
  initialCursor: string | null;
}

export default function FeedClient({
  initialPosts,
  initialCursor,
}: Props) {
  const {
    posts,
    loading,
    fetchNextPage,
    toggleLike,
    hasMore,
  } = useFeed(initialPosts, initialCursor);

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "40px auto",
        padding: 20,
      }}
    >
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onLike={toggleLike}
        />
      ))}

      {loading && <p>Loading...</p>}

      {hasMore && !loading && (
        <button
          onClick={fetchNextPage}
          style={{ padding: 10, width: "100%" }}
        >
          Load More
        </button>
      )}
    </div>
  );
}