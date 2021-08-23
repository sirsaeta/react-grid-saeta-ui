import { CustomGridHead, CustomGridBody, CustomToolbar, CustomGridSubFooter } from "./index"
import { Paper, TableContainer, Table, TablePagination, createStyles, makeStyles } from '@material-ui/core';
import { Order, PropsCustomGrid } from "./types"
import React from "react";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
		width:"92vw",
	  	maxHeight: "70vh",
		backgroundColor: 'transparent'
    }
  })
);

const CustomGrid = (props: PropsCustomGrid) => {
	const { rowsBody, cellsHead, pageSize, rowsSubFooter, tableProps, containerProps, toolbarProps, rowsPerPageOptions, collapsible, pageParent, changePage, orderDefault, orderByDefault } = props;
	const classes = useStyles();
	const [page, setPage] = React.useState(pageParent || 0);
	const [rowsPerPage, setRowsPerPage] = React.useState(pageSize || 0);
	const handleChangePage = (event: unknown, newPage: number) => {
		changePage && changePage(newPage);
		setPage(newPage);
	};
	
	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	
	const [filterKey, setFilterKey] = React.useState("");
	const [filterValue, setFilterValue] = React.useState("");
	const [filterType, setFilterType] = React.useState("like");
	const [filterValueTo, setFilterValueTo] = React.useState("");
	
	const handleChangeFiltersRows = (column :string, value :string, type: string, valueTo: string) => {
		setFilterKey(column);
		setFilterValue(value);
		setFilterType(type);
		setFilterValueTo(valueTo)
	};
	
	const [order, setOrder] = React.useState<Order>(orderDefault || 'asc');
	const [orderBy, setOrderBy] = React.useState<string>(orderByDefault || cellsHead[0].field);

	const handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};
	
	return(
		<div className={`customGrid`}>
			{toolbarProps && <CustomToolbar {...toolbarProps} handleChangeFiltersRows={handleChangeFiltersRows} />}
			<TableContainer 
			{...containerProps} 
			className={classes.container} 
			component={(props: any) => <Paper variant={"outlined"} className={classes.container} {...props} elevation={2} />}>
				<Table 
				{...tableProps} 
				style={{ minWidth: 650, whiteSpace:"nowrap" }} 
				aria-label="simple table">
					<CustomGridHead
						columns={cellsHead}
						order={order}
						orderBy={orderBy}
						onRequestSort={handleRequestSort}
					/>
					<CustomGridBody
						rows={rowsBody}
						rowsPerPage={rowsPerPage}
						page={page}
						collapsible={collapsible}
						columns={cellsHead}
						order={order}
						orderBy={orderBy}
						filterRowsProps = {filterKey!=="" && filterValue!=="" && {key:filterKey,value:filterValue,type:filterType,valueTo:filterValueTo} || undefined}
					/>
					{rowsSubFooter &&
						<CustomGridSubFooter
							rows={rowsSubFooter}
						/>
					}
				</Table>
			</TableContainer>
			{pageSize &&
			<TablePagination
				rowsPerPageOptions={rowsPerPageOptions || [5, 10, 25]}
				component="div"
				count={collapsible ? rowsBody.length/2 : rowsBody.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>}
		</div>
	)
}

export default CustomGrid
