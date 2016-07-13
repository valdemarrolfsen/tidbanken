import 'rxjs/Rx';
import {Injectable}     from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Router} from "@angular/router";

import {User}           from '../classes/user';
import {AuthHttp} from 'angular2-jwt/angular2-jwt';
import myGlobals = require('globals');
import {RequestService} from "./requestService";

@Injectable()
export class AuthService {

    private _apiEndpoint = myGlobals.apiUrl + 'users/';  // URL to web api

    constructor(private http:Http,
                private authHttp:AuthHttp,
                private _requestService:RequestService,
                private _router:Router) {
    }

    public getCurrentUser() {

        var key = 'currentUsers';

        return this._requestService.request('GET', this._apiEndpoint + 'current-user/', key)
            .map(res => <User[]> res.json());
    }

    public login(username:String, password:String) {

        let myHeader = new Headers();
        myHeader.append('Content-Type', 'application/json');
        let body = JSON.stringify({phone: username, password: password});

        return this.http.post(this._apiEndpoint + 'api-token-auth/', body, {headers: myHeader})
            .map(res => <User> res.json())
            .do(res => {
                // Stores auth token generated by server in local storage
                localStorage.setItem('id_token', res.token);
            });
    }

    public logout() {
        // Stores auth token generated by server in local storage
        localStorage.removeItem('id_token');
        this._router.navigate(['/']);
    }

    public register(user:User) {

        let myHeader = new Headers();
        myHeader.append('Content-Type', 'application/json');

        user.user_profile = {};

        let body = JSON.stringify(user);

        return this.http.post(this._apiEndpoint, body, {headers: myHeader})
            .map(res => <User> res.json());
    }

    public update(user:User) {

        // Need to delete logo string in order to update other info
        var copy = Object.assign({}, user);
        delete copy.user_profile.profile_picture;

        let myHeader = new Headers();
        myHeader.append('Content-Type', 'application/json');
        let body = JSON.stringify(copy);

        return this.authHttp.put(this._apiEndpoint + user.id + '/', body, {headers: myHeader})
            .map(res => <User> res.json());
    }

    public resetPassword(password:string, token:string) {
        let myHeader = new Headers();
        myHeader.append('Content-Type', 'application/json');
        let body = JSON.stringify({password: password, token: token});

        return this.http.post(this._apiEndpoint + 'reset-password/', body, {headers: myHeader});
    }

    public getUser(user_id:number) {
        return this.authHttp.get(this._apiEndpoint + user_id + '/')
            .map(res => <User> res.json());
    }

    public resendConfirmEmail(email:string) {
        let myHeader = new Headers();
        myHeader.append('Content-Type', 'application/json');
        let body = JSON.stringify({email: email});

        return this.http.post(this._apiEndpoint + 'resend-confirm-email/', body, {headers: myHeader});
    }

    public validateToken(token:string) {
        let myHeader = new Headers();
        myHeader.append('Content-Type', 'application/json');
        let body = JSON.stringify({token: token});

        return this.http.post(this._apiEndpoint + 'validate_token/', body, {headers: myHeader});
    }

    public sendResetPassword(email:string) {
        let myHeader = new Headers();
        myHeader.append('Content-Type', 'application/json');
        let body = JSON.stringify({email: email});

        return this.http.post(this._apiEndpoint + 'send-reset-password/', body, {headers: myHeader});
    }
}
