import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import IconButton from "@material-ui/core/IconButton"
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'gatsby'

import facebook from '../../images/facebook.svg'
import twitter from '../../images/twitter.svg'
import instagram from '../../images/instagram.svg'

const useStyles = makeStyles(theme => ({
    footer: {
        backgroundColor: theme.palette.primary.main,
        padding: "2rem",
    },

    link: {
        color: '#fff',
        fontSize: '1.25rem',
    },

    linkColumn: {
        width: "20rem",
    },

    linkContainer: {
        [theme.breakpoints.down('md')]: {
            marginBottom: '3rem'
        }
    },

    icon: {
        "&:hover": {
            backgroundColor: 'transparent'
        }
    },

    "@global": {
        body: {
            margin: 0
        },
        a: {
            textDecoration: "none",
        },
    },

}))

export default function Footer() {
    const classes = useStyles()

    const socialMedia = [
        { icon: facebook, alt: 'facebook', link: 'https://facebook.com' },
        { icon: twitter, alt: 'twitter', link: 'https://twitter.com' },
        { icon: instagram, alt: 'instagram', link: 'https://instagram.com' },
    ]

    const routes = {
        "Atencion al Cliente": [
            { label: 'Formulario de Contacto', link: '/contact' },
            { label: 'Mi Cuenta', link: '/account' }],
        "Informacion": [
            { label: 'Politica de Privacidad', link: '/privacy-policy' },
            { label: 'Terminos y Condiciones', link: '/terms-conditions' }],
        "Contacto": [
            { label: "+34 643 977 739", href: 'tel: +34 643 977 739' },
            { label: 'thephoneparadisesl@gmail.com', href: 'mailto:thephoneparadisesl@gmail.com' }],
    }

    return (

        <footer className={classes.footer} >
            <Grid container justify="space-between">
                {/*  links */}
                <Grid item classes={{ root: classes.linkContainer }} >
                    <Grid container>
                        {Object.keys(routes).map(category => (
                            <Grid
                                item
                                key={category}
                                container
                                direction="column"
                                classes={{ root: classes.linkColumn }} >

                                <Grid item>
                                    <Typography variant="h5">
                                        {category}
                                    </Typography>
                                </Grid>

                                {routes[category].map(route => (
                                    <Grid item key={route.label} >
                                        <Typography
                                            component={route.link ? Link : "a"}
                                            to={route.link ? route.link : undefined}
                                            href={route.href ? route.href : undefined}
                                            variant="body1" classes={{ body1: classes.link }} >
                                            {route.label}
                                        </Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                {/* //social media */}
                <Grid item>
                    <Grid container direction="flex" alignItems="center" >
                        {socialMedia.map(platform => (
                            <Grid item key={platform.alt}>
                                <IconButton
                                    classes={{ root: classes.icon }}
                                    component="a"
                                    disableRipple
                                    href={platform.link}
                                >
                                    <img src={platform.icon}
                                        alt="patform.alt" />
                                </IconButton>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </footer>
    )
}
