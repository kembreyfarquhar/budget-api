interface UserType {
	id: string | number;
	username: string;
	password: string;
}

class User implements UserType {
	id: string | number;
	username: string;
	password: string;
	constructor(id: string | number = null, username: string = null, password: string = null) {
		this.id = id;
		this.username = username;
		this.password = password;
	}
}

export { User };
