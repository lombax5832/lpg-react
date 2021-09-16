import logo from './logo.svg';
import './App.css';
import Page from './components/page'
import { Card, CardContent, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import WebSocketProvider from './components/websocketprovider';
import WebSocketList from './components/websocketlist';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(5),
      width: theme.spacing(200),
      height: theme.spacing(16),
    },
  },
}));

function App() {

  const classes = useStyles();

  return (
    <div className={classes.root} style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Grid container alignItems='center' justifyContent='center'>
        <Grid item>
          <Card style={{ maxHeight: 500, overflow: 'auto' }}>
            <CardContent>
              <WebSocketProvider>
                <WebSocketList></WebSocketList>
              </WebSocketProvider>
              <Page>
                <Typography>
                  Toggled Thing
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
