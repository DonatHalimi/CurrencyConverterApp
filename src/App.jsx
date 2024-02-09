import { Container, Grid, Typography } from '@mui/material'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import InputAmount from './components/InputAmount'
import ResultDisplay from './components/ResultDisplay'
import SelectCountry from './components/SelectCountry'
import SwitchCurrency from './components/SwitchCurrency'
import { CurrencyContext } from './context/CurrencyContext'

function App() {
  const {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    firstAmount,
    setFirstAmount
  } = useContext(CurrencyContext)

  const [resultCurrency, setResultCurrency] = useState(0)
  const codeFromCurrency = fromCurrency.split(" ")[1]
  const codeToCurrency = toCurrency.split(" ")[1]

  useEffect(() => {
    if (firstAmount) {
      axios("https://api.freecurrencyapi.com/v1/latest", {
        params: {
          apikey: import.meta.env.VITE_API_KEY,
          base_currency: codeFromCurrency,
          currencies: codeToCurrency
        }
      })
        .then(response => setResultCurrency(response.data.data[codeToCurrency]))
        .catch(error => console.log(error))
    }
  }, [firstAmount, fromCurrency, toCurrency])

  const boxStyles = {
    background: "#fdfdfd",
    marginTop: "10rem",
    textAlign: "center",
    color: "#222",
    minHeight: "20rem",
    borderRadius: 2,
    padding: "4rem 2rem",
    boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)"
  }

  return (
    <Container maxWidth="md" sx={boxStyles}>
      <Typography variant='h5' sx={{ marginBottom: "2rem" }}>
        Get Real-Time Exchange Rates, Instantly
      </Typography>

      <Grid container spacing={2}>
        <InputAmount />
        <SelectCountry value={fromCurrency} setValue={setFromCurrency} label="From" />
        <SwitchCurrency />
        <SelectCountry value={toCurrency} setValue={setToCurrency} label="To" />
      </Grid>

      {firstAmount && (
        <ResultDisplay
          firstAmount={firstAmount}
          fromCurrency={fromCurrency}
          resultCurrency={resultCurrency}
          toCurrency={toCurrency}
        />
      )}
    </Container>
  )
}

export default App
