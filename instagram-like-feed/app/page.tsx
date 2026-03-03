import Link from "next/link";

export default function HomePage(){
  return(
    <div>
      <h1>Machine coding practice</h1>

      <Link href="/feed">
        <button>Go to feed</button>
      </Link>
    </div>
  )
}