import moment from 'moment';
import React, {useState, useEffect} from 'react'

// This is an implementation of custom hooks for fetching currency converion rates
function useCurrencyInfo(currency) {
  const [data, setData] = useState({});

  useEffect(() => {
    let url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${moment().format('yyyy-MM-DD')}/v1/currencies/${currency}.json`

    fetch(url)
    .then(res => res.json())
    .then(res => {
      setData(res[currency])
    })
  }, [currency])

  return data
}

export default useCurrencyInfo