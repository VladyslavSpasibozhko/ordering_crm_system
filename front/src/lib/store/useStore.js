import { useEffect, useState } from 'react';

export function useStore(store) {
  const [state, setState] = useState(store.getValues());

  useEffect(() => {
    return store.subscribe(setState);
  }, []);

  return { state, setState: store.update };
}
