import React from "react";
import { Container, Typography, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6)
    }
  }
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="md" component="footer" className={classes.footer}>
      <Typography variant="subtitle2" color="textPrimary" gutterBottom align="right">
        react reddit 2019 ©
      </Typography>
    </Container>
  );
};

export default Footer;
