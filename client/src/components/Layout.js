import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './Navbar';

const AppShell = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
`;

const Layout = () => {
  return (
    <AppShell>
      <Navbar />
      <MainContent>
        <Outlet />
      </MainContent>
    </AppShell>
  );
};

export default Layout;
