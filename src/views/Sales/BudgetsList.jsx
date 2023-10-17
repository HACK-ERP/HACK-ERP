import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Button, Container, Link, TableHead, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getBudgetList, statusUpdate } from '../../services/BudgetService';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { createOT } from '../../services/OTService';
import { useAuthContext } from '../../contexts/AuthContext';
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

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};


export default function BudgetList() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [budget, setBudget] = useState([]);
    const { currentUser } = useAuthContext();

    const statusList = ['Enviado', 'Aceptado', 'Rechazado'];


    useEffect(() => {
        getBudgetList()
            .then(response => {
                setBudget(response)
            })
    }, [])



    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - budget.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Container>
            <Typography variant="h3" gutterBottom style={{ marginTop: "20px" }}>
                Presupuestos
            </Typography>
            <Button
                component={RouterLink}
                to="/budget/create"
                variant="contained"
                color="primary"
                sx={{ marginBottom: 3 }}
            >
                Crear Presupuesto
            </Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nº</TableCell>
                            <TableCell align="right">Cliente</TableCell>
                            <TableCell align="right">Estado</TableCell>
                            <TableCell align="right">Fecha de entrega</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? budget.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : budget
                        ).map((budget) => (
                            <TableRow key={budget.id}>
                                <TableCell component="th" scope="row">
                                    <Link href={`/budget/${budget.id}`} color="inherit" sx={{ textDecoration: "none" }}>
                                        {budget.budgetNumber}
                                    </Link>
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    {budget.client.RS}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    {budget.status === 'Aceptado' ?
                                        <TableCell style={{ width: 160 }} align="right" sx={{ color: "green" }}>
                                            {budget.status}
                                        </TableCell>
                                        :
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={budget.status}
                                                label="Estado"
                                                onChange={(event) => {
                                                    statusUpdate(budget.id, { status: event.target.value })
                                                        .then(() => {
                                                            if (event.target.value === 'Aceptado') {
                                                                createOT({ budget: budget.id, code: budget.budgetNumber }, currentUser.id).then((response) => {
                                                                    console.log(response);
                                                                }
                                                                ).catch((error) => console.log(error));
                                                            }
                                                        })
                                                        .catch((error) => console.log(error));
                                                    setBudget(prev =>
                                                        prev.map(b => b.id === budget.id ? { ...b, status: event.target.value } : b));
                                                }
                                                }
                                            >
                                                {statusList.map((status) => (
                                                    <MenuItem value={status} key={status}>
                                                        {status}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    }
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    {changeDate(budget.deliveryDate)}
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
                                count={budget.length}
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
