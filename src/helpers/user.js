export const userHelper ={
    getImage: (user) => {
        if(user.image){
            return user.image;
        }
        if(user.fb_image){
            return user.fb_image;
        }
        if(user.g_image){
            return user.g_image;
        }

        return '/img/placeholder.png';
    },

    ratioBohurt: (user) => {
        return Math.ceil(Math.abs((((user.bohurtTable.down + user.bohurtTable.suicide)/(user.bohurtTable.won + user.bohurtTable.lastMan))*100)-100));
    }
};