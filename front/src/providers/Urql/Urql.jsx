import PropTypes from 'prop-types';
import { Provider } from 'urql';
import { createClient } from 'src/lib/urqlClient';
import { authFeatures } from 'src/features/auth';
import { getUserEmail, retrieveTokens } from 'src/services/ls.storage';

export const client = createClient({
  getToken() {
    const tokens = retrieveTokens();
    return tokens.accessToken;
  },
  async refreshToken() {
    const tokens = retrieveTokens();
    const email = getUserEmail();
    await authFeatures.refreshTokenFeature(tokens.refreshToken, email);
  },
  willError() {
    const { expiresIn } = retrieveTokens();
    return authFeatures.shouldRefreshToken(expiresIn);
  },
});

export const UrqlProvider = ({ children }) => {
  return <Provider value={client}>{children}</Provider>;
};

UrqlProvider.propTypes = {
  children: PropTypes.node,
};
