import { config } from 'https://deno.land/x/dotenv/mod.ts';
import { serve } from "https://deno.land/std@0.132.0/http/server.ts";
import { render } from "./render.tsx";

const port: number = Number(config()['APP_SSR_SERVER_PORT_PROD']);
const path = `http://localhost:${port}`;

const handler = async (request: Request) => {
  const url = new URL(request.url);

  return new Response(
    await render({
      url
    }),
    {
      headers: {
        "content-type": "text/html; charset=utf-8",
      },
    },
  );
};

console.log(`Server running ${path}`);
serve(handler, { port: +port });
