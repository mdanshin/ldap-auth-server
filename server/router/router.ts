import * as express from 'express'
import passport from 'passport'
import userController from '../controllers/user-controller.js'
import authMiddleWare from '../middlewares/auth-middleware.js'

const router = express.Router()

router.post('/login',
    passport.authenticate('ldapauth', {
        session: false}),
    userController.login)

router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)
router.get('/users', authMiddleWare, userController.getUsers)

export default router