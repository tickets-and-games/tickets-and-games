import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Typography, Paper } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import 'fontsource-roboto';

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
    backgroundColo: 'black',
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
    flexGrow: 1,
    backgroundColor: '#f7cea2',
    borderStyle: 'solid',
    borderWidth: '3px',
    width: '70%',
    textAlign: 'center',
    margin: 'auto',
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
        <Paper className={classes.paper} style={{ position: 'relative', bottom: '20px' }} elevation={3}>
          <br />
          <Typography variant="h3" className="h1" style={{ position: 'relative', bottom: '10px' }}>
            Home
          </Typography>
          <br />
          <Typography variant="body1">
            Tickets and Games is an exciting online carnival! You can win tickets by
            playing online games such as Blackjack, Coin Flip and Dice Game. Once winning
            the tickets you can spend them on options such as changing username or the color
            of your username. If you are feeling generous you can also send some of your tickets
            to your friends. Finally, to keep things competitive we have leaderboard which ranks
            you based on your winnings!
          </Typography>
          <br />
        </Paper>
      </section>
      <br />
      <Paper className={classes.paper}>
        <div className={classes.root}>
          <GridList className={classes.gridList} cols={6}>
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
      <Paper className={classes.paper} style={{ position: 'relative', top: '50px' }}>
        <Typography variant="body1">
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
    </main>
  );
}
