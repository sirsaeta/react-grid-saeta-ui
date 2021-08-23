import { PropsGridHead, CellHead } from "./types"
import { TableHead, TableRow, TableCell, TableSortLabel, makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }),
);

const CustomGridHead = ({ columns, order, orderBy, onRequestSort }: PropsGridHead) => {
	const classes = useStyles();
	const createSortHandler = (property: string | undefined) => (event: React.MouseEvent<unknown>) => {
		onRequestSort(event, property||'');
	};
	return(
		<TableHead>
			<TableRow style={{height: '60px'}}>
				{
					columns.map((headCell: CellHead) =>(
						<TableCell {...headCell.tableCellProps} style={headCell.tableCellProps?.hidden ? {display:'none'}:{}} 
						sortDirection={orderBy === headCell.key ? order : false}>
							<TableSortLabel
								active={orderBy === headCell.key}
								direction={orderBy === headCell.key ? order : 'asc'}
								onClick={createSortHandler(headCell.key)}
							>
							{headCell.field}
							{orderBy === headCell.key ? (
								<span className={classes.visuallyHidden}>
								{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</span>
							) : null}
							</TableSortLabel>
						</TableCell>
					))
				}
			</TableRow>
		</TableHead>
	)
}

export default CustomGridHead
