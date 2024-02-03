import Link from 'next/link'
import { MdArrowForward } from 'react-icons/md'

export default function BlogHeader() {
  return (
    <header className="mb-10 flex flex-row items-center justify-between border  border-x-transparent border-b-gray-200 border-t-transparent bg-white py-2 duration-300 ease-in">
      <h1 className="text-5xl font-bold ">
        <Link href="/blog">Blog</Link>
      </h1>
      <h1 className="text-base text-blue-600 ">
        <Link href="/" className="flex flex-row items-center space-x-4">
          AIRTASKA.COM <MdArrowForward size={22} />
        </Link>
      </h1>
    </header>
  )
}
