import { db } from '../../../db';
import { controller } from '../../system/controller';
import { generateSalt, hashPassword } from './utils';

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

    const user = userResponse.data.rows[0];

    if (user.confirmed) {
      options.badRequest('User already confirmed');
      return;
    }

    const salt = generateSalt(16);
    const hashedPassword = await hashPassword(body.password, salt);

    await db
      .update(
        {
          salt: salt,
          password_hash: hashedPassword,
          confirmed: true,
        },
        'user_auth',
      )
      .where({
        email: body.email,
      })
      .perform()
      .then((res) => {
        if (res.error) {
          options.serverError(res.error);
        } else {
          options.success({ email: user.email, confirmed: true });
        }
      });
  } catch (e) {
    options.serverError(e.message || 'Server error');
  }
};

export const confirmController = controller([['POST', post]]);
