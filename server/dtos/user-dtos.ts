export default class UserDto {
    displayName;
    mail;

    constructor(model: any) {
        this.displayName = model.displayName
        this.mail = model.mail
    }
}