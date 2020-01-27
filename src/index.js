import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './store/reducers/rootReducer';
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import fbConfig from './config/fbConfig';

//파이어베이스/파이어스토어 api를 함수 안에서 적용할 수 있게 인자로 getFirebase getFirestore를 넣어준다
const store = createStore(rootReducer,
    compose(//미들웨어와 store enhancer들을 compose해 두개를 연결시킬 수 있음
        applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
        reduxFirestore(fbConfig), //config를 인자로 집어넣어야
        reactReduxFirebase(fbConfig, {useFirestoreForProfile: true, userProfile:'users', attachAuthIsReady: true}) //createProject에서 연결할 프로젝트를 인식할 수 있음
        )
)
store.firebaseAuthIsReady.then(() => {
    ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
    
    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://bit.ly/CRA-PWA
    serviceWorker.unregister();
})
