import React, { Component } from 'react'
import { CreateComment, Comment } from '../presentation'
import styles from './styles'
import { APIManager } from '../../utils'
import { connect } from 'react-redux'
import actions from '../../actions/actions'

class Comments extends Component {
	constructor(){
		super()
		this.state = {
		}
	}

	/*
	componentDidMount(){
		APIManager.get('/api/comment', null, (err, response) => {
			if (err){
				alert('ERROR: '+err.message)
				return
			}
			// ACTION!
			const comments = response.results
			this.props.commentsReceived(comments)
		})

	}*/

	submitComment(comment){
		console.log('submitComment: '+JSON.stringify(comment))
		let updatedComment = Object.assign({}, comment)
		let zone = this.props.zones[this.props.index]
		updatedComment['zone'] = zone._id

		APIManager.post('/api/comment', updatedComment, (err, response) => {
			if (err){
				alert(err)
				return
			}

			console.log('Inside submitComment='+JSON.stringify(response))
			this.props.commentCreated(response.results)
			// let updatedList = Object.assign([], this.state.list)
			// updatedList.push(response.result)
			// this.setState({
			// 	list: updatedList
			// })
		})
	}
	componentDidUpdate(){
		console.log('Comments container: componentDidUpdate')
		let zone = this.props.zones[this.props.index]
		if(zone==null){
			console.log('NO SELECTED ZONE!!!')
			return
		}
		console.log('SELECTED ZONE IS READY == '+zone._id)
		if(this.props.commentsLoaded == true){
			return
		}
		APIManager.get('/api/comment',{zone:zone._id}, (err,response) => {
			if(err){
				alert('ERROR: '+err.message)
				return 
			}
			let comments = response.results
			this.props.commentsReceived(comments)
		})
	}
	render(){
		const commentList = this.props.comments.map((comment, i) => {
			return (
				<li key={i}><Comment currentComment={comment} /></li>
			)
		})

		const selectedZone = this.props.zones[this.props.index]
		const zoneName = (selectedZone==null) ? '' : selectedZone.name

		return (
			<div>
				<h2>{zoneName}</h2>
				<div style={styles.comment.commentsBox}>
					<ul style={styles.comment.commentsList}>
						{ commentList }
					</ul>

					<CreateComment onCreate={this.submitComment.bind(this)} />
				</div>
			</div>
		)
	}
} 

const stateToProps = (state) => {
	return {
		index: state.zone.selectedZone,
		zones: state.zone.list,
		comments: state.comment.list,
		commentsLoaded: state.comment.commentsLoaded
	}

}
const dispatchToProps = (dispatch) => {
	return {
		commentsReceived: (comments) => dispatch(actions.commentsReceived(comments)),
		commentCreated: (comment) => dispatch(actions.commentCreated(comment))
	}
}
export default connect(stateToProps,dispatchToProps)(Comments)




