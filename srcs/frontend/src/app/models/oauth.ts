export interface User {
    id: 			number;
	email:			string;
	login:			string;
	first_name:		string;
	last_name:		string;
	url:			string;
	displayname:	string;
	image_url:		string;
	online:			boolean;
	oauth?:			Oauth;
	socket?:		string;
	friends?:		User[];
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
