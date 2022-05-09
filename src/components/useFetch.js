// using a custom Axios fetch here

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from "react-redux"
import { showSpinner, hideSpinner } from '../reducers/spinnerSlice'
import setError from '../reducers/errorSlice'

axios.defaults.baseURL = 'https://tidings-server.herokuapp.com';

    export const useFetch = ({ url, method, body = null, headers = null }) => {
        const [response, setResponse] = useState(null);
        const [errorObj, setErrorObj] = useState('');
        const [loading, setloading] = useState(true);
        const dispatch = useDispatch()
        const fetchData = () => {
            dispatch(showSpinner())
            axios[method](url, JSON.parse(headers), JSON.parse(body))
                .then((res) => {
                    setResponse(res.data);
                    dispatch(hideSpinner())
                })
                .catch((err) => {
                    setErrorObj(err);
                    renderUserError(err)
                    dispatch(hideSpinner())
                })
                .finally(() => {
                    setloading(false);
                    dispatch(hideSpinner())
                });
                dispatch(hideSpinner())
        };
    
        useEffect(() => {
            fetchData();
        }, [method, url, body, headers]);

        function renderUserError(error) {
            console.log("error render", error)
            const newError = {
              text: error.message,
              occurred: true, 
              code: 500
            }
            dispatch(setError(newError))
          
          }
    
        return { response, errorObj, loading };
    };

