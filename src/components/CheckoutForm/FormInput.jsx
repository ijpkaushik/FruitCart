import { TextField, Grid } from '@material-ui/core'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

const FormInput = ({ name, label,required }) => {

    const { control } = useFormContext();
    const isError = false;

    return (
        <Grid item xs={12} sm={6}>
            {/* <Controller
                as={TextField}
                name={name}
                control={control}
                label={label}
                fullWidth
                required={required}
                error={isError}
            /> */}
            <Controller
                control={control}
                defaultValue=""
                name={name}
                error={isError}
                render={({ field }) => (
                    <TextField
                        {...field}
                        fullWidth
                        label={label}
                        required={required}
                    />
                )}
            />
        </Grid>
    )
}

export default FormInput
