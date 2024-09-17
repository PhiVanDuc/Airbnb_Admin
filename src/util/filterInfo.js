const filterInfo = (obj) => {
    const { user } = obj;
    
    if (user?.roles?.length > 0) {
        const roles = user.roles;

        const uniquePermissions = roles.reduce((acc, role) => {
            role?.permissions.forEach(permission => {
                if (!acc.find(item => item.id === permission.id && item.permission === permission.permission)) {
                    delete permission?.roles_permissions;
                    delete permission?.created_at;
                    delete permission?.updated_at;

                    acc.push(permission);
                }
            });

            return acc;
        }, []);

        return uniquePermissions;
    }
    
    return [];
}

export default filterInfo;