import { Box, Button, Heading } from '@chakra-ui/react';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import { useController, useForm } from 'react-hook-form';
import { InputField } from 'src/components/InputField';
import { Error } from 'src/components/Error';
import { Link } from 'src/components/Link';
import { useConfirm } from '../hooks/useConfirm';

export function Confirm() {
  const { loading, error, confirm } = useConfirm();

  const { control, handleSubmit } = useForm({
    defaultValues: { password: '', email: '' },
  });

  const email = useController({
    name: 'email',
    control,
    rules: { required: "Поле обов'язкове" },
  });

  const password = useController({
    name: 'password',
    control,
    rules: {
      required: "Поле обов'язкове",
      minLength: { value: 8, message: 'Мінімальна довжина 8 символів' },
    },
  });

  function onSubmit(values) {
    confirm(values);
  }

  return (
    <Box>
      <Box mt="20" display="flex" alignItems="center" justifyContent="center">
        <Heading size="lg">Підтвердження користувача</Heading>
      </Box>

      <Box mt="10" display="flex" alignItems="center" justifyContent="center">
        <Box width={400}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              size="lg"
              placeholder="Email"
              leftIcon={(props) => <EmailIcon {...props} />}
              invalid={email.fieldState.invalid}
              touched={email.fieldState.isTouched}
              error={email.fieldState.error?.message || ''}
              type="email"
              {...email.field}
            />
            <InputField
              size="lg"
              placeholder="Пароль"
              type="password"
              leftIcon={(props) => <LockIcon {...props} />}
              invalid={password.fieldState.invalid}
              touched={password.fieldState.isTouched}
              error={password.fieldState.error?.message || ''}
              box={{
                mt: '4',
              }}
              {...password.field}
            />

            {error && <Error error={error} mt="4" />}

            <Box
              mt="4"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Link to="/auth/login">До сторінки авторизації</Link>
              <Button type="submit" isLoading={loading}>
                Підтвердити
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
