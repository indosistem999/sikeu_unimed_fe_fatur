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

        const WebApiUrl = httpRequest.url.startsWith(`${environment.webApiUrl}`) && !httpRequest.url.startsWith(`${environment.webApiUrl}/auth`);

        const userData = this._authenticationService.getUserData();

        if (userData && WebApiUrl) {
            const modifiedRequest = httpRequest.clone({
                setHeaders: {
                    Authorization: `Bearer ${userData.token}`
                }
            });
            return next.handle(modifiedRequest);
        } else {
            return next.handle(httpRequest);
        }
    }
}