import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

import { getPosts } from "../pages/api/api";

export async function getServerSideProps(ctx){
  let posts = await getPosts();
  return {
    props:{
      posts
    }
  }
}

export default function Home({posts}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>WPGraphQL NEXT Demo</title>
        <meta name="description" content="CMS Wordpress with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Posts </h1>
      {
        posts.map((post,index) => (
          <div key={index}>

            <Link href={`/${post.node?.id}`}>
            <a style={{color:'blue'}}>{post.node.title}</a>
            </Link>
            
            <div dangerouslySetInnerHTML={{__html:post.node.excerpt}} />

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
