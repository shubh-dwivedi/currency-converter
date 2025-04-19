import moment from 'moment';
import React, {useState, useEffect} from 'react'

// This is an implementation of custom hooks for fetching currency converion rates
function useCurrencyInfo(currency, infoDate, setInfoDate) {
  const [data, setData] = useState({});

  const fetchCurrencyInfo = async (url) => {
    try {
      let response = await fetch(url);
  
      if (!response.ok) {
        let status = response.status
        if(status === 404) {
          let new_date = moment(infoDate).subtract(1, 'days').format('yyyy-MM-DD');
          url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${new_date}/v1/currencies/${currency}.json`;
          setInfoDate(new_date)
          fetchCurrencyInfo(url)
        }
        throw new Error(`Response status: ${status}`);
      }

      const currency_data = await response.json();
      setData(currency_data[currency])
      setInfoDate(currency_data.date);
    } catch (error) {
      // console.log(error)
    }
  }

  useEffect(() => {
    let url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${infoDate}/v1/currencies/${currency}.json`;

    fetchCurrencyInfo(url);
  }, [currency])

  return data
}

export default useCurrencyInfo