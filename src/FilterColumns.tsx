import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Switch from '@material-ui/core/Switch';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl, FormGroup, FormControlLabel, TextField } from '@material-ui/core';
import { useState } from 'react';

export default function FilterColumns({open, handleClose, columns, handleChangeViewColumn}:any) {
    const [findColumn, setFindColumn] = useState("");
  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
            <TextField id="filled-basic" value={findColumn} onChange={(e)=>setFindColumn(e.target.value)} label="Find Column" variant="filled" size="small" placeholder="Column title" color="primary" />
        </DialogTitle>
        <DialogContent>
            <FormControl component="fieldset">
                <FormGroup aria-label="position">
                    {
                        columns.filter((element:any)=>(element.field.toLowerCase().includes(findColumn.toLowerCase()) || element.key.toLowerCase().includes(findColumn.toLowerCase())))
                        .map((element:any) => {
                            return <FormControlLabel
                            value={element.key}
                            control={
                                <Switch
                                    checked={!element.tableCellProps.hidden}
                                    onChange={()=>handleChangeViewColumn(element.key)}
                                    color="primary"
                                    name={element.field}
                                    key={element.key}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                            }
                            label={element.field}
                            />;
                        })
                    }
                </FormGroup>
            </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleChangeViewColumn('HALL')} color="primary">
            HIDE ALL
          </Button>
          <Button onClick={()=>handleChangeViewColumn('SALL')} color="primary">
            SHOW ALL
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}