import { envs } from '../../../services/envs';
import { controller } from '../../system/controller';
import { generateToken, verifyToken } from './utils';

const post = async ({ request, options }) => {
  try {
    const body = await options.getBody(request);

    const refreshToken = await verifyToken(
      body.refreshToken,
      envs.PASSWORD_SECRET_KEY,
      envs.REFRESH_TOKEN_EXPIRATION,
    );

    if (!refreshToken.success) {
      options.badRequest(refreshToken.error);
      return;
    }

    const newAccessToken = generateToken(
      {
        first_name: refreshToken.data.first_name,
        last_name: refreshToken.data.last_name,
        email: refreshToken.data.email,
      },
      envs.PASSWORD_SECRET_KEY,
    );

    if (newAccessToken.success) {
      options.success(newAccessToken.data);
      return;
    }

    throw Error(newAccessToken.error);
  } catch (e) {
    options.serverError(e.message || 'Server error');
  }
};

export const refreshTokenController = controller([['POST', post]]);
