#!/usr/bin/env python3

from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

HOST = "0.0.0.0"
PORT = 8080
DOCROOT = Path(__file__).resolve().parent / "play.pokemonshowdown.com"


class NC2000HTTPRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        # Browsers/proxies may keep a cached copy, but they must validate it
        # with the server before using it.
        self.send_header(
            "Cache-Control",
            "no-cache, max-age=0, must-revalidate"
        )

        # Compatibility for older HTTP caches/browsers.
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")

        super().end_headers()


def main():
    if not DOCROOT.is_dir():
        raise SystemExit(f"Document root not found: {DOCROOT}")

    handler = partial(
        NC2000HTTPRequestHandler,
        directory=str(DOCROOT),
    )

    server = ThreadingHTTPServer((HOST, PORT), handler)

    print(f"Serving: {DOCROOT}")
    print(f"Listening: http://{HOST}:{PORT}/")
    print("Cache policy: no-cache, max-age=0, must-revalidate")

    server.serve_forever()


if __name__ == "__main__":
    main()
