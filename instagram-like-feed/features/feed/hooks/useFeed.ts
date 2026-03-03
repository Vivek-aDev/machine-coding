import { useCallback, useState } from "react"
import { Post } from "../types"
import { fetchPosts } from "../api/feedApi"



export function useFeed(initialPosts: Post[], initialCursor: string | null) {
    const [posts, setPosts] = useState<Post[]>(initialPosts)
    const [cursor, setCursor] = useState<string | null>(initialCursor)
    const [loading, setLoading] = useState(false)

    const fetchNextPage = useCallback(async () => {
        if(!cursor || loading) return 

        setLoading(true)
        const response = await fetchPosts(cursor)

        setPosts((prev)=> [...prev, ...response.posts])
        setCursor(response.nextCursor)
        setLoading(false)
    }, [cursor, loading ])

    const toggleLike = (id: string) => {
        setPosts((prev) =>
          prev.map((post) =>
            post.id === id
              ? {
                  ...post,
                  isLiked: !post.isLiked,
                  likesCount: post.isLiked
                    ? post.likesCount - 1
                    : post.likesCount + 1,
                }
              : post
          )
        );
      };

    return { posts, loading, fetchNextPage, toggleLike, hasMore: cursor !== null }
}