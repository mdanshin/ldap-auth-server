import userService from '../services/user-service.js'

class UserController {
    async login(req: any, res: any, next: any) {
        try {
            const {displayName, mail} = req.user
            const userData = await userService.login(displayName, mail)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async logout(req: any, res: any, next: any) {
        try {
            res.clearCookie('refreshToken')
            return res.status(204).send({message: "Logout successfully"})
        } catch (e) {
            next(e)
        }
    }

    async refresh(req: any, res: any, next: any) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async getUsers(req: any, res: any, next: any) {
        try {
            const users = await userService.getAllUsers()
            return res.json(users)
        } catch (e) {
            next(e)
        }
    }
}

export default new UserController();