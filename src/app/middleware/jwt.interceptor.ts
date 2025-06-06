import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthenticationService } from "../services/authentication/authentication.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(
        private _authenticationService: AuthenticationService,
    ) { }

    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const authApi = httpRequest.url.startsWith(`${environment.webApiUrl}/auth`);

        const userData = this._authenticationService.getUserData();

        if (userData) {
            if (authApi) {
                if (httpRequest.url == `${environment.webApiUrl}/auth/manual-change-password`) {
                    const modifiedRequest = httpRequest.clone({
                        setHeaders: {
                            Authorization: `Bearer ${userData.access_token}`
                        }
                    });
                    return next.handle(modifiedRequest);
                } else {
                    return next.handle(httpRequest);
                }
            } else {
                const modifiedRequest = httpRequest.clone({
                    setHeaders: {
                        Authorization: `Bearer ${userData.access_token}`
                    }
                });
                return next.handle(modifiedRequest);
            }
        } else {
            return next.handle(httpRequest);
        }
    }
}