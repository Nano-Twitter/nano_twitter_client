import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider/Divider';
import { unstable_Box as Box } from '@material-ui/core/Box';
import styled from '@material-ui/styles/styled';
import Header from '../../components/tweeper/Header';
import Tweet from '../../components/tweeper/Tweet';
import TrackWho from '../../components/tweeper/TrackWho';
import PopularNow from '../../components/tweeper/PopularNow';
import AccordingWhom from '../../components/tweeper/AccordingWhom';
import ProfileHead from '../../components/tweeper/ProfileHead';
import theme from '../../theme/tweeper/theme';
import withTheme from './withTheme';
// import atoms from '../../components/atoms';
import molecules from '../../components/molecules';

const { Tabs, Tab } = molecules;

const Content = styled('div')({
  maxWidth: 1000,
  padding: theme.spacing.unit * 4,
  margin: 'auto',
});

const Feed = styled('div')({
  backgroundColor: '#fff',
});

const Cover = styled('div')({
  height: 200,
  backgroundColor: '#ccd6dd',
});

function Profile() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <Content>
        <Grid container spacing={16}>
          <Grid item xs={12} md={8}>
            <Feed>
              <Cover />
              <ProfileHead />
              <Tabs value={0} variant="fullWidth">
                <Tab label="Tweet" />
                <Tab label="Tweets and Responses" />
                <Tab label="Media" />
                <Tab label="liking" />
              </Tabs>
              <Divider />
              <Tweet />
            </Feed>
            <Box mt="10px">
              <AccordingWhom />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box mb="10px">
              <TrackWho />
            </Box>
            <PopularNow />
          </Grid>
        </Grid>
      </Content>
    </React.Fragment>
  );
}

export default withTheme(theme)(Profile);
