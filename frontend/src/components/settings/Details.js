import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'


import Fields from '../auth/Fields'
import Slots from './Slots'
import { EmailPassword } from '../auth/Login'

import fingerprint from '../../images/fingerprint.svg'
import NameAdornment from '../../images/NameAdornment'
import PhoneAdornment from '../../images/PhoneAdornment'


const useStyles = makeStyles(theme => ({
    phoneAdornment: {
        height: 25.122,
        width: 25.173
    },
    visibleIcon: {
        padding: 0
    },
    emailAdornment: {
        height: 17,
        width: 22,
        marginBottom: 10,
    },
    icon: {
        marginBottom: '3rem'
    },
    fieldContainer: {
        marginBottom: "2rem",
        "& > :not(:first-child)": {
            marginLeft: "5rem"
        }
    },
    slotContainer: {
        position: "absolute",
        bottom: 0
    },
    detailsContainer: {
        position: "relative"
    },
    "@global": {
        ".MuiInput-underline:before, .MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderBottom: '2px solid #fff',
        },
        ".MuiInput-underline:after": {
            borderBottom: `2px solid ${theme.palette.secondary.main}`
        },
    },
}))

export default function Details({
    user,
    edit,
    setChangesMade,
    values,
    setValues,
    slot,
    setSlot,
    errors,
    setErrors
}) {

    const classes = useStyles()
    const [visible, setVisible] = useState(false)



    useEffect(() => {
        setValues({ ...user.contactInfo[slot], password: '********' })
    }, [slot])

    useEffect(() => {
        const changed = Object.keys(user.contactInfo[slot]).some(field =>
            values[field] !== user.contactInfo[slot][field])


        setChangesMade(changed)

    }, [values])

    const email_password = EmailPassword(
        false,
        false,
        visible,
        setVisible,
        true
    )
    const name_phone = {
        name: {
            helperText: 'Introduzca su nombre',
            placeholder: 'Nombre',
            startAdornment: <NameAdornment color="#fff" />
        },
        phone: {
            helperText: 'Numero invalido',
            placeholder: 'Telefono',
            startAdornment: (
                <div className={classes.phoneAdornment}>
                    <PhoneAdornment />
                </div>
            )
        },
    }

    const fields = [name_phone, email_password]

    return (
        <Grid
            item
            container
            direction="column"
            xs={6}
            alignItems="center"
            justify="center"
            classes={{ root: classes.detailsContainer }}
        >
            <Grid
                item>
                <img src={fingerprint} alt="details settings" className={classes.icon} />
            </Grid>
            {fields.map((pair, i) => (
                <Grid
                    container
                    justify="center"
                    key={i}
                    classes={{ root: classes.fieldContainer }}
                >
                    <Fields
                        fields={pair}
                        values={values}
                        setValues={setValues}
                        errors={errors}
                        setErrors={setErrors}
                        isWhite
                        disabled={!edit}
                        settings
                    />
                </Grid>
            ))}
            <Grid
                item
                container
                classes={{ root: classes.slotContainer }}
            >
                <Slots slot={slot} setSlot={setSlot} />
            </Grid>
        </Grid>
    )
}