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
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import createHistory from 'history/createBrowserHistory'
import Home from './components/home/home';
import TabsComp from './components/ranking/tabs';
import Auth from './components/auth/auth';
import thunk from 'redux-thunk';
import setAuthorizationToken from './utils/setAuthorizationToken';

const createStoreWithMiddleware = createStore(reducers,
    compose(applyMiddleware(thunk,promise))
);
    //compose(applyMiddleware(promise,thunk))(createStore);
injectTapEventPlugin();

const history = createHistory();

const muiTheme = getMuiTheme({
    palette: {
        textColor: '#ffffff',
        primary1Color: '#212121'
    }
});

setAuthorizationToken(window.localStorage.getItem('token'));


ReactDOM.render(
<MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={createStoreWithMiddleware}>
        <BrowserRouter history={history}>
            <Switch>
                <Route path="/ranking" component={TabsComp}/>
                <Route path="/" component={Home}/>
            </Switch>
        </BrowserRouter>
    </Provider>
</MuiThemeProvider>
  ,document.getElementById('root'));
registerServiceWorker();
