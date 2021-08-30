import { createStyles, Button, ButtonGroup, makeStyles, Theme, Toolbar, Typography } from '@material-ui/core';
import { EnhancedTableToolbarProps, FilterRowsProps } from "./types"
import FilterListIcon from '@material-ui/icons/FilterList';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import ViewWeekIcon from '@material-ui/icons/ViewWeek';
import { useState } from 'react';
import FilterColumns from './FilterColumns';
import FilterRows from './FilterRows';
import ExportGrid from './ExportGrid';

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
	const [openExportOptions, setOpenExportOptions] = useState(false);

	const handleClickOpenFilterColumns = () => {
		setOpenFilterColumns(true);
	};

	const handleCloseFilterColumns = () => {
		setOpenFilterColumns(false);
	};

	const handleClickOpenFilterRows = () => {
		setOpenFilterRows(true);
	};

	const handleCloseFilterRows = (filters: FilterRowsProps[]) => {
		setOpenFilterRows(false);
		handleChangeFiltersRows(filters);
	};

	return (
		<Toolbar
			className={classes.root}
		>
			<FilterRows open={openFilterRows} handleClose={handleCloseFilterRows} {...filterProps} />
			<FilterColumns open={openFilterColumns} handleClose={handleCloseFilterColumns} {...filterProps} />
			{exportProps &&
				<ExportGrid
					open={openExportOptions}
					handleClose={() => setOpenExportOptions(false)}
					exportProps={exportProps}
				/>
			}
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
				{exportProps &&
					<Button
						size="small"
						color="primary"
						startIcon={<CloudDownloadIcon />}
						onClick={() => setOpenExportOptions(true)}
					>
						Export
					</Button>
				}
			</ButtonGroup>
		</Toolbar>
	);
};

export default CustomToolbar