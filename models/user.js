module.exports = (sequelize, type) => {
    const User = sequelize.define('users', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true},
        name: type.STRING,
        lastName: type.STRING,
        email: type.STRING,
        username: type.STRING,
        password: type.STRING
    });
    return User
};