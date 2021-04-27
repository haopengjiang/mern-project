import React from "react";
import { Grid, AppBar,Container,Toolbar,Typography} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import EmailIcon from '@material-ui/icons/Email';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import useStyles from './styles';

export default function Footer() {
	const classes = useStyles();

    return (
        <AppBar className={classes.appBar} position="static" color="primary">
          <Container className={classes.brandContainer}>
            <Toolbar className={classes.toolbar}>
              <Typography className={classes.copyRight} variant="body1" color="inherit">
                © 2021 Haopeng Jiang.  All rights reserved.
              </Typography>
            </Toolbar>
                <Grid container className={classes.root}>
                <IconButton color= "inherit" onClick={() => window.open('https://www.Linkedin.com')}>
				  <LinkedInIcon className="fa fa-linkedIn"/>
				</IconButton>
				<IconButton color= "inherit" onClick={() => window.open('https://www.github.com')}>
				  <GitHubIcon className="fa fa-github"></GitHubIcon>
				</IconButton>
				<IconButton color= "inherit" onClick={() => window.open('https://www.gmail.com')}>
				  <EmailIcon className="fa fa-email"></EmailIcon>
				</IconButton>
      			</Grid>
          </Container>
        </AppBar>
    )
}