const isThunkAction = action => typeof action == 'function';
const interceptor = (meta, action) => ({...action, meta});
const thunkInterceptor = (dispatch, meta) => action => dispatch({...action, meta});

const withMeta = meta => actionCreator => function() {
    const action = actionCreator(...arguments);
    if(isThunkAction(action)) {
        return dispatch => action(thunkInterceptor(dispatch, meta));
    }
    else {
        return interceptor(meta, action);
    }
}

const withMetaArgument = actionCreator => function() {
    const action = actionCreator(...arguments);
    const meta = arguments.length > 0 
        ? arguments[arguments.length-1]
        : {};
    
    if(isThunkAction(action)) {
        return dispatch => action(thunkInterceptor(dispatch, meta));
    }
    else {
        return interceptor(meta, action);
    }
}
export {withMeta, withMetaArgument};
