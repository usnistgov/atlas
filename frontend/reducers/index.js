// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import UseCasesReducer from './UseCasesReducer'

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    UseCasesReducer
  });
}