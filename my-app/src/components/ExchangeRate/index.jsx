import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import useRecursiveTimeout from '../../hooks/useRecoursiveTimeout'
import * as ExchangeRateService from './ExchangeRateService'
import { isTabActiveSelector } from '../../selectors/appSelector';
import './styles.css'

//Time in milliseconds
const UPDATE_INTERVAL = 5000;

const ExchangeRate = () => {
  const [exchangeRate, setExchangeRate] = useState(0);
  const [exchangeRateDiff, setExchangeRateDiff] = useState(0);
  const isTabActive = useSelector(isTabActiveSelector);

  const updateExchangeRate = useCallback(async () => {
    const response = await ExchangeRateService.getExchangeRate();
    const data = await response.json();
    if (data.price) {
      if (exchangeRate !== 0) {
        const diff = ((data.price - exchangeRate) / exchangeRate).toFixed(6);
        setExchangeRateDiff(diff);
      }
      setExchangeRate(Number(data.price).toFixed(6));
      console.warn("Ticked!");
    }
  }, [exchangeRate]);

  useEffect(() => {
    async function updateExchangeRateData(){
      updateExchangeRate();
    }
    updateExchangeRateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useRecursiveTimeout(async () => {
    await updateExchangeRate();
  }, isTabActive ? UPDATE_INTERVAL : null);

  const exchangeRateDiffSpan = (
    exchangeRateDiff !== 0 &&
    <span className={classNames(
      {
        'rate-increase': exchangeRateDiff > 0,
        'rate-decrease': exchangeRateDiff < 0
      })}>
      {exchangeRateDiff}%
      </span>
  )

  return (
    <p>
      {exchangeRate} {exchangeRateDiffSpan}
    </p >
  )
}

export default ExchangeRate;