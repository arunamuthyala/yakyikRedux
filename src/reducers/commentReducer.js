import constants from '../constants/constants'

var initialState = {
	commentsLoaded : false,
	list : []
}

export default  (state = initialState, action) => {
	var updated = Object.assign({}, state)
	switch(action.type){
		case constants.COMMENTS_RECEIVED:
			console.log('Comments data:->'+JSON.stringify(action.comments))
			updated['list'] = action.comments
			updated['commentsLoaded'] = true
			return updated
		case constants.SELECT_ZONE:
			updated['commentsLoaded'] = false
			return updated
		case constants.COMMENT_CREATED:
			console.log('Inside commentReducer.js:->'+JSON.stringify(action.comment))
			let updatedList = 	Object.assign([], updated.list)
			updatedList.push(action.comment)
			updated['list'] = updatedList
			console.log('After Inside commentReducer.js:->'+JSON.stringify(updated['list']))
			return updated
		default:
			return state
	}
}