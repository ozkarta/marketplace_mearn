const BusyIndicatorReduced = function(state = {busy: false}, action) {
    if (action.type === 'BUSY_INDICATOR') {
        return Object.assign({}, state, {isBusy: action.busy});
    }
    return state;
}

export default BusyIndicatorReduced;