import { randomBytes, pbkdf2 } from 'crypto';
import jwt from 'jsonwebtoken';
import ms from 'ms';

export function generateSalt(length = 16) {
  return randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
}

export async function hashPassword(password, salt) {
  try {
    const iterations = 1000;
    const keyLength = 64;

    return new Promise((resolve, reject) => {
      pbkdf2(
        password,
        salt,
        iterations,
        keyLength,
        'sha512',
        (err, derivedKey) => {
          if (err) {
            reject(err);
          } else {
            const hashedPassword = derivedKey.toString('hex');
            resolve(hashedPassword);
          }
        },
      );
    });
  } catch (error) {
    throw new Error('Error hashing password');
  }
}

export async function verifyPassword(password, hashedPassword, salt) {
  try {
    const hashedPasswordToCompare = await hashPassword(password, salt);
    return hashedPassword === hashedPasswordToCompare;
  } catch (error) {
    throw new Error('Error verifying password');
  }
}

export function generateToken(data, secret, expires) {
  try {
    const token = jwt.sign(data, secret, {
      expiresIn: ms(expires),
    });

    return {
      success: true,
      data: {
        expiresIn: expires,
        token,
      },
    };
  } catch (err) {
    return {
      success: false,
      error: err.message || 'Error occurs while token was generating',
    };
  }
}

// CHECK WHERE IT IS USED
export async function verifyToken(token, secret, expires) {
  try {
    const result = jwt.verify(token, secret, { expiresIn: ms(expires) });

    return { data: result, success: true };
  } catch (err) {
    return {
      success: false,
      error: err.message || 'Invalid token',
    };
  }
}

export async function generateTokens(data, secret, expiration) {
  try {
    const accessToken = generateToken(data, secret, expiration.access);
    const refreshToken = generateToken(data, secret, expiration.refresh);

    if (accessToken.success && refreshToken.success) {
      const result = {
        accessToken: accessToken.data.token,
        expiresIn: accessToken.data.expiresIn,
        refreshToken: refreshToken.data.token,
      };

      return {
        success: true,
        data: result,
      };
    }

    throw Error(accessToken.error || refreshToken.error);
  } catch (e) {
    return {
      success: false,
      error: e.message || 'Error occurs while tokens were generating',
    };
  }
}
