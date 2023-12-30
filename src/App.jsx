import { useEffect, useState } from "react";


const App = () => {
  const [amount, setAmount] = useState(null)
  const [to, setTo] = useState("BRL")
  const [from, setFrom] = useState("USD")
  const [exchange, setExchange] = useState(null)
  console.log(exchange, amount);

  useEffect(() => {
    if(amount === null) {
      return
    }

    const toFrom = from + to

    const idTimeOut = setTimeout(() => {
      fetch(`https://economia.awesomeapi.com.br/json/last/${from}-${to}`)
      .then(data => data.json())
      .then(resp => {
        setExchange(((resp[toFrom]?.ask) * amount).toFixed(2))
        setAmount(null)
      })
      .catch(console.log)
    }, 1000)

    return () => clearTimeout(idTimeOut)
  }, [amount, to, from])

  useEffect(() => {
    if(exchange <= 0) {
      return
    }

    document.title = `${exchange} | ${to}`
    return () => document.title = `Conversor de moedas`
  }, [exchange])

  const handleChangeAmount = (e) => {
    setAmount(Number(e.target.value))
  }

  const handleChangeTo = (e) => {
    setTo(e.target.value)
  }

  const handleChangeFrom = (e) => {
    setFrom(e.target.value)
  }

  return (
    <>
      <input type="number" autoFocus value={amount === null ? 0 : amount} onChange={handleChangeAmount}/>

      <div className="selects">
        <select value={from} onChange={handleChangeFrom}>
          <option value="BRL">BRL</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
        <select value={to} onChange={handleChangeTo}>
          <option value="BRL">BRL</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
      </div>

      {exchange > 0 && <h2>{exchange} {to}</h2>}
    </>  
  )
}

export default App;
