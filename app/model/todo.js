'use strict';
// const uuidv4 = require('uuid/v4');
const cuid = require('cuid');

module.exports = app => {
  const { STRING, INTEGER, TEXT, UUID } = app.Sequelize;

  const Todo = app.model.define('todo', {
    id: { type: UUID,
      defaultValue() {
        return cuid();
      }, primaryKey: true },
    title: STRING(255),
    detail: TEXT(65535),
    status: INTEGER,
    // created_at: DATE,
    // updated_at: DATE,
  }, {
    tableName: 'todolist',
  });

  return Todo;
};
