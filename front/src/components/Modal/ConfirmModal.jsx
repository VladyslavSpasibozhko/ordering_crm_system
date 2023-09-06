import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

export function useConfirmModal(props = {}) {
  return useDisclosure({ id: 'ConfirmModal', ...props });
}

export function ConfirmModal({
  title,
  subtitle,
  onConfirm,
  onCancel,
  control,
}) {
  return (
    <Modal id="ConfirmModal" isOpen={control.isOpen} onClose={control.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{subtitle}</ModalBody>

        <ModalFooter>
          <Button mr="2" colorScheme="green" onClick={onConfirm}>
            Підтвердити
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Відмінити
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
