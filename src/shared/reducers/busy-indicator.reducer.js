const BusyIndicatorReduced = function(state = {isBusy: false}, action) {
    if (action.type === 'BUSY_INDICATOR') {
        return Object.assign({}, state, {isBusy: action.busy});
    }
    return state;
}

export default BusyIndicatorReduced;