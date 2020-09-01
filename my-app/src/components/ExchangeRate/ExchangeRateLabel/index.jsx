import React from 'react';
import classNames from 'classnames';
import './styles.css'

const ExchangeRateLabel = (props) => {
  const {exchangeRate, exchangeRateDiff} = props;
  console.warn("Render!");

  return (
    <>
      ETH/BTC:
      <p className={classNames(
        'rate',
        {
          'rate-increase': exchangeRateDiff > 0,
          'rate-decrease': exchangeRateDiff < 0
        })}>
        <span className='current-rate'>
          {exchangeRate}
        </span>
        <span className='rate-difference'>
          {exchangeRateDiff > 0 ? '+' : ''}{exchangeRateDiff}%
        </span>
      </p>
    </>
  )
}

export default ExchangeRateLabel;