import React, {useState, useEffect} from 'react'

// This is an implementation of custom hooks for fetching curerency names
function useCurrencyNames() {
    const [data, setData] = useState({});
  
    useEffect(() => {
      let url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json`
  
      fetch(url)
      .then(res => res.json())
      .then(res => setData(res))
    }, [])
  
    return data
  }

export default useCurrencyNames