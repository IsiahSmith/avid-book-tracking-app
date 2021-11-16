const progress = (state = [], action) => {
    switch (action.type) {
        case 'SET_PROGRESS':
            return action.payload;
        case 'LOGOUT':
            return [];
        default:
            return state;
    }
};

export default progress;