const Router = require('koa-router');
const router = new Router();

exports.init = async (app, nextApp) => {
    const handler = nextApp.getRequestHandler();
    router.all('/', async ctx => { ctx.status = 200;  await nextApp.render(ctx.req, ctx.res, '/', ctx.query); });

    router.all('/categories/:id', async ctx => { ctx.status = 200; await nextApp.render(ctx.req, ctx.res, `/categories/[id]`, { id: ctx.params.id }); });

    router.all('*', async ctx => {
        await handler(ctx.req, ctx.res);
        ctx.respond = false;
    });

    app.use(router.routes());
} 