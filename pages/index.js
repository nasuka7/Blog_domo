import Head from 'next/head';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { getAllPosts } from '../lib/data';

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="space-y-4">
        {posts.map((item) => (
          <BlogListItem key={item.slug} {...item} />
        ))}
      </div>
    </div>
  )
}

export async function getStaticProps(context) {
  const allPosts = getAllPosts();
  return {
    props: {
      posts: allPosts.map(({ data, content, slug }) => ({
        ...data,
        date: data.date.toISOString(),
        content,
        slug
      })),
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: getAllPosts().map((post) => ({
      params: {
        slug: post.slug,
      }
    })),
    fallback: false,
  }
}

function BlogListItem({ slug, title, date, content }) {
  return (
    <div className="border boder-blue-300 shadow hover:shadow-md hover:border-black-200 rounded-md p-4 transion duration-500 ease-in-out">
      <div>
        <div>
          <Link href={`/blog/${slug}`}>
            <a className="font-boid">{title}</a>
          </Link>
        </div>
        <div className="text-sm">
          {format(parseISO(date), 'MMMM do, uuu' )}
        </div>
        <div>{content.substr(0,50)}</div>
      </div>
    </div>
  )
}
