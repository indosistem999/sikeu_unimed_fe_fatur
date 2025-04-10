import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication/authentication.service";

export const AuthGuard = () => {
    const authService = inject(AuthenticationService)

    const userData = authService.getUserData();

    const router = inject(Router);

    if (userData) {
        return true;
    }

    return router.navigate(['']);
}