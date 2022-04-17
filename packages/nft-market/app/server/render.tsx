import { concat, extname } from "./deps.ts";
import React from "react";
import ReactDOMServer from "react-dom";
import { Router } from "wouter";
import { HelmetProvider } from "react-helmet";
import app from "app";

const renderToReadableStream = (ReactDOMServer as any).renderToReadableStream;
const defaultChunkSize = 8 * 1024;
const sourceDirectory = Deno.env.get("source") || "src";

type ImportMap = {
  imports: { [key: string]: string }
};

type Options = {
  url: URL,
  serverPath: string,
  importMap: ImportMap
};

export async function render(options: Options) {
    const { importMap } = options;
    const chunkSize = defaultChunkSize;

    const helmetContext: { helmet: Record<string, number> } = { helmet: {} };
    const cache = new Map();

    let importedApp: any;
    let transpiledApp = importMap?.imports?.app?.replace(
      `./${sourceDirectory}/`,
      "",
    );
    transpiledApp = transpiledApp?.replace(extname(transpiledApp), ".js");

    const controller = new AbortController();
    let body;
    try {
      body = await renderToReadableStream(
        React.createElement(
          Router,
          null,
          React.createElement(
            HelmetProvider,
            { context: helmetContext },
            React.createElement(
              importedApp?.default || app,
              { cache },
              null,
            )
          )
        ),
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
      const { helmet } = helmetContext;
      const lang = 'en';
      const head =
        `<!DOCTYPE html><html lang="${lang}"><head>${
          Object.keys(helmet)
            .map((i) => helmet[i].toString())
            .join("")
        }<script type="module" defer>
        import { createElement } from "${
          importMap.imports["react"]
        }";import { hydrateRoot } from "${
          importMap.imports["react-dom"]
        }";import { Router } from "${
          importMap.imports["wouter"]
        }";import { HelmetProvider } from "${
          importMap.imports["react-helmet"]
        }";import App from "/${transpiledApp}";
        const root = hydrateRoot(
          document.getElementById("gmi"),
          createElement(Router, null, createElement(HelmetProvider, null, createElement(App))) 
        )
        </script></head><body><div id="gmi">`;
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