import { db } from '../../../db';
import { controller } from '../../system/controller';
import { verifyPassword, hashPassword, generateSalt } from './utils';

const post = async ({ request, options }) => {
  try {
    const body = await options.getBody(request);

    const userResponse = await db
      .select(['*'], 'user_auth')
      .where({ email: body.email })
      .perform();

    if (userResponse.error) {
      options.notFound(userResponse.error);
      return;
    }

    const user = userResponse.data.rows[0];

    const isPasswordsEqual = await verifyPassword(
      body.password,
      user.password_hash,
      user.salt,
    );

    if (!isPasswordsEqual) {
      options.badRequest('Passwords are not matched');
      return;
    }

    const newSalt = generateSalt(16);
    const newPasswordHash = await hashPassword(body.newPassword, newSalt);

    await db
      .update({
        salt: newSalt,
        password_hash: newPasswordHash,
      })
      .where({ emai: body.email })
      .perform()
      .then((res) => {
        if (res.error) options.serverError(res.error);
        options.success({ emai: body.email });
      });
  } catch (e) {
    options.serverError(e.message);
  }
};

export const changePasswordController = controller([['POST', post]]);
