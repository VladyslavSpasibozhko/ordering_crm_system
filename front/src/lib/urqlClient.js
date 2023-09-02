import { createClient as createUrql, cacheExchange, fetchExchange } from 'urql';
import { authExchange } from '@urql/exchange-auth';
import { authFeatures } from 'src/features/auth';

// TODO: Move to env
const base = 'http://localhost:8080/api/graphql/';

// TODO: Pass exchanges from params
export function createClient({ getToken, refreshToken, willError }) {
  return createUrql({
    url: base,
    exchanges: [
      cacheExchange,
      authExchange(async (utils) => {
        return {
          addAuthToOperation(operation) {
            const token = getToken();

            if (token) {
              return utils.appendHeaders(operation, {
                Authorization: `Bearer ${token}`,
              });
            }
            return operation;
          },
          willAuthError(_operation) {
            return willError();
          },
          async refreshAuth() {
            await refreshToken();
          },
        };
      }),
      fetchExchange,
    ],
  });
}
