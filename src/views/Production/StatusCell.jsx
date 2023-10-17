import TableCell from '@mui/material/TableCell';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const states = ['Pendiente', 'Materiales Solicitados', 'Materiales Recibidos', 'En Proceso', 'Entregado'];

function StatusCell({ status, onChange }) {
    const isEditable =
        (status === 'Pendiente' && 'Materiales Solicitados') ||
        (status === 'Materiales Solicitados' && 'Materiales Recibidos') ||
        (status === 'Materiales Recibidos' && 'En Proceso') ||
        (status === 'En Proceso' && 'Entregado');

    const handleChangeStatus = (event) => {
        onChange(event.target.value);
    };

    return (
        <TableCell align="center">
            {isEditable ? (
                <FormControl>
                    <InputLabel id="status-label">Estado</InputLabel>
                    <Select
                        labelId="status-label"
                        id="status-select"
                        value={status}
                        onChange={handleChangeStatus}
                    >
                        {states
                            .filter((state) => state !== status)
                            .map((state) => (
                                <MenuItem key={state} value={state}>
                                    {state}
                                </MenuItem>
                            ))}
                    </Select>
                </FormControl>
            ) : (
                status
            )}
        </TableCell>
    );
}

export default StatusCell;
