import constants from '../constants/constants'

var initialState = {
	selectedZone: 0,
	list: []
}

export default (state = initialState, action) => {

	var updated = Object.assign({}, state)
	switch (action.type) {

		case constants.ZONES_RECEIVED:
			console.log('ZONES_RECEIVED: '+JSON.stringify(action.zones))
			updated['list'] = action.zones
			return updated // this is the equivalent of this.setState(...)

		case constants.ZONE_CREATED:
			console.log('ZONE_CREATED: '+JSON.stringify(action.zone))

			let updatedList = Object.assign([], updated.list)
			updatedList.push(action.zone)
			updated['list'] = updatedList

			return updated

		case constants.SELECT_ZONE:
			updated['selectedZone'] = action.selectedZone
			return updated

		default:
			return state

	}


}