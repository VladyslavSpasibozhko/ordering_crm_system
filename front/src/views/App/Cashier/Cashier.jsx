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
  Text,
} from '@chakra-ui/react';
import { CashierLayout } from './components/Layout';
import { useWorkplaceStore } from 'src/stores/cashier.store';
import { useAuthStore } from 'src/stores/auth.store';
import { CloseIcon } from '@chakra-ui/icons';
import { workplaceFeatures } from 'src/features/workplace';
import { ProductCard } from './components/LeftPanel/components/ProductCard';
import { ConfirmModal } from 'src/components/Modal';
import { useConfirmModal } from 'src/components/Modal/ConfirmModal';
import { getValues } from 'src/services/date.service';

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
  const confirmModal = useConfirmModal();

  const state = useCashierStore(
    ({ order, products, sum, setOrder, addProduct, removeProduct }) => ({
      sum,
      order,
      products,
      setOrder,
      addProduct,
      removeProduct,
    }),
  );

  const { hours, minutes, day, month } = getValues(state.order.created);

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

  function onConfirm() {
    confirmModal.onClose();
  }

  function onCancel() {
    confirmModal.onClose();
  }

  return (
    <>
      <ConfirmModal
        title="Оплатити замовлення"
        subtitle={
          <Box>
            <List>
              {state.products().map((data) => (
                <ListItem key={data.product.id}>
                  <Flex justify="space-between">
                    <Flex>
                      <Text mr="2">{data.product.title}</Text>
                      <Text>{data.count} шт.</Text>
                    </Flex>
                    <Text>{data.product.cost * data.count} грн.</Text>
                  </Flex>
                </ListItem>
              ))}
            </List>
            <Flex spacing="8" gap="4" mt="4">
              <Center
                width="49%"
                height="100px"
                borderRadius="4"
                borderColor="green.500"
                borderWidth="1px"
                cursor="pointer"
                _hover={{ background: 'green.50' }}
              >
                <Heading size="sm">Готівка</Heading>
              </Center>
              <Center
                width="49%"
                height="100px"
                borderRadius="4"
                borderColor="green.500"
                borderWidth="1px"
                cursor="pointer"
                _hover={{ background: 'green.50' }}
              >
                <Heading size="sm">Карта</Heading>
              </Center>
            </Flex>
          </Box>
        }
        control={confirmModal}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
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
        <Button onClick={confirmModal.onOpen}>Оплатити</Button>
      </Flex>
    </>
  );
}

export function Cashier() {
  const order = useWorkplaceStore((state) => Boolean(state.order));
  return <CashierLayout>{order ? <Work /> : <Start />}</CashierLayout>;
}
