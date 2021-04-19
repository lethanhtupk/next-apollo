// import Head from 'next/head';
// import styles from '../styles/Home.module.css';
import ContinentsList from '../src/components/continentsList';
// import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Continents Dashboard</h1>
      <ContinentsList />
    </div>
  );
}
