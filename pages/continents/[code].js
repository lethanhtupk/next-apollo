import Continent from '../../src/components/Countinent';
import { getContinents } from '../../src/schema/query/continent';

export default function ContinentDetail({ continentCode }) {
  return (
    <div>
      <h1>Continent status</h1>
      <Continent continentCode={continentCode} />
    </div>
  );
}

export async function getStaticProps(context) {
  const continentCode = context.params.code;

  console.log(continentCode);

  return {
    props: {
      continentCode: continentCode,
    },
  };
}

export async function getStaticPaths() {
  const result = await getContinents();

  const paths = [];
  for (const continent of result) {
    paths.push({ params: { code: continent.code } });
  }

  return {
    paths: paths,
    fallback: false,
  };
}
