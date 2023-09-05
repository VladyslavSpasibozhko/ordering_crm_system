import { AddIcon, DeleteIcon, MinusIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  HStack,
  Text,
  Tag,
} from '@chakra-ui/react';

export function ProductCard({ product, count, changeCount, deleteProduct }) {
  return (
    <Card>
      <CardBody>
        <Flex justify="space-between" align="center">
          <Flex align="center">
            <Box
              mr="4"
              width="70px"
              height="70px"
              backgroundColor="green.400"
              borderRadius="4"
            />
            <Box>
              <Text>{product.title}</Text>
              <Flex align="center" mt="2">
                <Text>Кількість:</Text>
                <HStack ml="4">
                  <Button
                    size="sm"
                    onClick={() => changeCount('increase', product)}
                  >
                    <AddIcon />
                  </Button>
                  <Tag variant="outline" size="lg">
                    {count}
                  </Tag>
                  <Button
                    size="sm"
                    onClick={() => changeCount('decrease', product)}
                  >
                    <MinusIcon />
                  </Button>
                </HStack>
              </Flex>
            </Box>
          </Flex>
          <Flex direction="column" align="end">
            <Box>
              <Button
                size="sm"
                variant="outline"
                colorScheme="red"
                onClick={() => deleteProduct(product, count)}
              >
                <DeleteIcon />
              </Button>
            </Box>
            <Text mt="2">Ціна: {product.cost} грн</Text>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
}
