import React, { useState } from 'react';
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import Fields from '../auth/Fields';
import { EmailPassword } from '../auth/Login';

const useStyles = makeStyles(theme => ({
    title: {
        color: theme.palette.error.main
    },
    button: {
        fontFamily: 'Montserrat'
    }
}))

export default function Confirmation({ dialogOpen, setDialogOpen, user, dispatchFeedback, setSnackbar }) {

    const classes = useStyles()
    const [values, setValues] = useState({ password: "", confirmation: "" })
    const [errors, setErrors] = useState({})
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    const { password } = EmailPassword(false, false, visible, setVisible)

    const fields = {
        password: { ...password, placeholder: 'Contraseña Antigua' },
        confirmation: { ...password, placeholder: 'Nueva Contraseña' }
    }

    const disabled = Object.keys(errors).some(error => errors[error] === true)
        || Object.keys(errors).length !== Object.keys(values).length

    const handeleConfirm = () => {
        setLoading(true)

        axios.post(process.env.GATSBY_STRAPI_URL + "/auth/local", {
            identifier: user.email,
            password: values.password
        }).then(response => {
            axios.post(process.env.GATSBY_STRAPI_URL + "/user-permissions/change-password", {
                password: values.confirmation
            }, { headers: { Authorizacion: `Bearer ${user.jwt} ` } }).then(response => {
                setLoading(false)
                setDialogOpen(false)
                dispatchFeedback(setSnackbar({ status: "success", message: "Contraseña cambiada con exito" }))
                setValues({ password: "", confirmation: "" })
            }).catch(error => {
                setLoading(false)
                console.error(error)
                dispatchFeedback(setSnackbar({ status: "error", message: "Hay un problema para cambiar su contraseña.Por favor intenta de nuevo" }))
            })
        }).catch(error => {
            setLoading(false)
            console.error(error)
            dispatchFeedback(setSnackbar({ status: 'error', message: 'Contraseña Antigua Invalida' }))
        })
    }

    const handleCancel = () => {
        setDialogOpen(false)
        dispatchFeedback(
            setSnackbar({ status: "error", message: "La contraseña NO se ha cambiado " }))
    }

    return (
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
            <DialogTitle disableTypography >
                <Typography variant='h3' classes={{ root: classes.title }}>
                    Cambiar Contraseña
                </Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Estas cambiando la contraseña de tu cuenta.Confirma la contrasena anterior y la nueva contraseña
                </DialogContentText>
                <Fields
                    fields={fields}
                    values={values}
                    setValues={setValues}
                    errors={errors}
                    setErrors={setErrors}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleCancel}
                    disabled={loading}
                    color='primary'
                    classes={{ root: classes.button }} >
                    No cambies la contraseña
                </Button>
                <Button
                    onClick={handeleConfirm}
                    disabled={loading || disabled}
                    color='secondary'
                    classes={{ root: classes.button }} >
                    {loading ? <CircularProgress /> : "Si, Cambia mi contraseña"}
                </Button>
            </DialogActions>
        </Dialog>
    )
}