import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'
import useCurrencyNames from './hooks/useCurrencyNames'
import swap from './assets/swap.png'
import moment from 'moment'
import getCurrencySymbol from 'currency-symbols';

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(0)
  const [infoDate, setInfoDate] = useState(moment().format('yyyy-MM-DD'));

  const swapCurrency = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  const currencyInfo = useCurrencyInfo(from, infoDate, setInfoDate);
  const currencyNames = useCurrencyNames();
  const options = Object.keys(currencyInfo);
  const BackgroundImage = `https://images.pexels.com/photos/8199870/pexels-photo-8199870.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`

  const convertCurrency = useCallback((amount_to_convert=amount) => {
    if(currencyInfo[to]) {
        let converted_amount = ((amount_to_convert) * currencyInfo[to]).toFixed(2);
        setConvertedAmount(parseFloat(converted_amount));
    }
  }, [currencyInfo,to])


  useEffect(() => {
    convertCurrency()
  }, [currencyInfo, to])
  

  return (
    <div className='bg-blue-200'>
      <div
            className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
            style={{
                backgroundImage: `url('${BackgroundImage}')`,
            }}
        >
            <div className="w-full">
                <div className="w-full max-w-md mx-auto border border-none rounded-lg p-5 backdrop-blur-sm bg-white/30">
                    <h1 className='text-3xl font-bold text-center text-gray-800 mb-5'>Currency Converter</h1>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            convertCurrency()
                        }}
                    >
                        <div className="w-full mb-1">
                            <InputBox
                                label="From"
                                amount={amount} 
                                onAmountChange={(amount) => setAmount(amount)}
                                selectedCurrency={from}
                                currencyNames={currencyNames}
                                onCurrencyChange={(currency) => {
                                  setFrom(currency)
                                }}
                                onConvert={(amount) => convertCurrency(amount)}
                                currencyOptions={options}
                                getCurrencySymbol={getCurrencySymbol}
                            />
                        </div>
                        <div className="relative w-full h-0.5">
                            <button
                                type="button"
                                className="btn-swap absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-blue-600 border-1 border-blue-600 text-white px-1 py-1"
                                onClick={swapCurrency}
                            >
                                <img src={swap} alt="swap" className='w-7.5' />
                            </button>
                        </div>
                        <div className="w-full mt-1 mb-4">
                            <InputBox
                                label="To"
                                amount={convertedAmount} 
                                onAmountChange={(amount) => setConvertedAmount(parseFloat(amount.toFixed(2)))}
                                selectedCurrency={to} 
                                currencyNames={currencyNames}
                                onCurrencyChange={(currency) => {
                                  setTo(currency)
                                }}
                                currencyOptions={options}
                                getCurrencySymbol={getCurrencySymbol}
                                amountDisable
                            />
                        </div>

                        {currencyInfo && <p className='text-center text-gray-800 mt-2'>Exchange Rates were last updated on {moment().subtract(1,'days').format('DD MMM, yyyy')}</p>}
                    </form>
                </div>
            </div>
      </div>
    </div>
  )
}

export default App
