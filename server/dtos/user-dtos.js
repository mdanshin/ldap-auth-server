export default class UserDto {
    displayName;
    mail;

    constructor(model) {
        this.displayName = model.displayName
        this.mail = model.mail
    }
}