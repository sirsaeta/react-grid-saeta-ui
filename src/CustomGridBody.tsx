import { PropsRowBody, RowBody, CellBody } from "./types"
import { TableBody, TableRow, TableCell } from '@material-ui/core';
import { filterRows, getComparator, stableSort } from './Funtions'

const CustomGridBody = ({ rows, page, rowsPerPage, columns, filterRowsProps, collapsible, order, orderBy }: PropsRowBody) => {
	let desde = (page || 0) * (rowsPerPage || 9999) * (collapsible ? 2 : 1);
	let hasta = (page || 0) * (rowsPerPage || 9999) * (collapsible ? 2 : 1) + (rowsPerPage || 9999) * (collapsible ? 2 : 1);
	return(
		<TableBody>
            {stableSort(rows, getComparator(order, orderBy))
			.filter((row)=>filterRowsProps ? filterRows(row,filterRowsProps.key,filterRowsProps.value,filterRowsProps.type||'like',filterRowsProps.valueTo||''): true)
                .slice(desde, hasta)
				.map((rowsBody: RowBody) =>(
				<TableRow {...rowsBody.tableRowProps} style={rowsBody.style}>
					{
						rowsBody.cells.map((x: CellBody) =>(
							<TableCell {...x.tableCellProps} style={columns?.filter((column)=>column.key===x.key)[0]?.tableCellProps?.hidden ? {display:'none'}:{}} >{x.field}</TableCell>
						))
					}
				</TableRow>
            ))}
		</TableBody>
	)
}

export default CustomGridBody
