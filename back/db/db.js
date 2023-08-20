import pg from 'pg';

const isString = (value) => typeof value === 'string';
const isNull = (value) => typeof value === 'object' && value === null;
const isUndefined = (value) => typeof value === 'undefined';
const isArray = (value) => Array.isArray(value);

function response({ command, oid, rows, rowCount }) {
  return {
    rows,
    rowCount,
    command,
    oid,
  };
}

function whereObj(conditions) {
  const entries = Object.entries(conditions);
  const clauses = [];

  for (const [key, value] of entries) {
    const _isUndefined = isUndefined(value);

    if (!_isUndefined) {
      if (isArray(value)) {
        const values = value.join(', ');
        clauses.push(`${key} IN (${values})`);
      } else if (isString(value)) {
        clauses.push(`${key} = '${value}'`);
      } else {
        clauses.push(`${key} = ${value}`);
      }
    }
  }

  return clauses;
}

function where(conditions) {
  const sql = [];

  if (Array.isArray(conditions)) {
    for (const condition of conditions) {
      const clauses = whereObj(condition);
      const clauseJoined = clauses.join(' AND ');
      sql.push(`(${clauseJoined})`);
    }

    if (sql.length) {
      return 'WHERE ' + sql.join(' OR ');
    }

    return '';
  }

  const clauses = whereObj(conditions);

  if (clauses.length) {
    return 'WHERE ' + clauses.join(' AND ');
  }

  return '';
}

class Select {
  pool;
  name;
  keys;
  conditions;

  constructor({ keys, name, pool }) {
    this.name = name;
    this.keys = keys;
    this.pool = pool;
  }

  where(conditions) {
    this.conditions = conditions;
    return this;
  }

  async perform() {
    const fields = this.keys.join(', ');
    let sql = `SELECT ${fields} FROM ${this.name}`;

    if (this.conditions) {
      const whereClasuse = where(this.conditions);
      sql += ` ${whereClasuse}`;
    }

    sql += ';';

    console.log(sql);

    return await this.pool
      .query(sql)
      .then((res) => ({ data: response(res) }))
      .catch((e) => ({ error: e }));
  }
}

class Insert {
  pool;
  name;
  values;
  returnClause = [];

  constructor({ values, name, pool }) {
    this.name = name;
    this.values = values;
    this.pool = pool;
  }

  returning(keys) {
    this.returnClause = keys;
    return this;
  }

  async perform() {
    const keys = [];
    const values = [];

    for (const key in this.values) {
      const value = this.values[key];

      keys.push(key);

      const _isString = isString(value);
      values.push(_isString ? `'${value}'` : value);
    }

    const keysClasuse = keys.join(', ');
    const valuesClasuse = values.join(', ');

    let sql = `INSERT INTO ${this.name} (${keysClasuse}) VALUES (${valuesClasuse})`;

    if (this.returnClause.length) {
      sql += ` RETURNING ${this.returnClause.join(', ')}`;
    }

    sql += ';';

    console.log(sql);

    return await this.pool
      .query(sql)
      .then((res) => ({ data: response(res) }))
      .catch((e) => ({ error: e }));
  }
}

class Update {
  pool;
  name;
  values;
  conditions;
  returnClause = [];

  constructor({ values, name, pool }) {
    this.pool = pool;
    this.name = name;
    this.values = values;
  }

  where(conditions) {
    this.conditions = conditions;
    return this;
  }

  returning(keys) {
    this.returnClause = keys;
    return this;
  }

  async perform() {
    const values = [];

    for (const key in this.values) {
      const value = this.values[key];

      const _isString = isString(value);
      const _value = _isString ? `'${value}'` : value;

      values.push(`${key}=${_value}`);
    }

    const valuesClasuse = values.join(', ');

    let sql = `UPDATE ${this.name} SET ${valuesClasuse}`;

    if (this.conditions) {
      const whereClasuse = where(this.conditions);
      sql += ` ${whereClasuse}`;
    }

    if (this.returnClause.length) {
      sql += ` RETURNING ${this.returnClause.join(', ')}`;
    }

    sql += ';';

    console.log(sql);

    return await this.pool
      .query(sql)
      .then((res) => ({ data: response(res) }))
      .catch((e) => ({ error: e }));
  }
}

class Delete {
  pool;
  name;
  conditions;

  constructor({ name, pool }) {
    this.pool = pool;
    this.name = name;
  }

  where(conditions) {
    this.conditions = conditions;
    return this;
  }

  async perform() {
    let sql = `DELETE FROM ${this.name}`;

    if (this.conditions) {
      const whereClasuse = where(this.conditions);
      sql += ` ${whereClasuse}`;
    }

    sql += ';';

    console.log(sql);

    return await this.pool
      .query(sql)
      .then((res) => ({ data: response(res) }))
      .catch((e) => ({ error: e }));
  }
}

export class Database {
  config;
  pool;
  initialized = false;

  constructor(config) {
    this.config = config;
  }

  init() {
    this.pool = new pg.Pool(this.config);
    this.initialized = true;
  }

  select(keys, name) {
    if (!this.initialized) throw Error('Database should be initalized');

    return new Select({ keys, name, pool: this.pool });
  }

  insert(values, name) {
    if (!this.initialized) throw Error('Database should be initalized');

    return new Insert({ values, name, pool: this.pool });
  }

  update(values, name) {
    if (!this.initialized) throw Error('Database should be initalized');

    return new Update({ values, name, pool: this.pool });
  }

  delete(name) {
    if (!this.initialized) throw Error('Database should be initalized');

    return new Delete({ name, pool: this.pool });
  }
}
