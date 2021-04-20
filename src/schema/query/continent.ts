import { gql, initializeApollo } from '../../utils/apollo';

export const CONTINENT_QUERY = gql`
  query getContinent($code: ID!) {
    continent(code: $code) {
      code
      name
      countries {
        code
        name
        emoji
      }
    }
  }
`;

export const CONTINENTS_QUERY = gql`
  query getContinents {
    continents {
      code
      name
    }
  }
`;

export async function getContinents() {
  const result = await initializeApollo().query({
    query: CONTINENTS_QUERY,
  });

  return result?.data.continents;
}

export async function getContinent(continentCode: String) {
  const result = await initializeApollo().query({
    query: CONTINENT_QUERY,
    variables: { continentCode },
  });
}
