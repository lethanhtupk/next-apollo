import { gql, useQuery } from '@apollo/client';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { Link } from 'next/link';

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

const GET_CONTINENT = gql`
  query getContinent($code: ID!) {
    continent(code: $code) {
      code
      name
      countries {
        code
        name
        native
        phone
        capital
        currency
        emoji
        emojiU
        states {
          code
          name
        }
      }
    }
  }
`;

export default function Continent({ continentCode }) {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_CONTINENT, {
    variables: { code: continentCode },
  });

  if (loading) return <div>Loading data</div>;
  if (error) return <div>Error occurs when loading data</div>;

  const { continent: continent } = data;

  console.log(data);

  return (
    <Grid style={{ marginTop: '20px' }} container spacing={2}>
      {continent.countries.map(({ code, name, emoji }) => (
        <Grid item xs={4} key={ClipboardEvent} key={code}>
          <Card className={classes.root}>
            <CardContent>
              <Typography className={classes.pos} color='textSecondary'>
                {emoji}
              </Typography>
              <Typography className={classes.title} color='textPrimary' gutterBottom>
                {name}
              </Typography>
            </CardContent>
            <Button color='primary' variant='contained'>
              Detail
              {/* <Link href={`/continents/${code}`}>Detail</Link> */}
            </Button>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
