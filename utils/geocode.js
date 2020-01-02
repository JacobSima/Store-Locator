const NodeGeocoder = require('node-geocoder')
const options ={
  provider: 'mapquest',
  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: process.env.GEO_CODER_KEY, // for Mapquest, OpenCage, Google Premier
  formatter:null      
}

const geocoder = NodeGeocoder(options);

  const geoAddress = async(ad)=>{
    try {
      const address =  await geocoder.geocode(ad)
      return  address
    } catch (error) {
      console.log(error)
    }
  }

module.exports = geoAddress