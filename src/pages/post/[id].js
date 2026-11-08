import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import { markdownToHtml, isChinese } from '@/lib/markdown';
import styles from '../../styles/article.module.css';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export default function Post({ postData }) {
  return (
    <article className={styles.article} lang={postData.lang}>
      <Head>
        <title>{`${postData.title} · Yuehan Wang`}</title>
      </Head>
      {postData.date && <p className={styles.meta}>{postData.date}</p>}
      <div className={styles.body} dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </article>
  );
}

export async function getStaticPaths() {
  const filenames = fs.readdirSync(postsDirectory);
  const paths = filenames.map((filename) => ({
    params: { id: filename.replace(/\.md$/, '') },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(postsDirectory, `${params.id}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    props: {
      postData: {
        title: data.title,
        date: data.date ? String(data.date) : null,
        lang: isChinese(data.title) ? 'zh-CN' : 'en',
        contentHtml: await markdownToHtml(content),
      },
    },
  };
}
