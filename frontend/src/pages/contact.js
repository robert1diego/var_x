import React, { useState } from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from "@material-ui/core/Button"
import useMediaQuery from '@material-ui/core/useMediaQuery'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from "gatsby"

import address from '../images/address.svg'
import phone from '../images/phone-adornment.svg'
import emailAdornment from '../images/email-adornment.svg'
import Email from '../images/EmailAdornment'
import send from '../images/send.svg'
import nameAdornment from '../images/name-adornment.svg'


import Layout from "../components/ui/layout"
import validate from "../components/ui/validate"


const useStyles = makeStyles(theme => ({
  mainContainer: {
    height: '45rem',
    backgroundColor: theme.palette.primary.main,
    marginBottom: '10rem',
    [theme.breakpoints.down('md')]: {
      marginTop: '8rem',
      height: '90rem'
    }
  },
  formContainer: {
    height: '100%',
  },
  formWrapper: {
    height: '100%',
    [theme.breakpoints.down('md')]: {
      height: '50%',
      marginTop: '-8rem'
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    }
  },
  blockContainer: {
    backgroundColor: theme.palette.secondary.main,
    height: '8rem',
    width: '40rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '30rem'
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  },
  titleContainer: {
    marginTop: '-4rem',
  },
  buttonContainer: {
    marginBottom: '-4rem',
    textTransform: 'none',
    borderRadius: 0,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light
    }
  },
  sendIcon: {
    marginLeft: '2rem'
  },
  contactInfo: {
    fontSize: '1.5rem',
    marginLeft: '1rem',
  },
  contactIcon: {
    height: '3rem',
    width: '3rem',

  },
  contactEmailIcon: {
    height: '2.25rem',
    width: '3rem',

  },
  infoContainer: {
    height: '21.25rem',
    [theme.breakpoints.down('xs')]: {
      height: '15.25rem'
    }
  },
  middleInfo: {
    borderTop: '2px solid #fff',
    borderBottom: '2px solid #fff',

  },
  iconContainer: {
    borderRight: '2px solid #fff',
    height: '7rem',
    width: '8rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      height: '5rem',
      width: '6rem'
    }

  },
  textField: {
    width: '30rem',
    [theme.breakpoints.down('sm')]: {
      width: '20rem'
    }
  },
  input: {
    color: '#fff'
  },
  fieldContainer: {
    marginBottom: '1rem',
  },
  multilineContainer: {
    marginTop: '1rem'
  },
  emailAdornment: {
    height: '17',
    width: '22',
    marginBottom: 10,
  },
  multiline: {
    border: "2px solid #fff",
    borderRadius: 10,
    padding: "1rem"
  },
  multilineError: {
    border: `2px solid ${theme.palette.error.main}`
  }, buttonDisabled: {
    backgroundColor: theme.palette.grey[500]
  },
  sendMessage: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '2rem'
    }
  },
  "@global": {
    ".MuiInput-underline:before, .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: '2px solid #fff',
    },
    ".MuiInput-underline:after": {
      borderBottom: `2px solid ${theme.palette.secondary.main}`
    },
  }
}))


