import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import useMediaQuery  from '@material-ui/core/useMediaQuery'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'gatsby'

import cta from '../../images/cta.svg'

const useStyles = makeStyles(theme => ({

    account: {
        color: '#FFFFFF',
        marginLeft: "2rem",
    },
    body: {
        maxWidth: '45rem',
        [theme.breakpoints.down('md')]:{
          padding:"0 1rem"
        },
        [theme.breakpoints.down('xs')]:{
            padding:"0"
          },
    },
    container: {
        marginBottom: '15rem'
    },
    buttonContainer: {
        marginTop: '3rem',
    },
    headingContainer:{
        [theme.breakpoints.down('md')]:{
            padding:"0 1rem"
        },
        [theme.breakpoints.down('xs')]:{
            padding:"0"
        },
    },
    icon:{
        [theme.breakpoints.down('xs')]:{
            height:"18rem",
            width:"18rem",
        }
    }
}))

export default function CallToAction() {
    const classes = useStyles()
    const matchesMD = useMediaQuery(theme => theme.breakpoints.down('md'))

    return (
        <Grid container
            justify="space-around"
            alignItems="center"
            classes={{ root: classes.container }}
            direction={matchesMD ? "column" : "row" }
            >
            <Grid item>
                <img src={cta}
                className={classes.icon}
                alt="quality committed " />
            </Grid>
            <Grid item>
                <Grid container direction="column">
                    <Grid item classes={{ root: classes.headingContainer}} >
                        <Typography 
                        align={matchesMD ? "center" : undefined} 
                        variant="h1">
                            Sello de Calidad
                        </Typography>
                    </Grid>
                    <Grid item classes={{ root: classes.body }} >
                        <Typography 
                         align={matchesMD ? "center" : undefined}
                          variant="body1">
                            En Zaramovil nuestra mision es asegurarnos
                            que el movil que compras es durable ,de una
                            calidad premium .Nustro equipo de especialistas
                            se encargan de testear manualmente cada movil.
                        </Typography>
                    </Grid>
                    <Grid item container
                        justify={matchesMD ? "center" : undefined}
                        classes={{ root: classes.buttonContainer }} >
                        <Grid item>
                            <Button
                                component={Link}
                                to="/contact"
                                variant="outlined"
                                color="primary" >
                                Contactar
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                component={Link}
                                to="/account"
                                classes={{ root: classes.account }} >
                                Crear Cuenta
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}