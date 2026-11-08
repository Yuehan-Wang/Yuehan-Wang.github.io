import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import { markdownToHtml, isChinese } from '@/lib/markdown';
import styles from '../../styles/article.module.css';

const projectsDirectory = 'content/projects';

export async function getStaticPaths() {
  const filenames = fs.readdirSync(projectsDirectory);
  const paths = filenames.map((filename) => ({
    params: { id: filename.replace(/\.md$/, '') },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(projectsDirectory, `${params.id}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    props: {
      project: {
        title: data.title,
        description: data.description || '',
        imageUrl: data.imageUrl || null,
        lang: isChinese(content) ? 'zh-CN' : 'en',
        contentHtml: await markdownToHtml(content),
      },
    },
  };
}

export default function ProjectPage({ project }) {
  return (
    <article className={styles.article} lang={project.lang}>
      <Head>
        <title>{`${project.title} · Yuehan Wang`}</title>
      </Head>
      <p className={styles.meta}>PROJECT</p>
      <h1 className={styles.title}>{project.title}</h1>
      {project.description && <p className={styles.lead}>{project.description}</p>}
      {project.imageUrl && <img className={styles.hero} src={project.imageUrl} alt="" />}
      <div className={styles.body} dangerouslySetInnerHTML={{ __html: project.contentHtml }} />
    </article>
  );
}
