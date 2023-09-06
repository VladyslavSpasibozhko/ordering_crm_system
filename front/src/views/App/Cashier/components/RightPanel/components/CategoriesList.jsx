import { Box, Button, Input, List, ListItem } from '@chakra-ui/react';
import { useCategories } from 'src/services/graphql/productCategory';

export function CategoriesList() {
  const [{ fetching, data }] = useCategories();

  if (fetching) {
    // TODO: return loading here
    return <></>;
  }

  return (
    <Box>
      <Input disabled />
      <List mt="4">
        {data.categories.map((category) => (
          <ListItem mt="2" key={category.id}>
            <Button variant="outline">{category.title}</Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
