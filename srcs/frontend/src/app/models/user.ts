import { Channel } from '../models/channel'

export interface 	User {
    id: 			number;
	email:			string;
	login:			string;
	first_name:		string;
	last_name:		string;
	url:			string;
	displayname:	string;
	nickname:		string;
	image_url:		string;
	avatar_url:		string;
	online:			boolean;
	socket?:		string;
	friends?:		User[];
	channel_joined?:Channel[];
	muted?:			Channel[];
	admin_of?:		Channel[];
	oauth_id?:		number;
}
