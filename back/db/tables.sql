CREATE TYPE Entities AS ENUM (
  'USER',
  'ROLE',
  'PRODUCT',
  'PRODUCT_CATEGORY',
  'PRODUCT_CONSUMABLE',
  'CONSUMABLE'
);

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL
);

CREATE TABLE role_settings (
    id SERIAL PRIMARY KEY,
    role_id INTEGER NOT NULL,
    entity Entities,
    add BOOLEAN DEFAULT false,
    read BOOLEAN DEFAULT false,
    delete BOOLEAN DEFAULT false,
    change BOOLEAN DEFAULT false,
    UNIQUE(role_id, entity)
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email  VARCHAR(50) NOT NULL UNIQUE,
    role_id INTEGER NOT NULL,
    FOREIGN KEY (role_id) REFERENCES role(id)
);

CREATE TABLE user_auth (
    email  VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255),
    salt VARCHAR(50),
    confirmed BOOLEAN,
    FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE;
);

CREATE TABLE consumable (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL UNIQUE,
    measurement VARCHAR(50) NOT NULL,
    cost DECIMAL NOT NULL
);

CREATE TABLE product_category (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL
);

CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL UNIQUE,
    cost DECIMAL NOT NULL,
    category_id INTEGER NOT NULL,
    FOREIGN KEY(category_id) REFERENCES product_category(id)
);

CREATE TABLE product_consumable (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    consumable_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY(product_id) REFERENCES product(id),
    FOREIGN KEY(consumable_id) REFERENCES consumable(id),
    UNIQUE(product_id, consumable_id)
);



INSERT INTO role (title) VALUES('Admin');
INSERT INTO users (first_name, last_name, email, role_id) VALUES('Admin', 'Admin', 'admin@gmail.com', 1);
INSERT INTO user_auth (email, confirmed) VALUES('admin@gmail.com', true);
INSERT INTO product_category (title) VALUES('Drinks');
INSERT INTO product_category (title) VALUES('Food');