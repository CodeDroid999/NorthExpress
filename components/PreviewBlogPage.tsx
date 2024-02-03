import BlogPage, { type BlogPageProps } from 'components/BlogPage'
import {
  indexQuery,
  type Post,
  type Settings,
  settingsQuery,
} from 'lib/sanity.queries'
import { useLiveQuery } from 'next-sanity/preview'

export default function PreviewBlogPage(props: BlogPageProps) {
  const [posts, loadingPosts] = useLiveQuery<Post[]>(props.posts, indexQuery)
  const [settings, loadingSettings] = useLiveQuery<Settings>(
    props.settings,
    settingsQuery
  )

  return (
    <BlogPage
      preview
      loading={loadingPosts || loadingSettings}
      posts={posts || []}
      settings={settings || {}}
    />
  )
}
