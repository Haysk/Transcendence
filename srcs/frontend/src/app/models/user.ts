export interface User {
	id:	number;
	email: string;
	name: string;
	avatar?: string;
	online?: boolean;
	socket?: number[];
}