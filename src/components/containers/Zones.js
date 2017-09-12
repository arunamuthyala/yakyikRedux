import React, { Component } from 'react'
import { CreateZone, Zone} from '../presentation'
import { APIManager } from '../../utils'
import { connect } from 'react-redux'
import actions from '../../actions/actions'
import store from '../../stores/store'

class Zones extends Component {
	constructor(){
		super()
		this.state = {
			
		}
	}

	componentDidMount(){
		console.log('componentDidMount: ')
		APIManager.get('/api/zone', null, (err, response) => {
			if (err){
				alert('ERROR: '+err.message)
				return
			}

			// ACTION!
			const zones = response.results
			this.props.zonesReceived(zones)
		})
	}

	addZone(zone){
		let updatedZone = Object.assign({}, zone)

		APIManager.post('/api/zone', updatedZone, (err, response) => {
			if (err){
				alert('ERROR: '+err.message)
				return
			}

			this.props.zoneCreated(response.result)
		})
	}

	selectZone(index){
		console.log('selectZone: '+index)
		this.props.selectZone(index)
	}

	render(){
		const listItems = this.props.list.map((zone, i) => {
			let selected = (i==this.props.selected)
			return (
				<li key={i}>
					<Zone index={i} select={this.selectZone.bind(this)} isSelected={selected} currentZone={zone} />
				</li>
			)
		})

		return (
			<div>
				<ol>
					{listItems}
				</ol>

				<CreateZone onCreate={this.addZone.bind(this)} />
			</div>

		)
	}
}

const stateToProps = (state) => {
	return {
		list: state.zone.list,
		selected: state.zone.selectedZone
	}
}

const dispatchToProps = (dispatch) => {
	return {
		zonesReceived: (zones) => dispatch(actions.zonesReceived(zones)),
		zoneCreated: (zone) => dispatch(actions.zoneCreated(zone)),
		selectZone: (index) => dispatch(actions.selectZone(index))
	}
}

export default connect(stateToProps, dispatchToProps)(Zones)




