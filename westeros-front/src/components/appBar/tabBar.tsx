import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useAuth } from '../../contexts/authContext';
import { useNavigate } from 'react-router-dom';


function samePageLinkNavigation(
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
) {
  if (
    event.defaultPrevented ||
    event.button !== 0 || // ignore everything but left-click
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return false;
  }
  return true;
}

interface LinkTabProps {
  label?: string;
  href?: string;
  selected?: boolean;
  onClick?: () => void | Promise<void>;
}



const roleBasedTabs : Record<string, { label: string; page: string; }[]> = {
    maestre: [
        { label: 'Mercaderes', page : '/merchants' },
        { label: 'Productos', page : '/products' },
        { label: 'Subastas', page : '/' },
        { label: 'Solicitudes', page : '/userRequests' },

    ],
    mercader: [
        { label: 'Mis subastas', page : '/' },
        { label: 'Subastas', page : '/' },
        { label: 'Productos', page : '/products' },
        // { label: 'Page Four', onClick: () => console.log('Page Four') },
    ],
    };


function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        // Routing libraries handle this, you can remove the onClick handle when using them.
        if (samePageLinkNavigation(event)) {
          event.preventDefault();
        }
      }}
      aria-current={props.selected && 'page'}
      {...props}
    />
  );
}

export default function NavTabs() {
  const [value, setValue] = React.useState(0);
  const { role } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    // event.type can be equal to focus with selectionFollowsFocus.
    if (
      event.type !== 'click' ||
      (event.type === 'click' &&
        samePageLinkNavigation(
          event as React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        ))
    ) {
      setValue(newValue);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="nav tabs example"
        role="navigation"
       >
        {role && roleBasedTabs[role]?.map((tab, index) => (
          <LinkTab key={index} label={tab.label} onClick={() => navigate(tab.page) }/>
        ))}
      </Tabs>
    </Box>
  );
}