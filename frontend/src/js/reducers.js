import {WINDOW_RESIZE, PUSH_DATA, ADD_INITIAL_DATA, PUSH_AND_SHIFT_DATA } from './constants'

const initialState = {
    windowWidth:  window.innerWidth,
    house: [],
    solar: [],
    fridge: [],
    gps: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case WINDOW_RESIZE:
        return { ...state, windowWidth: action.payload.width, windowHeight: action.payload.height }
  
      case ADD_INITIAL_DATA:
        return {...state, [action.key]: action.payload }
  
      case PUSH_DATA:
        let newArray = state.solarData.slice()
        newArray.push(action.payload)
        return {...state, [action.key]: newArray }
        
      case PUSH_AND_SHIFT_DATA:
        let newArray2 = state[action.key].slice()
        newArray2.shift()
        newArray2.push(action.payload)
        return {...state, [action.key]: newArray2 }
        
      default:
        return state;
    }
  }
  
  export default rootReducer
  