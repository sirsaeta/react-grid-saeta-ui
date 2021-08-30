import { DialogContent, Dialog, Grid, IconButton } from '@material-ui/core';
import { useState } from 'react';
import 'moment/locale/ar';
import { FilterRowsProps } from './types';
import AddIcon from '@material-ui/icons/Add';
import FilterFields from './FilterFields';

export default function FilterRows({ open, handleClose, columns }: any) {
    const [filters, setFilters] = useState([{
        id: 0,
        key: "",
        value: "",
        type: "like",
        valueTo: ""
    }]);

    const changeData = (position: number, dato: string, value: any) => {
        let newFilter = [...filters];
        let filter = {
            ...filters[position]
        }
        switch (dato) {
            case "key":
                filter.key = value;
                break;
            case "type":
                filter.type = value;
                break;
            case "value":
                filter.value = value;
                break;
            case "valueTo":
                filter.valueTo = value;
                break;
            default:
                break;
        }
        newFilter.splice(position, 1, filter)
        setFilters([...newFilter]);
    }

    const addRowFilters = () => {
        setFilters([
            ...filters,
            {
                id: filters.length,
                key: "",
                value: "",
                type: "like",
                valueTo: ""
            }
        ]);
    };

    const dropRowFilters = (key: number) => {
        setFilters([...filters.filter((x: FilterRowsProps) => x.id !== key)]);
    };

    const close = () => {
        handleClose(filters);
    }

    return (
        <div>
            <Dialog open={open} onClose={close} aria-labelledby="form-dialog-title" maxWidth={"lg"} fullWidth>
                <DialogContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            {
                                filters.map((f: FilterRowsProps) =>
                                    <FilterFields
                                        columns={columns}
                                        drop={() => dropRowFilters(f.id || 0)}
                                        data={f}
                                        changeData={changeData}
                                    />)
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <IconButton color="primary" aria-label="add more filter"
                                onClick={addRowFilters}
                            >
                                <AddIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </div>
    );
}
