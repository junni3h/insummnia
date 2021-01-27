const MenuReducer = (state = {}, action) => {
    switch (action.type) {
        case "MENU":
            return {
                ...state
                , menu: action.data
            };
        default: 
            return {
                ...state
                , menu: []
            };
    }
};

export default MenuReducer;