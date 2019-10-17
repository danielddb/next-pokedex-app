import React from 'react';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Breadcrumbs from './breadcrumbs';

const VerticalRhythmn = styled.div`
  margin-bottom: ${props => props.theme.spacing(3) + 'px'};
`;

const Layout: React.FC<{}> = ({ children }) => (
  <>
    <VerticalRhythmn>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Next JS Pokédex App</Typography>
        </Toolbar>
      </AppBar>
    </VerticalRhythmn>
    <Container>
      <VerticalRhythmn>
        <Breadcrumbs />
      </VerticalRhythmn>
      {children}
    </Container>
  </>
);

export default Layout;
