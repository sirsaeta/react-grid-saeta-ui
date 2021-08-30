import { CustomGridHead, CustomGridBody, CustomToolbar, CustomGridSubFooter } from "./index"
import { Paper, TableContainer, Table, TablePagination, createStyles, makeStyles } from '@material-ui/core';
import { FilterRowsProps, Order, PropsCustomGrid } from "./types"
import React from "react";
import { filterRows, filterRowsExport } from "./Funtions";

const useStyles = makeStyles(() =>
	createStyles({
		container: {
			width: "92vw",
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
	let sampleFilters: FilterRowsProps = {
		id: 0,
		key: "",
		value: "",
		type: "like",
		valueTo: ""
	};

	const [filters, setFilters] = React.useState([sampleFilters]);

	const handleChangeFiltersRows = (filtersData: FilterRowsProps[]) => {
		setFilters(filtersData.filter((f: FilterRowsProps) => f.key !== '' && f.value !== ''));
	};

	const [order, setOrder] = React.useState<Order>(orderDefault || 'asc');
	const [orderBy, setOrderBy] = React.useState<string>(orderByDefault || cellsHead[0].field);

	const handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	let data = [...rowsBody];
	if (filters && filters?.length > 0)
		filters.map((fr) =>
			data = data.filter((row) => filterRows(row, fr))
		)

	let dataExport: any[] = (toolbarProps && toolbarProps.exportProps.data) ? [...toolbarProps.exportProps.data] : [];
	if (filters && filters?.length > 0)
		filters.map((fr) =>
			dataExport = dataExport.filter((row) => filterRowsExport(row, fr))
		)

	return (
		<div className={`customGrid`}>
			{toolbarProps && <CustomToolbar {...toolbarProps}
				exportProps={{
					...toolbarProps.exportProps,
					data: dataExport
				}}
				handleChangeFiltersRows={handleChangeFiltersRows} />}
			<TableContainer
				{...containerProps}
				className={classes.container}
				component={(props: any) => <Paper variant={"outlined"} className={classes.container} {...props} elevation={2} />}>
				<Table
					{...tableProps}
					style={{ minWidth: 650, whiteSpace: "nowrap" }}
					aria-label="simple table">
					<CustomGridHead
						columns={cellsHead}
						order={order}
						orderBy={orderBy}
						onRequestSort={handleRequestSort}
					/>
					<CustomGridBody
						rows={data}
						rowsPerPage={rowsPerPage}
						page={page}
						collapsible={collapsible}
						columns={cellsHead}
						order={order}
						orderBy={orderBy}
						filterRowsProps={filters || undefined}
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
					count={collapsible ? data.length / 2 : data.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>}
		</div>
	)
}

export default CustomGrid
