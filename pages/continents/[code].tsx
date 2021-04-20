import Continent from '../../src/components/Countinent';
import { getContinents } from '../../src/schema/query/continent';
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';

export default function ContinentDetail({ continentCode }) {
  return (
    <div>
      <h1>Continent status</h1>
      <Continent continentCode={continentCode} />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const continentCode = context.params.code;

  return {
    props: {
      continentCode: continentCode,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await getContinents();

  const paths = [];
  for (const continent of result) {
    paths.push({ params: { code: continent.code } });
  }

  return {
    paths: paths,
    fallback: false,
  };
};
