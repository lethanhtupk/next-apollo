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

export default function ContinentsList() {
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
    <Grid style={{ marginTop: '20px' }} container spacing={2}>
      {continents.map(({ code, name }: { code: string; name: string }) => (
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
  );
}
