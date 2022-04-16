import { concat } from "https://deno.land/std@0.132.0/bytes/mod.ts";
import ReactDOMServer from "https://esm.sh/react-dom@18.0.0/server";

const renderToReadableStream = (ReactDOMServer as any).renderToReadableStream;
const defaultChunkSize = 8 * 1024;

export async function render(options: any) {
    const controller = new AbortController();
    const chunkSize = defaultChunkSize;
    let body;
    try {
      body = await renderToReadableStream(
        <h1>hello!</h1>,
        {
          signal: controller.signal,
        }
      );
    } catch (error: any) {
      console.log({ error });
      body = new ReadableStream({
        start(controller) {
          const chunk = new TextEncoder().encode(error);
          controller.enqueue(chunk);
          controller.close();
        },
      });
    }
  
    const htmlHead = () => {
      const lang = 'en';
      const head =
        `<!DOCTYPE html><html lang="${lang}"><head>` +
        `</script></head><body>`;
      return head;
    };
    const htmlTail = () => {
      return `</div></body></html>`;
    };
    const encodedStream = encodeStream(body);
    const bodyReader = encodedStream.getReader();
  
    return encodeStream(
      new ReadableStream({
        start(controller) {
          const queue = (part: string | Uint8Array) => {
            return Promise.resolve(controller.enqueue(part));
          };
  
          queue(htmlHead())
            .then(() => pushBody(bodyReader, controller, chunkSize))
            .then(() => queue(htmlTail()))
            .then(() => controller.close());
        },
      }),
    );
  }
  
  async function pushBody(
    reader: ReadableStreamDefaultReader<Uint8Array>,
    controller: ReadableStreamDefaultController<Uint8Array>,
    chunkSize: number,
  ) {
    const chunkFlushTimeoutMs = 1;
    let parts = [] as Uint8Array[];
    let partsSize = 0;
  
    let idleTimeout = 0;
    const idleFlush = () => {
      const write = concat(...parts);
      parts = [];
      partsSize = 0;
      controller.enqueue(write);
    };
  
    while (true) {
      const read = await reader.read();
      if (read.done) {
        break;
      }
      partsSize += read.value.length;
      parts.push(read.value);
      if (partsSize >= chunkSize) {
        const write = concat(...parts);
        parts = [];
        partsSize = 0;
        if (write.length > chunkSize) {
          parts.push(write.slice(chunkSize));
        }
        controller.enqueue(write.slice(0, chunkSize));
      } else {
        if (idleTimeout) clearTimeout(idleTimeout);
        idleTimeout = setTimeout(idleFlush, chunkFlushTimeoutMs);
      }
    }
    if (idleTimeout) clearTimeout(idleTimeout);
    controller.enqueue(concat(...parts));
  }
  
  const encodeStream = (readable: ReadableStream<string | Uint8Array>) =>
    new ReadableStream({
      start(controller) {
        return (async () => {
          const encoder = new TextEncoder();
          const reader = readable.getReader();
          try {
            while (true) {
              const read = await reader.read();
              if (read.done) break;
  
              if (typeof read.value === "string") {
                controller.enqueue(encoder.encode(read.value));
              } else if (read.value instanceof Uint8Array) {
                controller.enqueue(read.value);
              } else {
                return undefined;
              }
            }
          } finally {
            controller.close();
          }
        })();
      },
    });