import { combineReducers } from 'redux';
import toggleSearchBar from './toggleSearchBar'
import getProduct from './getProduct'
import submitCartForm from './submitCartForm'
import getCCB from './getCCB'
import subscribeEmail from './subscribeEmail';
import addPopularPoint from './addPopularPoint';
import updateCartSidebar from './updateCartSidebar';

const appReducer = combineReducers({
    toggleSearchBar,
    getProduct,
    submitCartForm,
    getCCB,
    subscribeEmail,
    addPopularPoint,
    updateCartSidebar
});
export default appReducer;