import { AddIcon, DeleteIcon, MinusIcon } from '@chakra-ui/icons';
import { Box, Card, CardBody, Flex, HStack, Text } from '@chakra-ui/react';

export function ProductCard() {
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
              <Text>Кава Американо</Text>
              <Flex align="center" mt="2">
                <Text>Кількість:</Text>
                <HStack ml="4">
                  <Button size="sm">
                    <AddIcon />
                  </Button>
                  <Tag variant="outline" size="lg">
                    120
                  </Tag>
                  <Button size="sm">
                    <MinusIcon />
                  </Button>
                </HStack>
              </Flex>
            </Box>
          </Flex>
          <Flex direction="column" align="end">
            <Box>
              <Button variant="outline" colorScheme="red" size="sm">
                <DeleteIcon />
              </Button>
            </Box>
            <Text mt="2">Ціна: 20грн</Text>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
}
