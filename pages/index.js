import Head from 'next/head'
import Link from 'next/link'

import styles from '../styles/Home.module.css'
import { getPosts } from "../pages/api/api";

export async function getServerSideProps(ctx) {
  let posts = await getPosts();
  return {
    props: {
      posts
    }
  }
}

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>WPGraphQL NEXT Demo</title>
        <meta name="description" content="CMS WordPress with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <header>
          <h1>Posts</h1>
        </header>
        {
          posts.map((post, index) => (
            <div key={index}>

              <Link href={`/${post.node?.id}`}>
                <b><a style={{ color: 'blue' }}>{post.node.title}</a></b>
              </Link>

              <div dangerouslySetInnerHTML={{ __html: post.node.excerpt }} />

              <p>By {post.node.author.node.name}</p>
            </div>
          ))
        }
      </main>

      <footer className={styles.footer}>
        <p>Posts</p>
      </footer>
    </div>
  )
}
