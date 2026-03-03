import { FeedResponse, Post } from "../types"

export async function fetchPosts(cursor: string | null): Promise<FeedResponse> {
    await new Promise((res) => setTimeout(res, 1000))

    const start = cursor ? parseInt(cursor) : 0

    const posts: Post[] = Array.from({ length: 5 }).map((_, i) => ({
        id: `${start + i}`,
        author: `User ${start + i}`,
        avatar: `https://i.pravatar.cc/150?img=${start + i}`,
        image: `https://picsum.photos/500/300?${start + i}`,
        caption: "Sample caption",
        likesCount: Math.floor(Math.random() * 100),
        isLiked: false,
        createdAt: new Date().toISOString(),
    }))

    const nextCursor = start + 5 < 50 ? String(start + 5) : null

    return { posts, nextCursor }
}