import constants from '../constants/constants'

export default {

	zonesReceived: (zones) => {
		return {
			type: constants.ZONES_RECEIVED,
			zones: zones
		}
	},

	zoneCreated: (zone) => {
		return {
			type: constants.ZONE_CREATED,
			zone: zone
		}
	},

	selectZone: (index) => {
		return {
			type: constants.SELECT_ZONE,
			selectedZone: index
		}
	},

	commentsReceived: (comments) => {
		return {
			type: constants.COMMENTS_RECEIVED,
			comments: comments
		}
	},

	commentCreated: (comment) => {
		console.log('Inside action.js, =>'+JSON.stringify(comment));
		return {
			type: constants.COMMENT_CREATED,
			comment: comment
		}
	}
}