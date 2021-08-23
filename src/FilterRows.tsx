import { FormControl, TextField, Select, InputLabel, MenuItem,DialogContent, Dialog, Grid } from '@material-ui/core';
import { useState } from 'react';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import 'moment/locale/ar';

export default function FilterRows({open, handleClose, columns}:any) {
    const [column, setColumn] = useState("");
    const [type, setType] = useState("like");
    const [value, setValue] = useState("");
    const [valueTo, setValueTo] = useState("");
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setColumn(event.target.value as string);
    };
    const handleChangeType = (event: React.ChangeEvent<{ value: unknown }>) => {
        setType(event.target.value as string);
    };
    const handleChangeValue = (event: React.ChangeEvent<{ value: unknown }>) => {
        setValue(event.target.value as string);
    };

    const close = () => {
        handleClose(column, value, type, valueTo);
    }
  return (
    <div>
      <Dialog open={open} onClose={close} aria-labelledby="form-dialog-title" maxWidth={"lg"} fullWidth>
        <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Columns</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="column"
                    value={column}
                    onChange={handleChange}
                    autoWidth
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {
                            columns.filter((element: any) => (element.key!=='actions' && element.hideFilterRow!==true)).map((element:any) => <MenuItem value={element.key} key={element.key}>{element.field}</MenuItem>)
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
                    value={type}
                    onChange={handleChangeType}
                    autoWidth
                    >
                        <MenuItem value="like">Contiene</MenuItem>
                        <MenuItem value="fromTo">Desde/Hasta</MenuItem>
                    </Select>
                </FormControl>
                </Grid>
                <Grid item xs={type==='like' ? 6 : 3}>
                <FormControl fullWidth>
                    {
                        type!=='like' ?
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="value"
                            value={moment(value).isValid() ? value : null}
                            onChange={(e)=>setValue(e ? `${e.toISOString()}` : '')}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            />
                        </MuiPickersUtilsProvider>
                        :
                        <TextField id="value" value={value} onChange={handleChangeValue} label={"Value"} variant="filled" size="small" placeholder="Filter value" color="primary" />
                    }
                </FormControl>
                </Grid>
                {type!=='like' &&                    
                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="valueTo"
                            value={moment(valueTo).isValid() ? valueTo : null}
                            onChange={(e)=>setValueTo(e ? `${e.toISOString()}` : '')}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            />
                        </MuiPickersUtilsProvider>
                    </FormControl>
                </Grid>
                }
            </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}