import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import useRecursiveTimeout from '../../hooks/useRecoursiveTimeout'
import * as ExchangeRateService from './ExchangeRateService'
import { isTabActiveSelector } from '../../selectors/appSelector';
import ExchangeRateLabel from './ExchangeRateLabel/index'

//Time in milliseconds
const UPDATE_INTERVAL = 10000;

const ExchangeRate = () => {
  const [exchangeRate, setExchangeRate] = useState(0);
  const [exchangeRateDiff, setExchangeRateDiff] = useState(0);
  const isTabActive = useSelector(isTabActiveSelector);

  const updateExchangeRate = useCallback(async () => {
    const response = await ExchangeRateService.getExchangeRate();
    const data = await response.json();
    if (data.price) {
      if (exchangeRate !== 0) {
        const diff = ((data.price - exchangeRate) / exchangeRate);
        const newDiff = diff !==0 ? diff.toFixed(6) : 0;
        setExchangeRateDiff(newDiff);
      }
      setExchangeRate(Number(data.price).toFixed(6));
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

  return (
    <>
      <ExchangeRateLabel exchangeRate={exchangeRate} exchangeRateDiff={exchangeRateDiff} />
    </>
  )
}

export default ExchangeRate;