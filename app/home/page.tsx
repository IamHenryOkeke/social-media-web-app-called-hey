import type { Metadata } from "next"
import { getPosts, getUserByEmail } from '../lib/data'
import Link from 'next/link'
import Image from 'next/image'
import { auth } from '@/auth'
import { PlusIcon } from '@heroicons/react/24/solid'
import PostCard from './PostCard'


export const metadata: Metadata = {
  title: "Home",
  description: "Generated by create next app",
}

export default async function Home() {
  const user = await auth()
  const userDetail = await getUserByEmail(user?.user?.email)
  console.log(userDetail)
  const posts = await getPosts()
  console.log(posts)
  return (
    <main className='py-3'>
      <nav className='px-4 flex items-center justify-between'>
        <div className='w-10 h-10'>
          {
            user && <Link href={`/profile/${userDetail?.username}`}>
                      <Image src={user?.user?.image} alt='Profile Picture' width={300} height={180} className='w-10 h-10 rounded-full' />
                    </Link>
          }
        </div>
        <h3 className='font-bold text-lg'>
          Posts
        </h3>
        <Link href='/create-post'>
          <PlusIcon title='Create post' className='text-white size-7 font-bold' />
        </Link>
      </nav>
      {
        posts ? <div className='my-5 border-y-2 border-gray-600 divide-y-2 divide-gray-600'>
          {
            posts?.map((post) => (
              <PostCard key={post.id} ifLiked={post?.likes.find((like) => like.userId === user?.user?.id)} id={post.id} name={post.author.name} user={!!user} content={post.content} image={post.author.image} username={post.author.username} />
            ))
          }
        </div> : <p>Unable to fetch post. Please refresh page</p>
      }

    </main>
  )
}