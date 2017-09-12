var express = require('express')
var router = express.Router()
var controllers = require('../controllers')

router.get('/:resource',function(req,res,next){
	var resource = req.params.resource
	var controller = controllers[resource]
	console.log('resource '+resource);
	console.log('controller '+controller);
		controller.find(req.query,function(err,results){
			if(err){
				res.json({
						confirmation: 'fail',
						message: 'Invalid resource request !'+resource
				})
				return
			}
			res.json({
				confirmation: 'success',
				results: results
			})
		})
})

router.get('/:resource/:id',function(req,res,next){
	var resource = req.params.resource
	var controller = controllers[resource]
	console.log('resource '+resource);
	console.log('controller '+controller);	
	var id = req.params.id
		controller.findById(id,function(err,result){
			if(err){
				res.json({
						confirmation: 'fail',
						message: 'Invalid resource request !'+resource
				})
				return
			}
			res.json({
				confirmation: 'success',
				results: result
			})
		})
})

router.post('/:resource',function(req,res,next){
	var resource = req.params.resource
	var controller = controllers[resource]
	console.log('resource '+resource);
	console.log('controller '+controller);	
		controller.create(req.body,function(err,result){
			if(err){
				res.json({
						confirmation: 'fail',
						message: err
				})
				return
			}
			res.json({
				confirmation: 'success',
				results: result
			})
		})
})
module.exports = router