const storeId = document.querySelector('#store-id')
const storeAddress = document.querySelector('#store-address')
document.querySelector('#store-form').addEventListener('submit',fetchStore)

async function fetchStore(e){
  e.preventDefault()
  if(storeId.value === '' || storeAddress.value === ''){
    alert('Please Store Id and Address are required')
    return 
  }
  const data = {
    storeId:storeId.value,
    address:storeAddress.value
  }
  try {
     const res = await fetch('/api/v1/stores',{
      headers:{'Content-type':'application/json'},
      method:'POST',
      body:JSON.stringify(data)
    })

    if(res.status === 400){
      throw Error ('Store already exists')
      return
    }
    alert('Store added')
    window.location.href = 'http://localhost:5000/index.html'

  } catch (error) {
     alert(error)
  }
   
}
