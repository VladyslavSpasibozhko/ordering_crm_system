export function createStore(values) {
  let _values = values;
  let _subscriptions = [];

  function subscribe(handler) {
    _subscriptions.push(handler);

    return () => unsubscribe(handler);
  }

  function unsubscribe(handler) {
    _subscriptions = _subscriptions.filter((hd) => hd !== handler);
  }

  function fire(value) {
    _subscriptions.forEach((handler) => handler(value));
  }

  function update(updater) {
    if (typeof updater === 'function') {
      const newValues = updater(_values);
      _values = newValues;
      fire(newValues);
    }

    if (typeof updater === 'object') {
      _values = updater;
      fire(_values);
    }
  }

  function getValues() {
    return _values;
  }

  return { getValues, update, subscribe, unsubscribe };
}
