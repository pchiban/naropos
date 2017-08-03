
import { User } from "app/user/user.model";

export class AuthenticationUtils {

    private static actionRoles: { [key: string]: string[]; } = {
        'users': ['ADMIN'],

        // licenses
        'licenses': ['ADMIN', 'USER'],
        'adminLicenses': ['ADMIN']
    };

    static isUserInRole(action) {
        let userJson = localStorage.getItem('currentUser');
        let user = User.fromJSON(userJson);

        let userRoles: String[] = user.roles.map(r => r.name);
        let requiredRoles: string[] = this.actionRoles[action];

        for (let i = 0; i < requiredRoles.length; i++) {
            if (userRoles.indexOf(requiredRoles[i]) > -1) {
                // user has required role
                return true;
            }
        }

        return false;
    }
}