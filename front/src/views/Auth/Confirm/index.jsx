import { Box, Button, Heading } from '@chakra-ui/react';
import { EmailIcon, LockIcon } from '@chakra-ui/icons';
import { Controller, useForm } from 'react-hook-form';
import { InputField } from 'src/components/InputField';
import { Error } from 'src/components/Error';
import { Link } from 'src/components/Link';
import { authFeatures } from 'src/features/auth';
import { useNavigate } from 'react-router-dom';
import { useRequest } from 'src/lib/fetchClient';

export function Confirm() {
  const { request, loading, error } = useRequest(authFeatures.confirmFeature);
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm({
    defaultValues: { password: '', email: '' },
  });

  async function onSubmit(values) {
    const res = await request(values);

    if (res.success) {
      // TODO: Pass email if to Login page
      if (res.path) navigate(res.path);
    }
  }

  return (
    <Box>
      <Box mt="20" display="flex" alignItems="center" justifyContent="center">
        <Heading size="lg">Підтвердження користувача</Heading>
      </Box>

      <Box mt="10" display="flex" alignItems="center" justifyContent="center">
        <Box width={400}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              rules={{ required: "Поле обов'язкове" }}
              render={({ fieldState, field }) => (
                <InputField
                  size="lg"
                  placeholder="Email"
                  leftIcon={(props) => <EmailIcon {...props} />}
                  invalid={fieldState.invalid}
                  touched={fieldState.isTouched}
                  error={fieldState.error?.message || ''}
                  type="email"
                  {...field}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={{
                required: "Поле обов'язкове",
                minLength: {
                  value: 8,
                  message: 'Мінімальна довжина 8 символів',
                },
              }}
              render={({ fieldState, field }) => (
                <InputField
                  size="lg"
                  placeholder="Пароль"
                  type="password"
                  leftIcon={(props) => <LockIcon {...props} />}
                  invalid={fieldState.invalid}
                  touched={fieldState.isTouched}
                  error={fieldState.error?.message || ''}
                  box={{
                    mt: '4',
                  }}
                  {...field}
                />
              )}
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
