export interface Post {
    id: string;
    author: string;
    avatar: string;
    image: string;
    caption: string;
    likesCount: number;
    isLiked: boolean;
    createdAt: string;
}

export interface FeedResponse{
    posts: Post[];
    nextCursor: string | null;
}