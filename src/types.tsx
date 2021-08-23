import { TableProps, ContainerProps, TableRowProps, TableCellProps } from '@material-ui/core';
import React from 'react';

export type PropsCustomGrid = {
	rowsBody: RowBody[],
	cellsHead: CellHead[]
	rowsSubFooter?: RowBody[],
	tableProps?: TableProps,
	pageSize?: number,
	containerProps?: ContainerProps,
	toolbarProps?: any,
	rowsPerPageOptions?: number[],
	height?: number,
	getRowId?: (x: any) => any,
	collapsible?: boolean,
	pageParent?: number,
	changePage?: (x: any) => any,
	orderDefault?: Order,
	orderByDefault?: string,
}

export type FilterRowsProps = {
	key: string,
	value: string,
	type?: string,
	valueTo?: string
}

export type PropsRowSubFooter = {
	rows: RowBody[],
	columns?: CellHead[]
}

export type PropsRowBody = {
	rows: RowBody[],
	page?: number, 
	rowsPerPage?: number,
	columns?: CellHead[],
	filterRowsProps?: FilterRowsProps,
	order: Order,
	orderBy: string,
	collapsible?: boolean
}

export type RowBody = {
    cells: CellBody[]
    tableRowProps?: TableRowProps
	style?: any
	collapse?: boolean
}

export type CellBody = {
	field: string | React.Component,
	tableCellProps?: TableCellProps,
	key: string
}

export type PropsGridHead = {
	columns: CellHead[],
	order: Order,
	orderBy: string,
	onRequestSort: any
}

export type RowHead = {
    cells: CellHead[]
    tableRowProps?: TableRowProps
}

export type CellHead = {
	field: string | React.Component | any,
	tableCellProps?: TableCellProps,
	key?: string
	hideFilterRow?: boolean
}

export interface EnhancedTableToolbarProps {
	numSelected?: number;
	title?: string
	exportProps?: any
	filterProps?: any
	handleChangeFiltersRows?: any
}

export type Order = 'asc' | 'desc';
