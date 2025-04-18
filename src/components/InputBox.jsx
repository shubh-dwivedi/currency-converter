import React, { useId } from 'react'

// This is an implementation of a reusabe component
function InputBox({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = ["usd"],
    selectedCurrency = "usd",
    amountDisable = false,
    currencyDisable = false,
    currencyNames = [],
    onConvert,
    getCurrencySymbol,

    
    className = "",
}) {
   
    const amountInputId = useId();

    return (
        <div key={label} className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
            <div className="w-1/2">
                <label htmlFor={amountInputId} className="text-black/40 mb-2 inline-block">
                    {label}
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-0.5 pointer-events-none">
                        {getCurrencySymbol(selectedCurrency.toUpperCase())}
                    </div>
                    <input
                        id={amountInputId}
                        className="outline-none w-full border-t-gray-900 bg-transparent py-1.5 block ps-4"
                        type="number"
                        placeholder="Amount"
                        disabled={amountDisable}
                        value={amount}
                        onChange={(e) => {
                            if(e.target.value < 0) {
                                if(onAmountChange) onAmountChange(Number(0))
                                // if(onConvert) onConvert(0)
                            } else {
                                if(onAmountChange) onAmountChange(Number(e.target.value))
                                if(onConvert) onConvert(e.target.value)
                            }
                        }}
                    />
                </div>
            </div>
            <div className="w-1/2 flex flex-wrap justify-end text-right">
                <p className="text-black/40 mb-2 w-full">Currency Type</p>
                <select
                    className="rounded-lg px-1 py-1 w-20 bg-gray-100 cursor-pointer outline-none"
                    value={selectedCurrency}
                    onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                    disabled={currencyDisable}
                    title={currencyNames[selectedCurrency]}
                >
                    {currencyOptions.map((currency,index) => (<option key={`${index}-${label}-${currency}`} value={currency}>{currency.toUpperCase()}</option>))}
                </select>
            </div>
        </div>
    );
}

export default InputBox;