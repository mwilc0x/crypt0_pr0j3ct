import { config } from 'https://deno.land/x/dotenv/mod.ts';
import { Application } from "https://deno.land/x/oak/mod.ts";
import ReactDOMServer from "https://esm.sh/react-dom@18.0.0/server";

const app = new Application();
const renderToReadableStream = (ReactDOMServer as any).renderToReadableStream;

// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// Timing
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

app.use(async (ctx: any, next) => {
  await ctx.upgrade();
  // The new wiring is a bit more involved.
  // ctx.socket.on('error', (error: any) => {
  //   console.error('Fatal', error);
  // });

  let didError = false;

  const { pipe, abort } = await renderToReadableStream(
    <h1>hello!</h1>,
    {
      bootstrapScripts: [],
      onShellReady(a: any) {
        console.log('onShellReady', a);
        // If something errored before we started streaming, we set the error code appropriately.
        ctx.response.statusCode = didError ? 500 : 200;
        ctx.response.setHeader('Content-type', 'text/html');
        pipe(ctx.response);
      },
      onShellError(_: any) {
        console.log('onShellError', _);
        // Something errored before we could complete the shell so we emit an alternative shell.
        ctx.response.statusCode = 500;
        ctx.response.send('<!doctype><p>Error</p>');
      },
      onError(error: any) {
        console.log('onError', error);
        didError = true;
        console.error(error);
      },
    }
  );
});

const port: number = Number(config()['APP_SSR_SERVER_PORT_PROD']);

await app.listen({ port });
