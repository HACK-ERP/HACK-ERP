import { Box, Container, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { getOTList, updateOT } from "../../services/OTService";
import PropTypes from 'prop-types';
import { getProductList } from "../../services/ProductsService";
import StatusCell from "./StatusCell";


function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };




    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}


TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
}

function changeDate(dateISO) {
    const date = new Date(dateISO);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();

    const dayStr = day.toString().padStart(2, '0');
    const monthStr = month.toString().padStart(2, '0');

    const newDate = `${dayStr}/${monthStr}/${year}`;

    return newDate;
}

export default function OTList() {




    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [otList, setOtList] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('')
    const [updatedStatus, setUpdatedStatus] = useState('');

    useEffect(() => {
        getOTList().then((response) => {
            setOtList(response);
        });
    }, []);

    useEffect(() => {
        getProductList().then((response) => {
            setProducts(response);
        });
    }, [])


    const productsToShow = (ot) => {
        if (Array.isArray(ot) && ot.length > 0) {
            const productNames = ot.map((otProduct) => {
                const matchingProduct = products.find((product) => product.id === otProduct.product_id);
                if (matchingProduct) {
                    return matchingProduct.name;
                }
                return 'Producto no encontrado';
            });

            if (productNames.length > 0) {
                return productNames.join(', ');
            } else {
                return 'La Orden de trabajo no registra productos';
            }
        }
        return 'La Orden de trabajo no registra productos';
    };


    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - otList.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeStatus = (event) => {
        setSelectedStatus(event.target.value); // Maneja el cambio del valor seleccionado
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

/*     const handleStatusChange = (otId, newStatus) => {
        
        
        const updatedOTList = otList.map((ot) => {
            if (ot.id === otId) {
                return { ...ot, status: newStatus };
            }
            return ot;
        });
        
        Actualiza el estado con la nueva lista de OTs
        setOTList(updatedOTList);
        
        Luego, puedes enviar la actualización al servidor si es necesario
        mediante una llamada a tu API, dependiendo de tu configuración.
        
        Por ejemplo:
        
        updateOTStatus(otId, newStatus)
          .then((response) => {
            // Maneja la respuesta exitosa si es necesario
          })
          .catch((error) => {
            // Maneja el error si es necesario
          });
    }; */



    return (
        <Container>
            <Typography variant="h4" align="center" component="h1" gutterBottom>
                Lista de Ordenes de Trabajo
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">OT</TableCell>
                            <TableCell align="center">Productos</TableCell>
                            <TableCell align="center">Estado</TableCell>
                            <TableCell align="center">Fecha de entrega</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? otList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : otList
                        ).map((ot) => (
                            <TableRow key={ot.id}>
                                <TableCell align="center">
                                    {ot.code}
                                </TableCell>
                                <TableCell align="center">
                                    {productsToShow(ot.budget.products)}
                                </TableCell>
                                <StatusCell status={ot.status} onChange={(newStatus) => handleStatusChange(ot.id, newStatus)} />
                                <TableCell align="center">
                                    {changeDate(ot.budget.deliveryDate)}
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={3}
                                count={otList.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Container>
    );
}



