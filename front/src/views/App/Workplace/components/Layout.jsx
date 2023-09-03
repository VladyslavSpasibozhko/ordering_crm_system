import {
  Box,
  Divider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { CategoriesList } from './CategoriesList';
import { ProductsList } from './ProductsList';

function LeftPanel({ children }) {
  return (
    <Box height="100vh" width="60%" display="flex" flexDirection="column">
      {children}
    </Box>
  );
}

function RightPanel() {
  return (
    <Box height="100vh" width="40%">
      <Tabs isFitted variant="line" p="5">
        <TabList>
          <Tab>Категорія товарів</Tab>
          <Tab>Товари</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <CategoriesList />
          </TabPanel>
          <TabPanel>
            <ProductsList />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export function WorkplaceLayout({ children }) {
  return (
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <LeftPanel>{children}</LeftPanel>
      <Divider orientation="vertical" />
      <RightPanel />
    </Box>
  );
}
