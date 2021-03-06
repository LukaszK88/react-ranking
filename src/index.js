import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware,compose } from 'redux';
import { BrowserRouter, Route, Switch  } from 'react-router-dom';
import promise from 'redux-promise';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import reducers from './reducers';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-input-range/lib/css/index.css';
import 'react-dd-menu/dist/react-dd-menu.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import createHistory from 'history/createBrowserHistory'
import Home from './components/home/home';
import TabsComp from './components/ranking/tabs';
import thunk from 'redux-thunk';
import setAuthorizationToken from './utils/setAuthorizationToken';
import {currentUser} from './actions';
import Profile from './components/ranking/profile/profile';
import Events from './components/admin/events';
import AdminUsers from './components/admin/user/user';

import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

export const baseUrl = 'http://localhost:3000/';
const createStoreWithMiddleware = createStore(reducers,
    compose(applyMiddleware(thunk,promise),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);
injectTapEventPlugin();

const history = createHistory();

const muiTheme = getMuiTheme({
    palette: {
        textColor: '#000000',
        primary1Color: '#a2a2a2',
        pickerHeaderColor: '#000000'
    }
});
if(window.localStorage.getItem('token')) {
    setAuthorizationToken(window.localStorage.getItem('token'));
    createStoreWithMiddleware.dispatch(currentUser(window.localStorage.getItem('token')));
}


ReactDOM.render(
<MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={createStoreWithMiddleware}>
        <BrowserRouter history={history}>
            <Switch>
                <Route path="/profile/:userId" component={Profile}/>
                <Route path="/events" component={Events}/>
                <Route path="/users" component={AdminUsers}/>
                <Route path="/ranking" component={TabsComp}/>
                <Route path="/" component={Home}/>
            </Switch>
        </BrowserRouter>
    </Provider>
</MuiThemeProvider>
  ,document.getElementById('root'));
registerServiceWorker();
