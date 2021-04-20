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
        You can custom the header of request that being send to GraphQl server:{' '}
        <a href='https://www.apollographql.com/docs/react/networking/advanced-http-networking/'>Apollo Networking</a>
      </p>
      <p>Usually for attach authorization information into header</p>
      <p>
        For this example, I have added custom field into the header before sending the request to GraphQl server. To see
        it, open network tab, then click the request that being sent to graphql server and look at the request header
        section
      </p>
      <p>
        Did you see the <i>header-field</i> with the value <i>this is value of custom header field?</i>
      </p>
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
    </div>
  );
}
