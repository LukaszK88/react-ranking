import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
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

import Home from './components/home/home';
import TabsComp from './components/ranking/tabs';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
injectTapEventPlugin();

const muiTheme = getMuiTheme({
    palette: {
        textColor: '#ffffff',
        primary1Color: '#212121'
    }
});

ReactDOM.render(
<MuiThemeProvider muiTheme={muiTheme}>
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>

                    <Switch>
                        <Route path="/ranking" component={TabsComp}/>
                        <Route path="/" component={Home}/>
                    </Switch>


        </BrowserRouter>
    </Provider>
</MuiThemeProvider>
  ,document.getElementById('root'));
registerServiceWorker();
