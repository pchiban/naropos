
import { User } from "app/user/user.model";

export class AuthenticationUtils {

    private static actionRoles: { [key: string]: string[]; } = {
        'users': ['ADMIN'],
        'changePassword': [],

        // licenses
        'licenses': [],
        'adminLicenses': ['ADMIN']
    };

    static isUserInRole(action) {
        let user = AuthenticationUtils.getLoggedUser();

        let userRoles: String[] = user.roles.map(r => r.name);
        let requiredRoles: string[] = this.actionRoles[action];

        // if requiredRoles is empty, all the roles are allowed
        if (requiredRoles.length === 0) {
            return true;
        }

        for (let i = 0; i < requiredRoles.length; i++) {
            if (userRoles.indexOf(requiredRoles[i]) > -1) {
                // user has required role
                return true;
            }
        }

        return false;
    }

    static getLoggedUser(): User {
        let userJson = localStorage.getItem('currentUser');
        let user = User.fromJSON(userJson);

        return user;
    }
}