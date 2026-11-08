import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '@/styles/Header.module.css';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/project', label: 'Project' },
  { href: '/post', label: 'Post' },
];

export default function Header() {
  const { pathname } = useRouter();
  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.title}>Yuehan{'\'s'} Blog</Link>
        <nav>
          <ul className={styles.navList}>
            {NAV.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={isActive(href) ? `${styles.navItem} ${styles.active}` : styles.navItem}
                  aria-current={isActive(href) ? 'page' : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
