import { Oauth } from './oauth';
import { Socket } from './socket'

export interface 	User {
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
