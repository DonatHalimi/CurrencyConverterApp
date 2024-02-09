import { Autocomplete, Grid, Skeleton, TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react';

const SelectCountry = (props) => {
    const { value, setValue, label } = props
    const [data, setData] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoaded(false);
                const response = await axios.get("https://restcountries.com/v3.1/all")
                setData(response.data)
                setLoaded(true)
            } catch (error) {
                setError(error)
                setLoaded(true)
            }
        };

        fetchData();
    }, []);

    if (!loaded) {
        return (
            <Grid item xs={12} md={3}>
                <Skeleton variant="rounded" height={60} />
            </Grid>
        );
    }

    if (error) {
        return <div>Something went wrong!</div>
    }

    const dataFilter = data.filter(item => "currencies" in item);
    const dataCountries = dataFilter.map(item =>
        `${item.flag} ${Object.keys(item.currencies)[0]} - ${item.name.common}`
    );

    return (
        <Grid item xs={12} md={3}>
            <Autocomplete
                value={value}
                disableClearable
                onChange={(event, newValue) => {
                    setValue(newValue)
                }}
                options={dataCountries}
                renderInput={(params) => <TextField {...params} label={label} />}
            />
        </Grid>
    );
};

export default SelectCountry