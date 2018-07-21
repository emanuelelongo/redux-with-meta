# Redux _withMeta_

This package contains a single function `withMeta` that can be used to add metadata to a **Redux** action creator.
Plain action as well as **Thunk** action are supported.

### Example

``` js
import withMeta from 'redux-with-meta';
import { myAction } from './actions/myAction';

...

const actionWithMeta = withMeta({myMeta: "some meta info"})(myAction);
```
 
