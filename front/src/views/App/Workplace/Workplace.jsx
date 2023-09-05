import {
  Box,
  ButtonGroup,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  List,
  ListItem,
} from '@chakra-ui/react';
import { WorkplaceLayout } from './components/Layout';
import { useWorkplaceStore } from 'src/stores/workplace.store';
import { useAuthStore } from 'src/stores/auth.store';
import { CloseIcon } from '@chakra-ui/icons';
import { workplaceFeatures } from 'src/features/workplace';
import { ProductCard } from './components/LeftPanel/components/ProductCard';

function Start() {
  const user = useAuthStore((state) => state.user);

  function newOrder() {
    workplaceFeatures.createBaseOrderFeature([]);
  }

  function finishWork() {
    //
  }

  function toOrders() {
    //
  }

  return (
    <>
      <Box
        backgroundColor="gray.100"
        display="flex"
        flex="1 1 100px"
        alignItems="center"
      >
        <Heading size="md" pl="10">
          Касир: {user.last_name} {user.first_name}
        </Heading>
      </Box>
      <Divider />
      <Center flex="1 1 100%">
        <ButtonGroup>
          <Button onClick={newOrder}>Нове замовлення</Button>
          <Button onClick={finishWork}>Закінчити роботу</Button>
          <Button onClick={toOrders}>Всі замовлення</Button>
        </ButtonGroup>
      </Center>
    </>
  );
}

function Work() {
  const state = useWorkplaceStore(
    ({ order, products, sum, setOrder, addProduct, removeProduct }) => ({
      sum,
      order,
      products,
      setOrder,
      addProduct,
      removeProduct,
    }),
  );

  function closeOrder() {
    state.setOrder(null);
  }

  function changeCount(action, product) {
    const actions = {
      increase: (data) => {
        state.addProduct(data);
      },
      decrease: (data) => {
        state.removeProduct(data);
      },
    };

    actions[action](product);
  }

  function deleteProduct(product, count) {
    state.removeProduct(product, count);
  }

  function getOrderDate() {
    const ms = state.order.created;

    const date = new Date(ms);

    const hours = date.getHours();
    const minutes = date.getMinutes();

    const day = date.getDate();
    const month = date.getMonth() + 1;

    function withZero(value) {
      if (value >= 10) return value;

      return '0' + value;
    }

    return {
      hours: withZero(hours),
      minutes: withZero(minutes),
      day: withZero(day),
      month: withZero(month),
    };
  }

  const { hours, minutes, day, month } = getOrderDate();

  return (
    <>
      <Box
        display="flex"
        flex="1 1 120px"
        alignItems="center"
        justifyContent="space-between"
        px="5"
      >
        <Heading ml size="md">
          Нове замовлення: {hours}:{minutes} {day}.{month}
        </Heading>
        <Button colorScheme="red" variant="outline" onClick={closeOrder}>
          <CloseIcon />
        </Button>
      </Box>
      <Divider />
      <Box flex="1 1 100%" p="4">
        <List>
          {state.products().map((data) => (
            <ListItem key={data.product.id} mt="4">
              <ProductCard
                count={data.count}
                product={data.product}
                changeCount={changeCount}
                deleteProduct={deleteProduct}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Divider />
      <Flex
        height="120px"
        width="100%"
        align="center"
        justify="space-between"
        px="4"
      >
        <Heading size="md">Сума замовлення: {state.sum()} грн</Heading>
        <Button>Оплатити</Button>
      </Flex>
    </>
  );
}

export function Workplace() {
  const order = useWorkplaceStore((state) => Boolean(state.order));

  return <WorkplaceLayout>{order ? <Work /> : <Start />}</WorkplaceLayout>;
}
