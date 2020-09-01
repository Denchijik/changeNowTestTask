import React, { useEffect,useState, useCallback } from 'react';
import classNames from 'classnames';
import * as ExchangeRateService from './ExchangeRateService'
import './styles.css'

//Time in milliseconds
const UPDATE_INTERVAL = 100000;

const ExchangeRate= () => {
  const [exchangeRate, setExchangeRate] = useState(0);
  const [exchangeRateDiff, setExchangeRateDiff] = useState(0);

  const updateExchangeRate = useCallback(() => {
    ExchangeRateService.getExchangeRate()
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.warn(data);
        if (data.price) {
          if (exchangeRate !== 0) {
            const diff = ((data.price - exchangeRate) / exchangeRate).toFixed(6);
            setExchangeRateDiff(diff);
          }
          setExchangeRate(Number(data.price).toFixed(6));
        }
      });
  }, [exchangeRate]);

  useEffect(() => {
    updateExchangeRate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const interval = setInterval(updateExchangeRate, UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, [updateExchangeRate])

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