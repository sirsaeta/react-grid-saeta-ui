import { CellBody, CellHead, FilterRowsProps, RowBody } from "./types";
import moment from 'moment';
import 'moment/locale/ar';

export function descendingComparator(a: RowBody, b: RowBody, orderBy: any) {
  let cellA = a.cells.filter((cell: CellBody) => cell.key === orderBy)[0]
  let cellB = b.cells.filter((cell: CellBody) => cell.key === orderBy)[0]
  if (cellA === undefined || cellB === undefined) {
    return 0;
  }
  if (cellB.field < cellA.field) {
    return -1;
  }
  if (cellB.field > cellA.field) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

export function getComparator(
  order: Order,
  orderBy: any,
): (a: any, b: any) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array: RowBody[], comparator: (a: any, b: any) => number): RowBody[] {
  const stabilizedThis = array.filter((row) => row.collapse !== true).map((el, index) => [el, index] as [any, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export const changeViewColumn = (key: string, store: string, dataHeadColumns: CellHead[], setDataHeadColumns: any) => {
  let newDataHead = dataHeadColumns.map((column: CellHead) => {
    return key === 'HALL' ?
      {
        ...column,
        tableCellProps: {
          ...column.tableCellProps,
          hidden: true
        }
      }
      :
      key === 'SALL' ?
        {
          ...column,
          tableCellProps: {
            ...column.tableCellProps,
            hidden: false
          }
        }
        :
        column.key === key ?
          {
            ...column,
            tableCellProps: {
              ...column.tableCellProps,
              hidden: column.tableCellProps?.hidden ? false : true
            }
          } : column
  })
  sessionStorage.setItem(store, JSON.stringify([...newDataHead]));
  setDataHeadColumns([
    ...newDataHead
  ])
}

export const filterRows = (row: any, filterRowsProps: FilterRowsProps) =>
  filterRowsProps.type === "fromTo" ?
    row.cells.find((cell: any) =>
    (
      cell.key === filterRowsProps.key &&
      moment(cell.field?.toString(), "DD MM YYYY").isBetween(filterRowsProps.value, filterRowsProps.valueTo, undefined, '[]')
    )
    )
    :
    row.cells.find((cell: any) =>
    (
      cell.key === filterRowsProps.key &&
      cell.field?.toString().toLocaleLowerCase().includes(filterRowsProps.value.toLocaleLowerCase())
    )
    )


export const filterRowsExport = (row: any, filterRowsProps: FilterRowsProps) =>
  filterRowsProps.type === "fromTo" ?
    Object.entries(row).find((cell: any) =>
    (
      cell[0] === filterRowsProps.key &&
      moment(cell[1]?.toString(), "DD MM YYYY").isBetween(filterRowsProps.value, filterRowsProps.valueTo, undefined, '[]')
    )
    )
    :
    Object.entries(row).find((cell: any) =>
      cell[0] === filterRowsProps.key &&
      cell[1]?.toString().toLocaleLowerCase().includes(filterRowsProps.value.toLocaleLowerCase())
    )