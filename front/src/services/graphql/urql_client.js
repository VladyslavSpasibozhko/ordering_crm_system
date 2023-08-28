import { createClient, cacheExchange, fetchExchange, Provider } from 'urql';
import PropTypes from 'prop-types';

// TODO: Move to env
const base = 'http://localhost:8080/';

export const client = createClient({
  url: base + 'api/',
  exchanges: [cacheExchange, fetchExchange],
});

export const UrqlProvider = ({ children }) => {
  return <Provider value={client}>{children}</Provider>;
};

UrqlProvider.propTypes = {
  children: PropTypes.node,
};
