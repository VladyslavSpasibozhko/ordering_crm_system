import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react';
import { forwardRef } from 'react';
import { Error } from '../Error';

export const InputField = forwardRef(function InputField(
  { leftIcon, invalid, touched, error, box, ...rest },
  ref,
) {
  const errorColor = 'red.600';
  const defaultColor = 'blackAlpha.900';

  return (
    <Box {...box}>
      <InputGroup>
        <InputLeftElement height="100%">
          {leftIcon &&
            leftIcon({
              boxSize: 5,
              color: invalid ? errorColor : defaultColor,
            })}
        </InputLeftElement>
        <Input
          ref={ref}
          _placeholder={{ color: invalid ? errorColor : defaultColor }}
          errorBorderColor={errorColor}
          isInvalid={invalid}
          {...rest}
        />
      </InputGroup>
      {invalid && error && <Error error={error} />}
    </Box>
  );
});
