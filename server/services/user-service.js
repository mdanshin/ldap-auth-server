import tokenService from './token-service.js'
import UserDto from '../dtos/user-dtos.js'
import ApiError from '../exeptions/api-error.js'

class UserService {
    async login(displayName, mail) {
        const userDto = new UserDto({displayName, mail})
        const tokens = tokenService.generateTokens({...userDto})

        return {...tokens, user: userDto}
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const userDto = new UserDto(userData)
        const tokens = tokenService.generateTokens({...userDto})

        return {
            ...tokens,
            user: userDto
        }
    }

    async getAllUsers() {
        return {message: 'OK'}
    }
}

export default new UserService();