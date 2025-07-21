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

type DataTableGeneric<T extends object> = {
  data: T[];
  title?: string;
};

export default function DataTableGeneric<T extends object>({
  data,
  title,
}: DataTableGeneric<T>) {
  if (data.length === 0) {
    return <Typography variant="body2">Aucune donnée à afficher</Typography>;
  }

  const columns = Object.keys(data[0]) as (keyof T)[];

  return (
    <>
      {title && <Typography variant="h6" gutterBottom>{title}</Typography>}
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={String(col)} sx={{ fontWeight: 'bold' }}>
                  {String(col)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((col) => (
                  <TableCell key={String(col)}>
                    {String(row[col])}
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
