// import Head from 'next/head';
// import styles from '../styles/Home.module.css';
import ContinentsList from '../src/components/continentsList';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Continents Dashboard</h1>
      <ContinentsList />
      <div style={{ marginLeft: 30 }}>
        <Link href='/cache'>
          <h1>
            <a>Detail about caching in Nextjs</a>
          </h1>
        </Link>
        <Link href='/useQueryLazy'>
          <h1>
            <a>useQueryLazy</a>
          </h1>
        </Link>
      </div>
    </div>
  );
}
