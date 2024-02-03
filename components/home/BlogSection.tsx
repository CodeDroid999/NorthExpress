import Link from 'next/link'
import React from 'react'
import type { Post } from 'lib/sanity.queries'
import Image from 'next/image'
import { urlForImage } from 'lib/sanity.image'

export interface BlogPageProps {
  posts: Post[]
}

export default function BlogSection(posts: BlogPageProps) {
  const blogPosts = posts?.posts

  return (
    <div className="px-3 py-10 sm:px-4 sm:py-16 md:px-9 lg:px-20 xl:px-36 xl:py-28">
      <div className="">
        <div className="mb-10 flex w-full flex-row items-center justify-between">
          <div>
            <h1 className="text-[45px] font-bold leading-[42px] text-green-950 lg:text-[52px] lg:leading-[60px] ">
              Articles, stories and more
            </h1>
          </div>

          <div className="hidden md:block">
            <Link
              href="/blog"
              className="rounded-full bg-green-900 p-4  font-semibold text-white"
            >
              Visit our blog
            </Link>
          </div>
        </div>
        {/**Cards */}
        <div className="mt-5  grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-3 ">
          {blogPosts.slice(0, 3).map((post) => (
            <div
              key={post._id}
              className="flex flex-col rounded-xl border bg-white shadow-sm"
            >
              <Link href={`/blog/posts/${post.slug}`}>
                <Image
                  src={urlForImage(post.coverImage)
                    .height(250)
                    .width(500)
                    .url()}
                  alt={post.title}
                  className="h-[250px] w-full rounded-t-xl"
                  width={500}
                  height={250}
                />
              </Link>

              <div className="p-4 md:p-5">
                <h3 className="text-lg font-bold text-gray-800 ">
                  <Link href={`/blog/posts/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="mt-1 text-gray-800">{post.excerpt}</p>
                <Link
                  href={`/blog/posts/${post.slug}`}
                  className="mt-3 inline-flex items-center justify-center gap-2 text-base font-medium text-blue-800"
                >
                  Read more
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mb-4 mt-10 block max-w-sm rounded-full bg-green-900 px-4 py-3 md:hidden">
          <Link
            href="/blog"
            className="flex w-full justify-center rounded-full  text-lg font-semibold text-white"
          >
            Visit our blog
          </Link>
        </div>
      </div>
    </div>
  )
}
