import { DialogContent, Dialog, Button } from '@material-ui/core';
import { CSVLink } from "react-csv";
import ReactExport from 'react-export-excel';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default function ExportGrid({open, handleClose, exportProps}:any) {

    const close = () => {
        handleClose();
    }
	const {data, headers, filename} = exportProps;
	let dataFilter = data;
  return (
    <div>
      <Dialog open={open} onClose={close} aria-labelledby="form-dialog-title">
        <DialogContent>
			<CSVLink data={dataFilter} headers={headers} filename={filename} style={{textDecoration:"none"}}>
				<Button
					size="small"
					color="primary"
					>
					CSV
				</Button>
			</CSVLink>
			<ExcelFile filename={exportProps?.name || "Descarga"} element={
				<Button
					size="small"
					color="primary"
					>
					Excel
				</Button>
			} >
				<ExcelSheet data={dataFilter} name={exportProps?.name || "Hoja 1"}>
					{exportProps.headers.map((column: any)=>
						<ExcelColumn key={column.key} label={column.label} value={column.key}/>
					)}
				</ExcelSheet>
			</ExcelFile>
        </DialogContent>
      </Dialog>
    </div>
  );
}
