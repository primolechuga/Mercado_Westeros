
import { useAuth } from '../../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Box, Tabs, Tab, Menu, MenuItem } from '@mui/material';



interface LinkTabProps {
  label?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const roleBasedTabs: Record<string, { label: string; page?: string; subMenu?: { label: string; page: string; }[] }[]> = {
  maestre: [
    { label: 'Mercaderes', page: '/merchants' },
    { label: 'Productos', page: '/products' },
    { label: 'Subastas', page: '/' },
    {label : 'Añadir producto', page: '/addProduct'}
  ],
  mercader: [
    { label: 'Subastas', page :'/'},
    { label: 'Mis subastas',       
    subMenu: [
      { label: 'Subastas creadas', page: '/myAuctions' },
      { label: 'Subastas compradas', page: '/myWonAuctions' },
      { label: 'Subastas Activas ', page: '/myBids' },
    ]},
    { label: 'Productos', page: '/products' },
    { label: 'Casa', page: '/house' },
  ],
};

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component="a"
      onClick={props.onClick}
      {...props}
    />
  );
}

export default function NavTabs() {
  const [value, setValue] = useState(0);
  const { role } = useAuth();
  const navigate = useNavigate();
  
  // Estado para manejar el menú de "Subastas"
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleTabClick = (event: React.MouseEvent<HTMLAnchorElement>, tab: { page?: string; subMenu?: { label: string; page: string; }[] }) => {
    if (tab.subMenu) {
      setAnchorEl(event.currentTarget); // Abre el menú
    } else if (tab.page) {
      navigate(tab.page);
    }
  };

  const handleMenuClose = (page: string) => {
    navigate(page);
    setAnchorEl(null);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={(_, newValue) => setValue(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="nav tabs example"
      >
        {role && roleBasedTabs[role]?.map((tab, index) => (
          <LinkTab 
            key={index} 
            label={tab.label} 
            onClick={(event) => handleTabClick(event, tab)}
          />
        ))}
      </Tabs>

      {/* Menú desplegable para "Subastas" */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {role && roleBasedTabs[role]
          .find(tab => tab.label === 'Mis subastas')?.subMenu?.map((subItem, index) => (
            <MenuItem key={index} onClick={() => handleMenuClose(subItem.page)}>
              {subItem.label}
            </MenuItem>
          ))
        }
      </Menu>
    </Box>
  );
}