const ContactPage = () => {

  const classes = useStyles()



  const matchesMD = useMediaQuery(theme => theme.breakpoints.down('md'))
  const matchesXS = useMediaQuery(theme => theme.breakpoints.down('md'))

  const [values, setValues] = useState({ name: "", email: "", phone: "", message: "" })
  const [errors, setErrors] = useState({})

  const fields = {
    name: {
      helperText: "Introduzca su Nombre",
      placeholder: "Nombre",
      adornment: <img src={nameAdornment} alt='name' />
    },
    email: {
      helperText: "Email Incorrecto",
      placeholder: "Email",
      adornment: <img src={emailAdornment} alt='email' />
    },
    phone: {
      helperText: "Telefono Incorrecto",
      placeholder: "Telefono",
      adornment: <img src={phone} alt='phone' />
    },
    message: {
      helperText: "Escribir Mensaje",
      placeholder: "Mensaje",
      inputClasses: {
        multiline: classes.multiline,
        error: classes.multilineError
      }
    },
  }

  const disabled = Object.keys(errors).some(error => errors[error] === true)
    || Object.keys(errors).length !== 4

  const info = [{
    label: <span>Avda. Tenor Fleta
      {matchesXS ? <br /> : null}no. 44 Zaragoza</span>,
    icon: (<img className={classes.contactIcon} src={address} alt="address" />)
  },
  {
    label: "+34 643 977 739",
    icon: (<img className={classes.contactIcon} src={phone} alt="phone" />)
  },
  {
    label: <span>thephoneparadisesl{matchesXS ? <br /> : null}@gmail.com</span>,
    icon: (<div className={classes.contactEmailIcon}>
      <Email color='#fff' />
    </div>)
  }]

  return (
    <Layout>
      <Grid container justify="space-around" alignItems="center"
        classes={{ root: classes.mainContainer }}
        direction={matchesMD ? "column" : "row"}
      >
        {/* Contact Form */}
        <Grid item classes={{ root: classes.formWrapper }} >
          <Grid container
            classes={{ root: classes.formContainer }}
            direction="column"
            justify="space-between"
            alignItems="center"
          >
            <Grid item
              classes={{
                root: clsx(classes.titleContainer,
                  classes.blockContainer
                )
              }} >
              <Typography variant="h4">
                Formulario
              </Typography>
            </Grid>
            <Grid item>
              <Grid container direction="column">
                {Object.keys(fields).map(field => {
                  const validateHelper = (event) => {
                    return validate({ [field]: event.target.value })
                  }

                  return (
                    <Grid
                     item 
                     key={field}
                     classes={{
                      root: field === "message" ?
                        classes.multilineContainer :
                        classes.fieldContainer
                    }}>
                      <TextField
                        value={values[field]}
                        onChange={e => {
                          const valid = validateHelper(e)

                          if (errors[field] || valid[field] === true) {
                             setErrors({ ...errors, [field]: !valid[field] })
                          }
                          setValues({ ...values, [field]: e.target.value })
                      }}
                      onBlur={e => {
                        const valid = validateHelper(e)
                        setErrors({ ...errors, [field]: !valid[field] })
                    }}
                        error={errors[field]}
                        helperText={errors[field] && fields[field].helperText}
                        placeholder={fields[field].placeholder}
                        classes={{ root: classes.textField }}
                        multiline={field === "message"}
                        rows={field === "message" ? 8 : undefined}
                        InputProps={{
                          classes: {
                            input: classes.input,
                            ...fields[field].inputClasses
                          },
                          disableUnderline: field === "message",
                          startAdornment:field === "message" ?  undefined :(
                            <InputAdornment position='start'>
                              {fields[field].adornment}
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  )
                })}
              </Grid>
            </Grid>
            <Grid item
              component={Button}
              disabled={disabled}

              classes={{
                root: clsx(classes.buttonContainer,
                  classes.blockContainer, {
                  [classes.buttonDisabled]: disabled,

                })
              }} >
              <Typography variant="h4" classes={{ root: classes.sendMessage }} >
                Enviar Mensaje
              </Typography>
              <img src={send} className={classes.sendIcon} alt="send message" />
            </Grid>
          </Grid>
        </Grid>

        {/* Contact Info */}

        <Grid item>
          <Grid
            container
            direction="column"
            justify="space-between"
            classes={{ root: classes.infoContainer }}
             >
               {info.map((section, i) => (
                   <Grid
                   item
                   key={section.label}
                   container
                   alignItems="center"
                   classes={{ root:i === 1 ? classes.middleInfo : undefined }}
                 >
                   <Grid item classes={{ root: classes.iconContainer }} >
                     {section.icon}
                   </Grid>
                   <Grid item>
                     <Typography 
                     classes={{ root: classes.contactInfo }}
                     variant="h2" 
                     >
                      {section.label}
                     </Typography>
                   </Grid>
                 </Grid>
               ))}
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default ContactPage
