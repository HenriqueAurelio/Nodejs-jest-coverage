class userResponse {
	constructor(user) {
        this.name = user.name,
        this.lastname = user.lastname,
        this.phone = user.phone,
        this.email = user.email,
        this.birth = user.birthDate;
        this.status = user.status;
	}
};
  
module.exports = userResponse;