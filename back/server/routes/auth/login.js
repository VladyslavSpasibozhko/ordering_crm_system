import { db } from '../../../db';
import { envs } from '../../../services/envs';
import { controller } from '../../system/controller';
import { generateTokens, verifyPassword } from './utils';

const post = async ({ request, options }) => {
  try {
    const body = await options.getBody(request);

    const userResponse = await db
      .select(['*'], 'user_auth')
      .where({ email: body.email })
      .perform();

    if (!userResponse.data.rowCount) {
      options.notFound('User with email=' + body.email + ' not found');
      return;
    }

    const userAuth = userResponse.data.rows[0];

    if (!userAuth.confirmed) {
      options.badRequest('User is not confirmed');
      return;
    }

    const isPasswordsEqual = await verifyPassword(
      body.password,
      userAuth.password_hash,
      userAuth.salt,
    );

    if (!isPasswordsEqual) {
      options.badRequest('Wrong password');
      return;
    }

    const response = await db
      .select(['*'], 'users')
      .where({ email: userAuth.email })
      .perform();

    if (response.error) {
      options.badRequest('User not found: ' + userAuth.email);
      return;
    }

    const user = response.data.rows[0];

    const tokens = await generateTokens(
      {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
      envs.PASSWORD_SECRET_KEY,
      {
        access: envs.ACCESS_TOKEN_EXPIRATION,
        refresh: envs.REFRESH_TOKEN_EXPIRATION,
      },
    );

    if (!tokens.success) {
      options.serverError(tokens.error);
      return;
    }

    options.success(tokens.data);
  } catch (e) {
    options.serverError(e.message || 'Server error');
  }
};

export const loginController = controller([['POST', post]]);
