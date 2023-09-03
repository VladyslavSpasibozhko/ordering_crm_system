import {
  Box,
  ButtonGroup,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
} from '@chakra-ui/react';
import { WorkplaceLayout } from './components/Layout';

function Start() {
  return (
    <WorkplaceLayout>
      <Box
        backgroundColor="green.50"
        display="flex"
        flex="1 1 150px"
        alignItems="center"
      >
        <Heading size="md" pl="10">
          Касир: Спасібожко Анастасія
        </Heading>
      </Box>
      <Divider />
      <Center flex="1 1 100%">
        <ButtonGroup>
          <Button>Нове замовлення</Button>
          <Button>Закінчити роботу</Button>
          <Button>Всі замовлення</Button>
        </ButtonGroup>
      </Center>
    </WorkplaceLayout>
  );
}

function Work() {
  return (
    <WorkplaceLayout>
      <Box
        display="flex"
        flex="1 1 120px"
        alignItems="center"
        justifyContent="space-between"
        px="5"
      >
        <Heading ml size="md">
          Замовлення № 1202
        </Heading>
        <Button>Скасувати</Button>
      </Box>
      <Divider />
      <Box flex="1 1 100%" p="4"></Box>

      <Divider />
      <Flex
        height="120px"
        width="100%"
        align="center"
        justify="space-between"
        px="4"
      >
        <Heading size="md">Сума замовлення: 3200 грн</Heading>
        <Button>Оплатити</Button>
      </Flex>
    </WorkplaceLayout>
  );
}

export function Workplace() {
  return <Work />;
}
