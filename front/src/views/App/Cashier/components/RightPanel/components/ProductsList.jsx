import { Box, Grid, GridItem, Input, Text } from '@chakra-ui/react';
import { useProducts } from 'src/services/graphql/product';
import { workplaceFeatures } from 'src/features/workplace';

export function ProductsList() {
  const [{ data, fetching }] = useProducts();

  function addProduct(product) {
    workplaceFeatures.addProductsToOrderFeature(product);
  }

  if (fetching) {
    return <></>;
  }

  return (
    <Box>
      <Input disabled />
      <Grid templateColumns="repeat(3, 1fr)" gap="4" mt="4">
        {data.products.map((product) => (
          <GridItem
            key={product.id}
            p="4"
            borderRadius="10px"
            border="1px"
            borderColor="gray.300"
            minWidth="120px"
            height="100px"
            display="flex"
            alignItems="end"
            justifyContent="start"
            cursor="pointer"
            _hover={{ background: 'gray.50' }}
            onClick={() => addProduct(product)}
          >
            <Box>
              <Text>{product.title}</Text>
              <Text>{product.cost} грн</Text>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}
