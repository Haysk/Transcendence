export interface User {
	id: number;
	email: string;
	name: string;
	login: string;
	oauth: Oauth;

}

export interface Tfa {
    tfa_activated?: boolean;
	tfa_qr?: string;
}

export interface Oauth {
    id?: number;
	code: string;
	refresh_token?: string;
    access_token?: string;
    tfa?: Tfa;
	user?: User;
}
