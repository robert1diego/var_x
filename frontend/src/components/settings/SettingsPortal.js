import React, { useContext, useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid'
import clsx from 'clsx'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { useSpring, useSprings, animated } from 'react-spring'
import useResizeAware from 'react-resize-aware'

import Settings from './Settings'
import { UserContext } from '../../contexts'
import {setUser} from '../../contexts/actions'

import accountIcon from '../../images/account.svg'
import settingsIcon from '../../images/settings.svg'
import orderHistoryIcon from '../../images/order-history.svg'
import favoritesIcon from '../../images/favorite.svg'
import subscriptionIcon from '../../images/subscription.svg'
import background from '../../images/repeating-smallest.svg'


const useStyles = makeStyles(theme => ({
    name: {
        color: theme.palette.secondary.main
    },
    dashboard: {
        width: '100%',
        minHeight: '30rem',
        height: 'auto',
        backgroundImage: `url(${background})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
        borderTop: ({showComponent}) =>
        `${showComponent ? 0 : 0.5}rem solid ${theme.palette.primary.main}`,
        borderBottom: ({showComponent}) => 
        `${showComponent ? 0 : 0.5}rem solid ${theme.palette.primary.main}`,
        margin: '5rem 0'
    },
    icon: {
        height: '12rem',
        width: '12rem',
    },
    button: {
        backgroundColor: theme.palette.primary.main
    },
    addHover:{
        "&:hover":{
            cursor: 'pointer',
            backgroundColor: theme.palette.secondary.main,
        }
    },
    logout:{
        color:theme.pallete.error.main
    }
}))

const AnimatedButton = animated(Button)
const AnimatedGrid = animated(Grid)

export default function SettingsPortal() {
    const { user,dispatchUser,defaultUser } = useContext(UserContext)
    const [selectedSetting, setSelectedSetting] = useState(null)
    const [resizeListener, sizes] = useResizeAware()
    const [showComponent, setShowComponent] = useState(false)
    const classes = useStyles({showComponent})

    const buttons = [
        { label: 'Settings', icon: settingsIcon, component: Settings },
        { label: 'Order History', icon: orderHistoryIcon },
        { label: 'Favorites', icon: favoritesIcon },
        { label: 'Subscriptions', icon: subscriptionIcon },
    ]

    const handleClick = setting => {
        if (selectedSetting === setting) {
            setSelectedSetting(null)
        } else {
            setSelectedSetting(setting)
        }
    }

    const springs = useSprings(buttons.length, buttons.map(button => ({
        to: async (next, cancel) => {
            const scale = {
                transform: selectedSetting === button.label || selectedSetting === null ?
                    "scale(1)" : "scale(0)",
                delay: selectedSetting === null ? 0 : 600
            }
            const size = {
                height: selectedSetting === button.label ? "60rem" : "22rem",
                width: selectedSetting === button.label ? `${sizes.width}px` : "352px",
                borderRadius: selectedSetting === button.label ? 0 : 25,
                delay: selectedSetting === null ? 600 : 0
            }

            const hide = {
                display: selectedSetting === button.label || selectedSetting === null
                    ? "flex" : "none",
                delay: 150,
            }

            await next(selectedSetting !== null ? scale : size)
            await next(hide)
            await next(selectedSetting !== null ? size : scale)
        },

    })))

    const styles = useSpring({
        opacity: selectedSetting === null
            || showComponent ? 1 : 0,
        delay: selectedSetting === null
            || showComponent ? 0 : 1350
    })

    const handleLogout = () => {
        dispatchUser(setUser({defaultUser}))
    }

    useEffect(() => {
        if (selectedSetting === null) {
            setShowComponent(false)
            return
        }
        const timer = setTimeout(() => setShowComponent(), 2000)
        return () => clearTimeout(timer)
    }, [selectedSetting])

    return (
        <Grid container direction="column" alignItems="center">
            {resizeListener}
            <Grid item>
                <img src={accountIcon} alt="setting page" />
            </Grid>
            <Grid item>
                <Typography variant="h4" classes={{ root: classes.name }} >
                    Bienvenido,{user.username}
                </Typography>
            </Grid>
            <Grid item>
                <Button onClick={handleLogout} >
                    <Typography variant="h5" classes={{ root: classes.logout }} >
                      logout
                    </Typography>
                </Button>
            </Grid>
            <Grid
                item
                container
                classes={{ root: classes.dashboard }}
                alignItems="center"
                justify="space-around"
            >
                {springs.map((prop, i) => {

                    const button = buttons[i]

                    return (
                            <AnimatedGrid
                                item
                                key={i}
                                onClick={() => showComponent ? null :
                                     handleClick(button.label)}
                                style={prop}
                                classes={{root:clsx(classes.button, {
                                    [classes.addHover]: !showComponent,
                                })}}
                            >
                                <AnimatedGrid
                                    style={styles}
                                    container direction="column"
                                    alignItems="center"
                                    justify="center"
                                    >
                                    {selectedSetting === button.label && showComponent ? (
                                        <button.component setSelectedSetting={setSelectedSetting} />
                                    ) : (
                                        <>
                                            <Grid item>
                                                <img src={button.icon}
                                                    alt={button.label}
                                                    className={classes.icon}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="h5">
                                                    {button.label}
                                                </Typography>
                                            </Grid>
                                        </>
                                    )}
                                </AnimatedGrid>
                            </AnimatedGrid>
                    )
                })}
            </Grid>
        </Grid>
    )
} 