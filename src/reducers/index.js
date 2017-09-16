import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import FighterReducer from './reucerFightersRanking';
import LeaderboardReducer from './reducerLeaderboard';
import CurrentUserReducer from './currentUser';
import EventsReducer from './events/reducerEvent';
import UserReducer from './reducerUserProfile';

const rootReducer = combineReducers({
    fighters:FighterReducer,
    leaderboard:LeaderboardReducer,
    currentUser: CurrentUserReducer,
    events: EventsReducer,
    profile:UserReducer,
    form: formReducer
});

export default rootReducer;
