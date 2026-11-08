import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import styles from '../../styles/projectpage.module.css';

const projectsDirectory = 'content/projects'

export async function getStaticProps() {
    const filenames = fs.readdirSync(projectsDirectory);
    const projects = filenames.map((filename) => {
        const filePath = path.join(projectsDirectory, filename);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContents);

        return {
            id: filename.replace(/\.md$/, ''),
            ...data,
        };
    });

    const visibleProjects = projects.filter(project => project.visible !== false);
    
    visibleProjects.sort((a, b) => new Date(b.date) - new Date(a.date));

    return {
        props: { projects: visibleProjects },
    };
}

export default function ProjectsPage({ projects }) {
    return (
      <div className={styles.projectsPage}>
        {projects.map((project) => (
          <div key={project.id} className={styles.projectCard}>
            <Link href={`/project/${project.id}`} className={styles.cardLink}>

                <h2>{project.title}</h2>
                <div className={styles.imgContainer}>
                  <img src={project.imageUrl} alt={project.title} />
                </div>
                
                <p>{project.description}</p>
            </Link>
          </div>
        ))}
      </div>
    );
  }