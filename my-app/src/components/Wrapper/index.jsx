import React from 'react';
import { useDispatch } from 'react-redux';
import ExchangeRate from "../ExchangeRate";
import { setIsTabActive } from "../App/duck"

const Wrapper = () => {
    const dispatch = useDispatch();
    document.addEventListener('visibilitychange', () => {
      dispatch(setIsTabActive(document.visibilityState==='visible'));    
    });

    return (
        <ExchangeRate />
    )
}

export default Wrapper;