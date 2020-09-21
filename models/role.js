module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define("Role", {
        //defining fields for Role model
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    //associations
    Role.associate = (models) => {
        //User will associate with Role on Many:Many
        //allowing an user to have multiple roles if needed.
        Role.belongsToMany(models.User, { through: "user_roles", foreignKey: "roleId", otherKey: "userId" });
    };

    return Role;
} 
