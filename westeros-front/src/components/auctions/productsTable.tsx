import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, TablePagination, Paper, Box } from '@mui/material';
import Button from '@mui/material/Button';

import { useNavigate } from 'react-router-dom';
//id: 1, name: 'Producto A', price: 100, stock: 20 


interface DataProps{
  id: number;
  name: string;
  price: number;
  stock: number;
}



interface Column {
    id: string;      // Identificador único de la columna (clave en los datos)
    label: string;   // Texto que se mostrará como encabezado de la columna
  }
  
  interface DataTableProps {
    data: DataProps[]; // Lista de objetos con los datos de la tabla
    columns: Column[];           // Definición de las columnas
    rowsPerPageOptions?: number[]; // Opcional: opciones de filas por página
    onAuction?: (item: DataProps) => void; // Función opcional para manejar la subasta
  }
  
export const ProductTable: React.FC<DataTableProps> = ({ data, columns, rowsPerPageOptions = [5, 10, 25] }) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
  
    // Filtrar los datos según la búsqueda
    const filteredData = data.filter(item =>
      columns.some(column =>
        (item[column.id as keyof DataProps] as unknown as string).toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  
    // Manejo de la paginación
    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const handleAuction = (item: DataProps) => {
      navigate(`/createAuction/${item.id}`);
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
                  <TableCell>Acciones</TableCell> {/* Nueva columna para acciones */}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow hover key={index}>
                      {columns.map((column) => (
                        <TableCell key={column.id}>{String(row[column.id as keyof DataProps])}</TableCell>
                      ))}
                      <TableCell>
                        <Button 
                          variant="contained" 
                          color="primary" 
                          size="small"
                          onClick={() => handleAuction(row)}
                        >
                          Subastar
                        </Button>
                      </TableCell>
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
