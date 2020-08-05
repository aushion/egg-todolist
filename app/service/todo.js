'use strict';

const Service = require('egg').Service;

class TodoService extends Service {
  async list(params) {
    const { pageSize, pageIndex } = params;

    const allData = await this.app.mysql.select('todolist');
    const result = await this.app.mysql.select('todolist', {
      orders: [[ 'created_at', 'desc' ]],
      limit: pageSize,
      offset: pageSize * pageIndex - pageSize,
    });
    return { total: allData.length, data: result };
  }

  async create(params) {
    const result = await this.app.mysql.insert('todolist', {
      id: this.ctx.helper.uuid(),
      ...params,
    });
    const insertSuccess = result.affectedRows === 1;
    if (insertSuccess) {
      return '插入成功';
    }

    return '插入失败';
  }

  async update(params) {
    const result = await this.app.mysql.update('todolist', params);
    const updateSuccess = result.affectedRows === 1;
    if (updateSuccess) {
      return '更新成功';
    }
    return '更新失败';
  }

  async destroy(parmas) {
    const result = await this.app.mysql.delete('todolist', parmas);
    console.log(result);
    return '删除成功';
  }
}

module.exports = TodoService;
