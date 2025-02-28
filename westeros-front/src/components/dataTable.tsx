import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  TablePagination,
  Paper,
  Box,
} from '@mui/material';

interface DataTableProps {
  data: any[]; // Los datos a mostrar
  columns: { id: string; label: string }[]; // Las columnas de la tabla
  rowsPerPageOptions?: number[]; // Opcional: las opciones para las filas por página
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  rowsPerPageOptions = [5, 10, 25],
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Filtrar los datos según la búsqueda
  const filteredData = data.filter((item) =>
    columns.some((column) =>
      item[column.id]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Manejo de la paginación
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Resetear a la primera página cuando cambian las filas por página
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TextField
        label="Buscar"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id}>{column.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow hover key={index}>
                    {columns.map((column) => (
                      <TableCell key={column.id}>
                        {/* Renderizar directamente el valor sin convertirlo a cadena */}
                        {row[column.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default DataTable;