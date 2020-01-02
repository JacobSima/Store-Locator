const Store = require('../models/Store')

// @desc GET all stores
// @route GET /api/v1/stores
// @acces Public

exports.getStores = async(req,res,next)=>{
  try {
    const stores = await Store.find()
    res.status(200).json({
      success:true,
      count:stores.length,
      data:stores
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success:false,
      error:'Server error'
    })
  }
}



// @desc Create a store
// @route GET /api/v1/stores
// @acces Public

exports.addStore = async(req,res,next)=>{
  try {
    const store = await Store.create(req.body)
     res.status(201).json({
       success:true,
       data:store
     })
  } catch (error) {
    console.log(error)
    if(error.code === 11000){
      return res.status(400).json({error:'This store already exists'})
    }
    res.status(500).json({
      success:false,
      error:'Server error'
    })
  }
}