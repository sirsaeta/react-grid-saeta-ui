import { PropsRowSubFooter, RowBody, CellBody } from "./types"
import { TableBody, TableRow, TableCell } from '@material-ui/core';

const CustomGridSubFooter = ({ rows, columns }: PropsRowSubFooter) => {
	return(
		<TableBody>
            {rows.map((rowsBody: RowBody, key:number) =>(
				<TableRow key={key} {...rowsBody.tableRowProps} style={rowsBody.style}>
					{
						rowsBody.cells.map((x: CellBody) =>(
							<TableCell key={x.key} {...x.tableCellProps} style={columns?.filter((column: any)=>column.key===x.key)[0]?.tableCellProps?.hidden ? {display:'none'}:{}} >{x.field}</TableCell>
						))
					}
				</TableRow>
            ))}
		</TableBody>
	)
}

export default CustomGridSubFooter
