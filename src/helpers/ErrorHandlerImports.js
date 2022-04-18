const dispatch = useDispatch()
import { setError } from './reducers/errorSlice'


//put in the catch statement
renderUserError(error)

//put below fetch
function renderUserError(error) {
    console.log("error render", error)
    const newError = {
      text: error.statusText,
      occurred: true, 
      code: error.status
    }
    dispatch(setError(newError))
  }