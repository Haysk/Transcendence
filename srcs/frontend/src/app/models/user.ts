import { Socket } from '../models/socket'

export interface 	User {
    id: 			number;
	name: 			string;
    avatarUrl: 		string;
    online: 		boolean;
	sockets: 		Socket[];
}
