import { config } from 'https://deno.land/x/dotenv/mod.ts';
import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

app.use((ctx) => {
  ctx.response.body = '<html><body><h1>Yo!</h1></body></html>';
});

const port: number = Number(config()['APP_SSR_SERVER_PORT_PROD']);

await app.listen({ port });
