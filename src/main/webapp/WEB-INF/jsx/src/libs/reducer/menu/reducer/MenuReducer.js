const MenuReducer = (state = {}, action) => {
    switch (action.type) {
        case "MENU":
            return action.data;
        default: 
            return [];
    }
};

export default MenuReducer;