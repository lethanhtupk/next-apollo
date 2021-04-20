import { gql, useQuery } from '@apollo/client';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Link from 'next/link';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 18,
  },
  pos: {
    marginBottom: 12,
    fontSize: 12,
  },
});

const GET_CONTINENTS = gql`
  query getContinents {
    continents {
      code
      name
    }
  }
`;

export default function Cache() {
  const classes = useStyles();

  const { loading, error, data } = useQuery(GET_CONTINENTS);

  if (error) {
    return <div>Error while loading continents data</div>;
  }
  if (loading) {
    return <div>Loading</div>;
  }

  const { continents: continents } = data;

  return (
    <div style={{ marginLeft: 20 }}>
      <p>
        You can change the fetch Policy of Nextjs by specify fetchPolicy. more detail in here:{' '}
        <a href='https://www.apollographql.com/docs/react/data/queries/'>Queries-Client (Apollo)</a>
      </p>
      <p>
        Apollo storage the result of date fetching into the cache locally. To update cache data, we have 2 strategies
      </p>
      <ul>
        <Link href={`/cache/polling/`}>
          <a>
            <li>Polling</li>
          </a>
        </Link>
        <Link href={`/cache/refetching`}>
          <a>
            <li>Refetching</li>
          </a>
        </Link>
      </ul>
      <h1>Click on link above to see the demonstrate for each method</h1>
      <p>
        For default, when Nextjs see a request, firstly, it'll check if the data you requested is already available
        locally. If all data is <i>available</i>, then useQuery return that date without calling to the GraphQl server
      </p>
      <p>
        To inspect the default behaviour, You can open Network tab, click on the list countries of whatever continent,
        then back to the previous page, you can realize that Nextjs using data from cache, so there isn't a call to API
      </p>
      <Grid style={{ marginTop: '20px' }} container spacing={2}>
        {continents.map(({ code, name }) => (
          <Grid item xs={3} key={code}>
            <Card className={classes.root}>
              <CardContent>
                <Typography className={classes.pos} color='textSecondary'>
                  {code}
                </Typography>
                <Typography className={classes.title} color='textPrimary' gutterBottom>
                  {name}
                </Typography>
              </CardContent>
              <Button color='primary' variant='contained'>
                <Link href={`/continents/${code}`}>List Countries</Link>
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
