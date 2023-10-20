
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
import EmailIcon from '@mui/icons-material/Email';
import { Container } from '@mui/system';
import { Button, TableHead, Typography } from '@mui/material';
import { getNotificationList, updateNotification } from '../../services/NotificationsService';
import { useAuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

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
};


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

export default function NotificationsList() {

    const [notifications, setNotifications] = useState([]);

    const { user } = useAuthContext();

    const navigate = useNavigate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const filterNotifications = (notifications) => {
        const filteredNotifications = notifications.filter((notification) => {
            return notification.receiver === user.role;
        });
        return filteredNotifications;
    }

    const statusUpdate = (id) => {
        const notificationUpdate = {}
        const updatedNotifications = notifications.map((notification) => {
            if (notification.id === id) {
                notificationUpdate.status = 'Leído';
            }
            return notification;
        });
        setNotifications(updatedNotifications);

        updateNotification(id, notificationUpdate).then(() => {
            goToDetail(id)
        });
    }

    const goToDetail = (id) => {
        navigate(`/notification/${id}`);
    }

    useEffect(() => {
        getNotificationList()
          .then(response => {
            setNotifications(filterNotifications(response));
          })
      }, []);
      

    let rows = []
    rows = notifications;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    console.log(notifications);

    return (
        <Container>
            <Typography variant="h3" gutterBottom style={{ marginTop: "20px" }}>
                Notificaciones
            </Typography>
            <TableContainer component={Paper}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: '50px',

                }}>
                <Table sx={{ minWidth: 500 }} >
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ maxWidth: 500 }}>Remitente</TableCell>
                            <TableCell align="center">Mensaje</TableCell>
                            <TableCell align="center">Fechade mensaje</TableCell>
                            <TableCell align="center">Ir</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? notifications.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : notifications
                        ).map((notif) => (
                            <TableRow key={notif.id}>
                                <TableCell align="center">
                                    
                                        {notif.sender.role}
                               
                                </TableCell>
                                <TableCell align="center">
                                    {notif.message}
                                </TableCell>
                                <TableCell align="center">
                                    {changeDate(notif.updatedAt)}
                                </TableCell>
                                <TableCell align="center">
                                    {
                                        notif.status === 'No leído' ?
                                            <Button
                                                color="inherit"
                                                sx={{ textDecoration: "none" }}
                                                onClick={() => statusUpdate(notif.id)}
                                            >
                                                <EmailIcon sx={{ color: 'primary.main' }} />
                                            </Button>
                                            :
                                            <Button
                                                color="inherit"
                                                sx={{ textDecoration: "none" }}
                                                onClick={() => goToDetail(notif.id)}
                                            >
                                                <EmailIcon sx={{ color: 'success.main' }} />
                                            </Button>
                                    }
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
                                count={rows.length}
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

