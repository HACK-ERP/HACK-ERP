import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const states = ['Pendiente', 'Materiales Solicitados', 'Materiales Recibidos', 'En Proceso', 'Entregado'];

function StatusCell({ status, onChange }) {
    const isEditable =
        (status === 'Pendiente' && 'Materiales Solicitados') ||
        (status === 'Materiales Recibidos' && 'En Proceso') ||
        (status === 'En Proceso' && 'Entregado');

    const handleChangeStatus = (event) => {
        onChange(event.target.value);
    };


    return (
        <>
            {isEditable ? (
                <FormControl fullWidth>
                    <InputLabel id="estado" >Estado</InputLabel>
                    <Select
                    sx={{minWidth:150}}
                        labelId="estado"
                        id="status-select"
                        label="Estado"
                        value={status || ''}
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
        </>
    );
}

export default StatusCell;
