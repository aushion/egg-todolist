'use strict';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Controller = require('egg').Controller;
function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class HomeController extends Controller {
  // 查询列表
  async index() {
    const ctx = this.ctx;
    const query = ctx.query;
    const { pageSize, pageIndex, status = '', title = '' } = query;
    // const response = await ctx.service.todo.list(query)
    const operate = status !== '' ? {
      limit: toInt(pageSize),
      offset: toInt(pageSize * pageIndex - pageSize),
      order: [[ 'createdAt', 'DESC' ]],
      where: { status, title: {
        [Op.like]: `%${title}%`,
      } },
    } : {
      limit: toInt(pageSize),
      offset: toInt(pageSize * pageIndex - pageSize),
      order: [[ 'createdAt', 'DESC' ]],
      where: { title: {
        [Op.like]: `%${title}%`,
      } },
    };
    const response = await ctx.model.Todo.findAll(operate);
    const total = await ctx.model.Todo.findAndCountAll(operate);
    ctx.body = {
      code: 200,
      result: {
        data: response,
        pageInfo: {
          pageSize: Number(query.pageSize),
          pageIndex: Number(query.pageIndex),
          total: total.count,
        },
      },
    };
  }

  // 创建一条记录
  async create() {
    const ctx = this.ctx;
    const createRule = {
      title: 'string',
      detail: 'string',
      status: 'number',
    };
    ctx.validate(createRule, ctx.request.body.data);
    // const message = await ctx.service.todo.create(ctx.request.body);
    const data = await ctx.model.Todo.create({ ...ctx.request.body });
    // console.log('message', message);
    ctx.body = {
      code: 200,
      result: {
        data,
      },
      message: '插入成功',
    };
    ctx.status = 201;
  }

  // 更新一条记录
  async update() {
    const ctx = this.ctx;
    const createRule = {
      id: 'string',
      title: 'string',
      detail: 'string',
      status: 'number',
    };
    ctx.validate(createRule, ctx.request.body.data);
    const id = ctx.params.id;
    const item = await ctx.model.Todo.findByPk(id);
    if (!item) {
      ctx.status = 404;
      return;
    }
    const data = await item.update(ctx.request.body);
    // const message = await ctx.service.todo.update(ctx.request.body);
    ctx.body = {
      code: 200,
      result: {
        data,
      },
      message: '修改成功',
    };
    ctx.status = 200;
  }

  // 删除一条记录
  async destroy() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const item = await ctx.model.Todo.findByPk(id);
    // const message = await ctx.service.todo.destroy({ id });
    const data = item.destroy();
    ctx.body = {
      code: 200,
      result: {
        data,
      },
      message: '删除成功',
    };
  }
}

module.exports = HomeController;
