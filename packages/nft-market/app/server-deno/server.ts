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

app.use((ctx) => {
  console.log('renderToReadableStream:', renderToReadableStream);
  ctx.response.body = '<html><body><h1>Yo!</h1></body></html>';
});

const port: number = Number(config()['APP_SSR_SERVER_PORT_PROD']);

await app.listen({ port });
