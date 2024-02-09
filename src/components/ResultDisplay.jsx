import { Box, Typography } from '@mui/material'
import React from 'react'

const ResultDisplay = ({ firstAmount, fromCurrency, resultCurrency, toCurrency }) => {
    return (
        <Box sx={{ textAlign: "left", marginTop: "1rem" }}>
            <Typography>{firstAmount} {fromCurrency} = </Typography>
            <Typography variant='h5' sx={{ marginTop: "5px", fontWeight: "bold" }}>
                {resultCurrency * firstAmount} {toCurrency}
            </Typography>
        </Box>
    );
};

export default ResultDisplay