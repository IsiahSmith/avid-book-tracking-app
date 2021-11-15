const books = (state = [], action) => {
    switch (action.type) {
        case 'SET_BOOKS':
            return action.payload;
        case 'LOGOUT':
            return [];
        default:
            return state;
    }
};

export default books;