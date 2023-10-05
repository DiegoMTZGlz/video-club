module.exports = (sequelize, type) => {
    const Genre = sequelize.define('genres', {
        id: {type: type.INTEGER, primaryKey: true, autoIncrement: true},
        description: type.STRING,
        type: type.BOOLEAN 
    });
    return Genre
};