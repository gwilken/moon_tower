import axios from 'axios'


const getHashsFromSetByScore = async (set, start, end) => {
  let res = await axios.post('/gethashesfromsetbyscore', 
    { set, start, end }
  )
  return res.data.filter(elem => elem != null)
}


const getHashsFromSet = async (set, start, end) => {
  let res = await axios.post('/gethashesfromset', 
    { set, start, end }
  )
  return res.data.filter(elem => elem != null)
}

export { getHashsFromSetByScore, getHashsFromSet }