export interface User {
	id: number;
	email: string;
	name: string;
	login: string;
	oauth: Oauth;

}

export interface Oauth {
    id?: number;
	code: string;
	refreshToken?: string;
    userToken?: string;
    userId?: number;
	user?: User;
}
