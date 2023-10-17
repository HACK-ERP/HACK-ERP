import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/material';

export default function SuppliersAlignItemsList({suppliers}) {
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {suppliers.map((supplier) => (
                    <Link key={supplier.id} href={`/suppliers/${supplier.id}`}>
                    <React.Fragment >
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt={supplier.name} src={supplier.logo} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={supplier.name}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {supplier.email}
                                        </Typography>
                                        {" — " + supplier.phone}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </React.Fragment>
                    </Link>
                ))}
        </List>
    );
}
