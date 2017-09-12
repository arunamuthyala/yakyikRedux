import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import zoneReducer from '../reducers/zoneReducer'
import commentReducer from '../reducers/commentReducer'

var store;

export default {

	configureStore: () => {
		const reducers = combineReducers({
			zone: zoneReducer,
			comment: commentReducer,
		})

		store = createStore(
			reducers,
			applyMiddleware(thunk)
		)

		return store
	},

	currentStore: () => {
		return store
	}
}