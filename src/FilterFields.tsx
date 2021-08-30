import { FormControl, TextField, Select, InputLabel, MenuItem, Grid, IconButton } from '@material-ui/core';
import { useState } from 'react';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import 'moment/locale/ar';
import CancelIcon from '@material-ui/icons/Cancel';
import { FilterRowsProps } from './types';

type Props = {
    columns: any,
    drop: () => void,
    data: FilterRowsProps,
    changeData: (position: number, dato: string, value: any) => void
}

export default function FilterFields({ columns, drop, data, changeData }: Props) {
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        changeData(data.id || 0, "key", event.target.value as string);
    };
    const handleChangeType = (event: React.ChangeEvent<{ value: unknown }>) => {
        changeData(data.id || 0, "type", event.target.value as string);
    };
    const handleChangeValue = (event: React.ChangeEvent<{ value: unknown }>) => {
        changeData(data.id || 0, "value", event.target.value as string);
    };
    return (
        <Grid container spacing={2}>
            <Grid item xs={2}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Columns</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="column"
                        value={data.key}
                        onChange={handleChange}
                        autoWidth
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {
                            columns.filter((element: any) => (element.key !== 'actions' && element.hideFilterRow !== true)).map((element: any) => <MenuItem value={element.key} key={element.key}>{element.field}</MenuItem>)
                        }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={3}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="condition"
                        value={data.type}
                        onChange={handleChangeType}
                        autoWidth
                    >
                        <MenuItem value="like">Contiene</MenuItem>
                        <MenuItem value="fromTo">Desde/Hasta</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={data.type === 'like' ? 6 : 3}>
                <FormControl fullWidth>
                    {
                        data.type !== 'like' ?
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    id="value"
                                    value={moment(data.value).isValid() ? data.value : null}
                                    onChange={(e) => changeData(data.id || 0, "value", e ? `${e.toISOString()}` : '')}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                            :
                            <TextField id="value" value={data.value} onChange={handleChangeValue} label={"Value"} variant="filled" size="small" placeholder="Filter value" color="primary" />
                    }
                </FormControl>
            </Grid>
            {data.type !== 'like' &&
                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="valueTo"
                                value={moment(data.valueTo).isValid() ? data.valueTo : null}
                                onChange={(e) => {
                                    changeData(data.id || 0, "valueTo", e ? `${e.toISOString()}` : '');
                                }}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </FormControl>
                </Grid>
            }
            <Grid item xs={1}>
                {data.id !== 0 && <IconButton color="primary" aria-label="Delete filter"
                    onClick={drop}
                >
                    <CancelIcon />
                </IconButton>}
            </Grid>
        </Grid>
    );
}