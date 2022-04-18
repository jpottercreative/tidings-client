import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { setCurrentUser } from "../../reducers/userSlice"
import { setError } from '../../reducers/errorSlice'
import { showSpinner } from '../../reducers/spinnerSlice'


export const useRevoke = () => {
    const dispatch = useDispatch()
    let navigate = useNavigate()

    console.log("revoking token and redirecting")
    localStorage.removeItem("token")
    dispatch(setCurrentUser({
      email: "",
      token: "",
      loggedIn: false
    }))
    navigate("/", {replace: true})
    setTimeout(() => {dispatch(showSpinner())}, 900)
    dispatch(setError({
      text: "Please Login",
      occurred: true, 
      code: 401
    }))
}