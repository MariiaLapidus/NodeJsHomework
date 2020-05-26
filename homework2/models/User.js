const users = [
    {email:'aaa@gmail.com', password:'123'},
    {email: 'bbb@gmail.com', password: '321'}
];

module.exports = class User {
    constructor(email, password) {
        this.email = email;
        this.password = password
    }

    save() {
        // console.log(users);
        const user = User.findUser(this.email, this.password);
        if (!user) {
            users.push(this);
            return true;
        }else {
            return false;
        }

        // console.log(users);
    }
    static findUser(email, password) {
        return users.find(user => (user.email === email && user.password === password))
    }

    static fetchAll() {
        return users;
    }
};
