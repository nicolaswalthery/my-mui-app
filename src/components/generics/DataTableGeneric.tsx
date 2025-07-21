import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';

type ColumnConfig<T> = {
  key: keyof T;
  label: string;
};

type DataTableGeneric<T extends object> = {
  data: T[];
  title?: string;
  columnsConfig?: ColumnConfig<T>[];
};

export default function DataTableGeneric<T extends object>({
  data,
  title,
  columnsConfig
}: DataTableGeneric<T>) {
  if (data.length === 0) {
    return <Typography variant="body2">Aucune donnée à afficher</Typography>;
  }

  const columns = columnsConfig ?? (Object.keys(data[0]).map((key) => ({
    key: key as keyof T,
    label: String(key),
  })));

  return (
    <>
      {title && <Typography variant="h6" gutterBottom>{title}</Typography>}
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map(({ key, label }) => (
                <TableCell key={String(key)} sx={{ fontWeight: 'bold' }}>
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map(({ key }) => (
                  <TableCell key={String(key)}>
                    {String(row[key])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export type { DataTableGeneric };
