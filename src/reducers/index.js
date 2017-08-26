import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import FighterReducer from './reucerFightersRanking';
import LeaderboardReducer from './reducerLeaderboard';

const rootReducer = combineReducers({
    fighters:FighterReducer,
    leaderboard:LeaderboardReducer,
    form: formReducer
});

export default rootReducer;
