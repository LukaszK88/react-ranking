import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import FighterReducer from './reucerFightersRanking';
import LeaderboardReducer from './reducerLeaderboard';
import CurrentUserReducer from './currentUser';

const rootReducer = combineReducers({
    fighters:FighterReducer,
    leaderboard:LeaderboardReducer,
    currentUser: CurrentUserReducer,
    form: formReducer
});

export default rootReducer;
