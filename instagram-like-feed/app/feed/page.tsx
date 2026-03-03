import { fetchPosts } from "@/features/feed/api/feedApi";
import FeedClient from "./FeedClient";

export default async function FeedPage() {
    const initialData = await fetchPosts(null)
  return (
    <FeedClient
      initialPosts={initialData.posts}
      initialCursor={initialData.nextCursor}
    />
  );
}
