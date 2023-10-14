import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import ArrowTopRightOnSquareIcon from '@heroicons/react/24/solid/ArrowTopRightOnSquareIcon';
import {
  Box,
  Button,
  Divider,
  Drawer,
  Link,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery
} from '@mui/material';


import { items } from './Config';
import { SideNavItem } from './side-nav-item';

export const SideNav = (props) => {
  const { open, onClose } = props;
  const  pathname  = useNavigate();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const content = (
    <Box
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100vh'
        },
        '& .simplebar-scrollbar:before': {
          background: 'primary.main'
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              alignItems: 'center',
              backgroundColor: 'primary.main',
              borderRadius: 1,
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space between',
              mt: 2,
              p: '12px'
            }}
          >
            <Link
              variant="h6"
              href="/"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Hack-ERP
            </Link>
          </Box>
        </Box>
        <Divider sx={{ borderColor: 'white' }} />
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0
            }}
          >
            {items.map((item) => {
              const active = item.to ? pathname.includes(item.path) : false;

              return (
                <SideNavItem
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  href={item.href}
                  title={item.title}
                />
              );
            })}
          </Stack>
        </Box>
        <Divider sx={{ borderColor: 'white' }} />
        <Box
          sx={{
            px: 2,
            py: 3
          }}
        >
          <Typography
            color="white"
            variant="subtitle2"
          >
            Need more features?
          </Typography>
          <Typography
            color="white"
            variant="body2"
          >
            Check out our Pro solution template.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              mt: 2,
              mx: 'auto',
              width: '160px',
              '& img': {
                width: '100%'
              }
            }}
          >
            <img
              alt="Go to pro"
              src="/assets/devias-kit-pro.png"
            />
          </Box>
          <Button
            component="a"
            endIcon={(
              <SvgIcon fontSize="small">
                <ArrowTopRightOnSquareIcon />
              </SvgIcon>
            )}
            fullWidth
            href="https://material-kit-pro-react.devias.io/"
            sx={{ mt: 2 }}
            target="_blank"
            variant="contained"
          >
            Pro Live Preview
          </Button>
        </Box>
      </Box>
    </Box>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'primary.main',
            color: 'white',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'primary.main',
          color: 'white',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
