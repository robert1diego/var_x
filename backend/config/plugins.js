module.exports = ({ env }) => ({
    email:{
        provider:"sendgrid",
        providerOptions:{
            apiKey:env("SENDGRID_API_KEY"),
        },
        settings:{
            defaultFrom:"robert11diego@gmail.com",
            defaultTo:"robert11diego@gmail.com",
        },
    },
})