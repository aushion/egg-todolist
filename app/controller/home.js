'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  // 查询列表
  async index() {
    const ctx = this.ctx;
    const todoList = await ctx.service.todo.list();
    ctx.body = {
      todoList,
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
    const message = await ctx.service.todo.create(ctx.request.body);
    ctx.body = {
      code: 200,
      message,
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
    const message = await ctx.service.todo.update(ctx.request.body);
    ctx.body = {
      code: 200,
      message,
    };
    ctx.status = 200;
  }

  // 删除一条记录
  async destroy() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const message = await ctx.service.todo.destroy({ id });
    ctx.body = {
      code: 200,
      message,
    };
  }
}

module.exports = HomeController;
