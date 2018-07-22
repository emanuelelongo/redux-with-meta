import { withMetaArgument } from '../index';

describe('index', () => {
    it('should add meta to an action', () => {
        const myAction = (a, b) => ({ type: "AN_OPERATION", payload: a+b });
        const myActionWithMeta = withMetaArgument(myAction);
        const result = myActionWithMeta(2, 3, {info: "this is a sum"});

        expect(result).toEqual({
            type: "AN_OPERATION",
            payload: 5,
            meta: {
                info: "this is a sum"
            }
        });
    });
    
    it('should add meta to a Thunk action', () => {
        let dispatchedValue = null;
        const fakeDispatcher = obj => {dispatchedValue = obj};
        
        const myThunkAction = (a,b) => {
            return dispatch => {
                dispatch({
                    type: "AN_OPERATION",
                    payload: a + b
                })
            }
        }
        
        const myThunkActionWithMeta = withMetaArgument(myThunkAction);
        
        const result = myThunkActionWithMeta(2, 3, {info: "this is a sum"})(fakeDispatcher);
        expect(dispatchedValue).toEqual({
            type: "AN_OPERATION",
            payload: 5,
            meta: {
                info: "this is a sum"
            }
        });
    });
});
