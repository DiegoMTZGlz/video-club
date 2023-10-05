module.exports = (sequelize, type) => {
    const Member = sequelize.define('members', {
        id: {type: type.INTEGER, primaryKey:true, autoIncrement: true},
        name: type.STRING,
        lastName: type.STRING,
        address: type.STRING,
        phone: type.STRING,
        status: type.BOOLEAN   
    });
    return Member;
};