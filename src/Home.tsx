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
    color: theme.palette.primary.light,
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
    img: 'https://www.kindpng.com/picc/m/3-31921_house-free-content-clip-art-home-clipart-black.png',
    title: 'Home',
    author: 'author',
    url: '/',
  },

  {
    img: 'https://www.eguardtech.com/wp-content/uploads/2018/08/Network-Profile.png',
    title: 'Profile',
    author: 'author',
    url: '/profile',
  },

  {
    img: 'data:image/png;base64,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',
    title: 'Leaderboard',
    author: 'author',
    url: '/leaderboard',
  },

  {
    img: 'data:image/jpeg;base64,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',
    title: 'Coinflip',
    author: 'author',
    url: '/coinflip',
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
          <GridList className={classes.gridList} cols={4}>
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
          Click on the above photos to navigate through the site to see all that we have to offer!
        </Typography>
      </Paper>
    </main>
  );
}
