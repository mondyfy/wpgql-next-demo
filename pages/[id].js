import styles from '../styles/Home.module.css';
import Head from "next/head";

import {getSinglePost} from "../pages/api/api";

export async function getServerSideProps(ctx){
    let {id} = ctx.params;
    let post = await getSinglePost(id);
    
    return {
        props:{
            post
        }
    }
}

export default function Post({post}) {
    return (
        <div className={styles.container}>
            <Head>
                <title>{post.title}</title>
            </Head>
            <main>  
                <h3> {post.title}</h3>              
                <div dangerouslySetInnerHTML={{__html:post.content}} />
            </main>

        </div>
    )
}


