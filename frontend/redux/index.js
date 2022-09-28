import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import { MakeStore, createWrapper, Context } from 'next-redux-wrapper';
// import { composeWithDevTools } from 'redux-devtools-extension'
import rootSaga from './saga';
import createSagaMiddleware, { Task } from 'redux-saga';

// create a makeStore function
// const makeStore = (context) => createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

const bindMiddleware = middleware => {
    const arrMiddleware = [middleware];
  
    if (process.env.NODE_ENV !== "production") {
      const { composeWithDevTools } = require("redux-devtools-extension");
      // arrMiddleware.push(createLogger());
      return composeWithDevTools(applyMiddleware(...arrMiddleware));
    }
    return applyMiddleware(...arrMiddleware);
  };

export const makeStore = (context) => {
    // 1: Create the middleware
    const sagaMiddleware = createSagaMiddleware();

    // 2: Add an extra parameter for applying middleware:
    // const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
    const store = createStore(reducer, bindMiddleware(sagaMiddleware));

    // 3: Run your sagas on server
    // store.sagaTask = sagaMiddleware.run(rootSaga);
    store.runSagaTask = () => {
        store.sagaTask = sagaMiddleware.run(rootSaga);
      };
    store.runSagaTask();

    // 4: now return the store:
    return store;
};

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: true });