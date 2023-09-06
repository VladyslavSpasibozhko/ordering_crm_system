import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { CategoriesList } from './components/CategoriesList';
import { ProductsList } from './components/ProductsList';

export function RightPanel() {
  return (
    <Box height="100vh" width="40%">
      <Tabs isFitted variant="line" p="4">
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
