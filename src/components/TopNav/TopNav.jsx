import PropTypes from 'prop-types';
import BellIcon from '@heroicons/react/24/solid/BellIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import Bars3Icon from '@heroicons/react/24/solid/Bars3Icon';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Link,
  Stack,
  SvgIcon,
  Tooltip,

} from '@mui/material';
import { useAuthContext } from '../../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { getNotificationList } from '../../services/notificationsService';

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

export const TopNav = (props) => {
  const { onNavOpen } = props;

  const [notifications, setnotifications] = useState([]);

  const filterNotifications = (notifications) => {
    const filteredNotifications = notifications.filter((notification) => {
        return notification.receiver === user.role;
    });
    return filteredNotifications;
}

//si hay notificaciones con status 'No leído' devuelve folse
const hasUnreadNotifications = (notifications) => {
  const unreadNotifications = notifications.filter((notification) => {
      return notification.status === 'No leído';
  });
  return unreadNotifications.length > 0;
}

  useEffect(() => {
    getNotificationList()
    .then((response) => {
      setnotifications(filterNotifications(response));
    })
  }, [])


  const {user} = useAuthContext();
  


  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: 'blur(6px)',
          backgroundColor: 'primary.main',
          position: 'sticky',
          left: {
            lg: `${SIDE_NAV_WIDTH}px`
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`
          },
          zIndex: (theme) => theme.zIndex.appBar
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2
          }}
        >
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
        
              <IconButton onClick={onNavOpen}>
                <SvgIcon fontSize="small">
                  <Bars3Icon />
                </SvgIcon>
              </IconButton>

            <Tooltip title="Search">
              <IconButton>
                <SvgIcon fontSize="small">
                  <MagnifyingGlassIcon />
                </SvgIcon>
              </IconButton>
            </Tooltip>
          </Stack>
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <Tooltip title="Contacts">
              <IconButton>
                <SvgIcon fontSize="small">
                  <UsersIcon />
                </SvgIcon>
              </IconButton>
            </Tooltip>
            <Link href="/notifications" sx={{color:"white"}}>
            <Tooltip title="Notifications">
              <IconButton>
                {/* si hay notificaciones no leidas color danger */}
                {
                  hasUnreadNotifications(notifications) ? 
                  <Badge
                  badgeContent={4}
                  color="error"
                  variant="dot"
                >
                  <SvgIcon fontSize="small">

                    <BellIcon />

                  </SvgIcon>
                </Badge>
                :
                //sino color success
                <Badge
                  badgeContent={4}
                  color="success"
                  variant="dot"
                >
                  <SvgIcon fontSize="small">
                    <BellIcon />
                  </SvgIcon>
                </Badge>
                }
              </IconButton>
            </Tooltip>
            </Link>
            <Avatar
              //onClick={}
              href={user.avatar}
              sx={{
                cursor: 'pointer',
                height: 40,
                width: 40
              }}
              src={user.avatar}
            />
          </Stack>
        </Stack>
      </Box>
      
    </>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func
};
