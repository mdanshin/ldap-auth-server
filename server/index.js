import dotenv  from "dotenv"
import express from 'express'
import router from './router/router.js'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import LdapStrategy from 'passport-ldapauth'
import errorMiddleware from './middlewares/error-middleware.js'

const app = express()

dotenv.config()

const PORT = process.env.PORT || 5000

const OPTS = {
    server: {
        url: process.env.LDAP_URL,
        bindDN: process.env.LDAP_bindDN,
        bindCredentials: process.env.LDAP_bindCredentials,
        searchBase: process.env.LDAP_searchBase2,
        searchFilter: process.env.LDAP_searchFilter,
        searchAttributes: ['displayName', 'mail', 'objectSid'],
    }
};

app.use(passport.initialize({userProperty: 'user'}));
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL}))
app.use('/api', router)

passport.use(new LdapStrategy(OPTS));

app.use(errorMiddleware)

const start = async () => {
    try {
        app.listen(PORT, () => console.log('Starting server...'));
    } catch (e) {
        console.log(e)
    }
}

start().then(() => console.log(`Server is running on port ${PORT}`))