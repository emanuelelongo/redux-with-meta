import { withMeta } from '../index';

describe('index', () => {
    it('should add meta to an action', () => {
        const myAction = (a, b) => ({ type: "AN_OPERATION", payload: a+b });
        const myActionWithMeta = withMeta({info: "this is a sum"})(myAction);
        const result = myActionWithMeta(2,3);

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
        
        const myThunkActionWithMeta = withMeta({info: "this is a sum"})(myThunkAction);
        
        const result = myThunkActionWithMeta(2,3)(fakeDispatcher);
        expect(dispatchedValue).toEqual({
            type: "AN_OPERATION",
            payload: 5,
            meta: {
                info: "this is a sum"
            }
        });
    });
});
