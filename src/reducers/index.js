import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import FighterReducer from './reucerFightersRanking';
import LeaderboardReducer from './reducerLeaderboard';
import CurrentUserReducer from './currentUser';
import EventsReducer from './events/reducerEvent';

const rootReducer = combineReducers({
    fighters:FighterReducer,
    leaderboard:LeaderboardReducer,
    currentUser: CurrentUserReducer,
    events: EventsReducer,
    form: formReducer
});

export default rootReducer;
