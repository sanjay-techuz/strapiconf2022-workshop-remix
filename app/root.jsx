import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import styles from "./styles/tailwind.css";

export function links () {
  return [{
    rel: "stylesheet",
    href: "https://unpkg.com/tailwindcss@^2.0/dist/tailwind.min.css"
  },
  { rel: "stylesheet", href: styles },

]
}


// // ...


// export const links = () => [
//   { rel: "stylesheet", href: styles },
// ];

export function meta() {
  return { title: "Our Work." };
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
