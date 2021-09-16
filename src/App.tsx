import logo from './logo.svg';
import './App.css';
import Page from './components/page'
import { Card, CardContent, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import WebSocketProvider from './components/websocketprovider';
import WebSocketList from './components/websocketlist';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

function App() {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container alignItems='center' justifyContent='center'>
        <Grid item>
          <Card>
            <CardContent>
              <WebSocketProvider>
                <WebSocketList></WebSocketList>
              </WebSocketProvider>
              <Page>
                <Typography>
                  Cool Guy
                </Typography>
              </Page>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
