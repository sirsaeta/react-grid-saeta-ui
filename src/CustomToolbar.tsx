import { createStyles, Button, ButtonGroup, makeStyles, Theme, Toolbar, Typography } from '@material-ui/core';
import { EnhancedTableToolbarProps } from "./types"
import FilterListIcon from '@material-ui/icons/FilterList';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import ViewWeekIcon from '@material-ui/icons/ViewWeek';
import { CSVLink } from "react-csv";
import { useState } from 'react';
import FilterColumns from './FilterColumns';
import FilterRows from './FilterRows'
import { filterRowsExport } from './Funtions'

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    title: {
      flex: '1 1 100%',
    },
  }),
);

const CustomToolbar = (props: EnhancedTableToolbarProps) => {
	const classes = useToolbarStyles();
	const { title, exportProps, filterProps, handleChangeFiltersRows } = props;
	
	const [openFilterColumns, setOpenFilterColumns] = useState(false);
	const [openFilterRows, setOpenFilterRows] = useState(false);

	const handleClickOpenFilterColumns = () => {
	  setOpenFilterColumns(true);
	};
  
	const handleCloseFilterColumns = () => {
	  setOpenFilterColumns(false);
	};

	const handleClickOpenFilterRows = () => {
		setOpenFilterRows(true);
	};
	
	const [columnFilterRows, setColumnFilterRows] = useState("");
	const [valueFilterRows, setValueFilterRows] = useState("");
	const [valueToFilterRows, setValueToFilterRows] = useState("");
	const [typeFilterRows, setTypeFilterRows] = useState("like");
  
	const handleCloseFilterRows = (column: any, value:any, type:any, valueTo:any) => {
		setOpenFilterRows(false);
		handleChangeFiltersRows(column, value, type, valueTo);
		setColumnFilterRows(column);
		setValueFilterRows(value);
		setValueToFilterRows(valueTo);
		setTypeFilterRows(type);
	};

	const {data, headers, filename} = exportProps;
	let dataFilter = data.filter((row:any)=>valueFilterRows!=="" ? filterRowsExport(row,columnFilterRows,valueFilterRows,typeFilterRows||'like',valueToFilterRows||''): true)

	return (
	  <Toolbar
		className={classes.root}
	  >
		  <FilterRows open={openFilterRows} handleClose={handleCloseFilterRows} {...filterProps} />
		<FilterColumns open={openFilterColumns} handleClose={handleCloseFilterColumns} {...filterProps} />
		<Typography className={classes.title} variant="h6" id="tableTitle" component="div">
			{title}
		</Typography>
		
		<ButtonGroup variant="text" color="primary" aria-label="text primary button group">
			<Button
				size="small"
				color="primary"
				startIcon={<ViewWeekIcon />}
				onClick={handleClickOpenFilterColumns}
				>
				Columns
			</Button>
			<Button
				size="small"
				color="primary"
				startIcon={<FilterListIcon />}
				onClick={handleClickOpenFilterRows}
				>
				Filters
			</Button>
			{exportProps && <CSVLink data={dataFilter} headers={headers} filename={filename} style={{textDecoration:"none"}}>
				<Button
					size="small"
					color="primary"
					startIcon={<CloudDownloadIcon />}
					>
					Export
				</Button>
			</CSVLink>}
		</ButtonGroup>
	  </Toolbar>
	);
};

export default CustomToolbar