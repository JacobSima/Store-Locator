const mongoose = require('mongoose')
const Schema = mongoose.Schema
const geoAddress = require('../utils/geocode')

const storeSchema = new Schema({
  storeId:{
    type:String,
    required:[true,'Please add a store id'],
    unique:true,
    trim:true,
    maxlength:[10,'Store id must be less than 10 chars']
  },
  address:{
    type:String,
    required:[true, 'Please add an address']
  },
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
    },
    coordinates: {
      type: [Number], // array of numbers
      index:'2dsphere'  // 2dsphere support querries that calculate geometries on an earth-like sphere
    },
    formattedAddress:String
  },
  createdAt:{
    type:Date,
    default:Date.now
  }
})


// location middleware
storeSchema.pre('save',async function(){
  const res = await geoAddress(this.address)
  this.location.formattedAddress = res[0].formattedAddress
  this.location.coordinates = [res[0].longitude, res[0].latitude]
  this.address = undefined

})


module.exports = mongoose.model('Store',storeSchema)