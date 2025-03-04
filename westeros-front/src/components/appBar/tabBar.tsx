import React, { useState, useEffect, useMemo } from 'react'; // Añade useMem
import { Box, Tabs, Tab, Menu, MenuItem } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';

interface TabItem {
  label: string;
  page?: string;
  subMenu?: { label: string; page: string }[];
}

const roleBasedTabs: Record<string, TabItem[]> = {
  maestre: [
    { label: 'Subastas', page: '/' },
    { label: 'Mercaderes', page: '/merchants' },
    { label: 'Productos', page: '/products' },
    { label: 'Añadir producto', page: '/addProduct' },
    { label: 'Casa', page: '/house' },
    // { label: 'Perfil', page: '/myProfile' },
  ],
  mercader: [
    { label: 'Subastas', page: '/' },
    {label: 'Subastas Creadas', page: '/myAuctions'},
    {label: 'Mis compras', page: '/myWonAuctions'},
    {label: 'Mis Pujas', page: '/myBids'},
    { label: 'Productos', page: '/productList' },
    // { label: 'Perfil', page: '/myProfile' },
  ],
};

interface LinkTabProps {
  label: string;
  onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

function LinkTab(props: LinkTabProps) {
  return <Tab component="a" onClick={props.onClick} label={props.label} />;
}

export default function NavTabs() {
  const { role } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = useMemo(() => (role ? roleBasedTabs[role] : []), [role]);

  // Busca coincidencias exactas y luego coincidencias parciales (la más específica)
  const findInitialTabIndex = (): number => {
    const currentPath = location.pathname;

    // 1. Buscamos coincidencias exactas
    for (let i = 0; i < tabs.length; i++) {
      const tab = tabs[i];
      if (tab.page && currentPath === tab.page) {
        return i;
      }
      if (tab.subMenu) {
        for (const subItem of tab.subMenu) {
          if (currentPath === subItem.page) {
            return i;
          }
        }
      }
    }

    // 2. Buscamos coincidencias parciales, usando la ruta más larga (más específica)
    let bestMatchIndex = -1;
    let bestMatchLength = 0;
    for (let i = 0; i < tabs.length; i++) {
      const tab = tabs[i];
      if (tab.page && currentPath.startsWith(tab.page) && tab.page.length > bestMatchLength) {
        bestMatchIndex = i;
        bestMatchLength = tab.page.length;
      }
      if (tab.subMenu) {
        for (const subItem of tab.subMenu) {
          if (currentPath.startsWith(subItem.page) && subItem.page.length > bestMatchLength) {
            bestMatchIndex = i;
            bestMatchLength = subItem.page.length;
          }
        }
      }
    }
    return bestMatchIndex === -1 ? 0 : bestMatchIndex;
  };

  const [value, setValue] = useState<number>(0); // Inicializa con 0 temporalmente
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    setValue(findInitialTabIndex());
  }, [location.pathname, tabs]);

  const handleTabClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, tab: TabItem) => {
    if (tab.subMenu) {
      setAnchorEl(event.currentTarget);
    } else if (tab.page) {
      navigate(tab.page);
    }
  };

  const handleMenuClose = (page?: string) => {
    setAnchorEl(null);
    if (page) {
      navigate(page);
    }
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
        aria-label="nav tabs"
      >
        {tabs.map((tab, index) => (
          <LinkTab key={index} label={tab.label} onClick={(event) => handleTabClick(event, tab)} />
        ))}
      </Tabs>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleMenuClose()}>
        {tabs.find((tab) => tab.subMenu)?.subMenu?.map((subItem, index) => (
          <MenuItem key={index} onClick={() => handleMenuClose(subItem.page)}>
            {subItem.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
