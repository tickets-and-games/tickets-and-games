import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Typography, Paper } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import 'fontsource-roboto';
import './Styles.css';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: 'white',
  },
  titleBar: {
    background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  h1: {
    position: 'relative',
    margin: 'auto',
    bottom: '50px',
  },
  paper: {
    background: 'rgb(49, 0, 0)',
    color: 'white',
    width: '100%',
  },
}));

const tileData = [
  {
    img: 'home.png',
    title: 'Home',
    author: 'author',
    url: '/',
  },

  {
    img: 'profile.png',
    title: 'Profile',
    author: 'author',
    url: '/profile',
  },

  {
    img: 'leaderboard.png',
    title: 'Leaderboard',
    author: 'author',
    url: '/leaderboard',
  },

  {
    img: 'coins.jpg',
    title: 'Coinflip',
    author: 'author',
    url: '/coinflip',
  },

  {
    img: 'dice.jpg',
    title: 'Dice',
    author: 'author',
    url: '/dice',
  },

  {
    img: 'cards.png',
    title: 'Blackjack',
    author: 'author',
    url: '/blackjack',
  },

  {
    img: 'skiball.png',
    title: 'Skiball',
    author: 'author',
    url: '/skiball',
  },

];

export default function Home() {
  const classes = useStyles();
  return (
    <main>
      <br />
      <br />
      <section>
        <br />
        <br />
        <Paper
          className={classes.paper}
          style={{
            position: 'relative', bottom: '3vh', textAlign: 'left', padding: '20px',
          }}
          elevation={3}
        >
          <br />
          <Typography variant="h4" className="h1">
            Home
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              variant="h6"
              style={{
                display: 'inline-block', position: 'relative', top: '3vh', bottom: '2vh',
              }}
            >
              Tickets and Games is an exciting online carnival! You can win tickets by
              playing online games such as Blackjack, Coin Flip and Dice Game. Once winning
              the tickets you can spend them on options such as changing username or the color
              of your username. If you are feeling generous you can also send some of your tickets
              to your friends. Finally, to keep things competitive we have leaderboard which ranks
              you based on your winnings!
            </Typography>
            <img src="casino.jpg" alt="casino" style={{ height: '15%', width: '15%', display: 'inline-block' }} />
          </div>
          <br />
        </Paper>
      </section>
      <br />
      <Paper className="gradient-border-home">
        <div className={classes.root}>
          <GridList className={classes.gridList} cols={7}>
            {tileData.map((tile) => (
              <GridListTile key={tile.img} component={RouterLink} to={tile.url}>
                <img src={tile.img} alt={tile.title} />
                <GridListTileBar
                  title={tile.title}
                  classes={{
                    root: classes.titleBar,
                    title: classes.title,
                  }}
                />
              </GridListTile>
            ))}
          </GridList>
        </div>

      </Paper>
      <Paper
        className={classes.paper}
        style={{
          position: 'relative', top: '10vh', textAlign: 'right', display: 'flex', justifyContent: 'space-between', padding: '20px',
        }}
      >
        <img src="friends.gif" alt="casino" style={{ height: '18%', width: '22%' }} />
        <Typography variant="h6">
          To bring you an experience during the times we cannot sadly be together
          to take part in such joy and games, we have brought to you our virtual carnival!
          With all the games and features to take part with friends we have
          set ways for you to take part in the fun! You can even contribute to our work
          thru the payment functionality to gain more tickets and play more games to compete
          with your friends. You can then work your way through the leaderboards and
          customize your profile to your liking.
          Click on the above photos to navigate through the site to see all that we have to offer!
        </Typography>

      </Paper>
      <br />
      <br />
      <br />
      <Paper
        className={classes.paper}
        style={{
          position: 'relative', top: '10vh', textAlign: 'center', padding: '20px',
        }}
      >
        <Typography variant="h4" className="h1">
          About Us
        </Typography>
        <br />
        <Typography variant="h6">
          We are a lot of 4th year CS majors from NJIT, with ambitions like these to create even
          more PC games (not that we play enough). This keeps us busy and engaged as we develop,
          but also as we play our works of art (our definition might differ from
          yours *cough cough*). The opportunity to learn more about our trade
          through such projects and see/interact with our
          outcome is a gratifying experience for all of us. We hope to bring these newfound skills
          and apply them to our work going forward!
        </Typography>

      </Paper>

      <br />
      <br />
      <br />
      <Paper
        className={classes.paper}
        style={{
          position: 'relative', top: '10vh', textAlign: 'center', padding: '20px',
        }}
      >
        <Typography variant="h4" className="h1">
          Technologies
        </Typography>
        <br />
        <Typography variant="h6">
          For this wonderous project we have incoroporated the following
          technologies: React, Flask, Postgresql, HTML, and CSS. In addition
          we have used the following APIs: Random.org, Stripe & Google Oauth.
        </Typography>

      </Paper>
    </main>
  );
}
