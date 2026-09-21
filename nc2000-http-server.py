#!/usr/bin/env python3

from functools import partial
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import re

HOST = "0.0.0.0"
PORT = 8080
DOCROOT = Path(__file__).resolve().parent / "play.pokemonshowdown.com"


class NC2000HTTPRequestHandler(SimpleHTTPRequestHandler):
    range_pattern = re.compile(
        r"bytes=(\d*)-(\d*)\Z",
        re.IGNORECASE
    )

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

        # Static files support a single HTTP byte range.
        self.send_header("Accept-Ranges", "bytes")

        super().end_headers()

    def send_head(self):
        self.nc2000_range = None
        range_header = self.headers.get("Range")

        if not range_header:
            return super().send_head()

        path = Path(
            self.translate_path(self.path)
        )

        # Keep the standard redirect and directory-listing behavior.
        if path.is_dir():
            return super().send_head()

        try:
            source = path.open("rb")
        except OSError:
            self.send_error(
                HTTPStatus.NOT_FOUND,
                "File not found"
            )
            return None

        try:
            stat = path.stat()
            size = stat.st_size
            selected = self.parse_range(
                range_header,
                size
            )

            if selected is None:
                self.send_response(
                    HTTPStatus.REQUESTED_RANGE_NOT_SATISFIABLE
                )
                self.send_header(
                    "Content-Range",
                    f"bytes */{size}"
                )
                self.send_header(
                    "Content-Length",
                    "0"
                )
                self.end_headers()
                source.close()
                return None

            start, end = selected
            length = end - start + 1

            self.send_response(
                HTTPStatus.PARTIAL_CONTENT
            )
            self.send_header(
                "Content-Type",
                self.guess_type(str(path))
            )
            self.send_header(
                "Content-Range",
                f"bytes {start}-{end}/{size}"
            )
            self.send_header(
                "Content-Length",
                str(length)
            )
            self.send_header(
                "Last-Modified",
                self.date_time_string(
                    stat.st_mtime
                )
            )
            self.end_headers()

            self.nc2000_range = (
                start,
                length,
            )

            return source

        except Exception:
            source.close()
            raise

    @classmethod
    def parse_range(
        cls,
        header,
        size,
    ):
        match = cls.range_pattern.fullmatch(
            header.strip()
        )

        if not match or size <= 0:
            return None

        start_text, end_text = match.groups()

        if not start_text and not end_text:
            return None

        if start_text:
            start = int(start_text)

            if start >= size:
                return None

            if end_text:
                end = int(end_text)

                if end < start:
                    return None

                end = min(
                    end,
                    size - 1,
                )
            else:
                end = size - 1

            return start, end

        suffix_length = int(end_text)

        if suffix_length <= 0:
            return None

        suffix_length = min(
            suffix_length,
            size,
        )

        return (
            size - suffix_length,
            size - 1,
        )

    def copyfile(
        self,
        source,
        outputfile,
    ):
        selected = getattr(
            self,
            "nc2000_range",
            None,
        )

        if selected is None:
            return super().copyfile(
                source,
                outputfile,
            )

        start, remaining = selected
        source.seek(start)

        while remaining:
            chunk = source.read(
                min(
                    64 * 1024,
                    remaining,
                )
            )

            if not chunk:
                break

            outputfile.write(chunk)
            remaining -= len(chunk)


def main():
    if not DOCROOT.is_dir():
        raise SystemExit(
            f"Document root not found: {DOCROOT}"
        )

    handler = partial(
        NC2000HTTPRequestHandler,
        directory=str(DOCROOT),
    )

    server = ThreadingHTTPServer(
        (HOST, PORT),
        handler,
    )

    print(f"Serving: {DOCROOT}")
    print(
        f"Listening: "
        f"http://{HOST}:{PORT}/"
    )
    print(
        "Cache policy: "
        "no-cache, max-age=0, must-revalidate"
    )
    print("Byte ranges: enabled")

    server.serve_forever()


if __name__ == "__main__":
    main()
