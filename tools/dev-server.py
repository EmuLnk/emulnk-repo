#!/usr/bin/env python3
"""EmuLnk dev server — static file serving + directory mtime endpoint."""

import http.server
import io
import json
import os
import sys
import urllib.parse
import zipfile


class DevHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path == "/__dev_reload":
            self._handle_dev_reload(parsed.query)
        elif parsed.path == "/__dev_sync":
            self._handle_dev_sync()
        else:
            super().do_GET()

    def _handle_dev_reload(self, query):
        params = urllib.parse.parse_qs(query)
        rel_path = params.get("path", [None])[0]
        if not rel_path:
            self._json_error(400, "missing 'path' param")
            return

        cwd = os.path.realpath(os.getcwd())
        target = os.path.realpath(os.path.join(cwd, rel_path))
        if target != cwd and not target.startswith(cwd + os.sep):
            self._json_error(403, "path outside repository")
            return
        if not os.path.isdir(target):
            self._json_error(404, "directory not found")
            return

        max_mtime = 0.0
        for root, _, files in os.walk(target, followlinks=False):
            for f in files:
                try:
                    mt = os.path.getmtime(os.path.join(root, f))
                    if mt > max_mtime:
                        max_mtime = mt
                except OSError:
                    pass

        body = json.dumps({"mtime": max_mtime}).encode()
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _handle_dev_sync(self):
        buf = io.BytesIO()
        root = os.getcwd()
        with zipfile.ZipFile(buf, "w", zipfile.ZIP_DEFLATED) as zf:
            for dirpath, _, filenames in os.walk(root):
                # skip hidden dirs (.git, etc.)
                rel_dir = os.path.relpath(dirpath, root)
                if rel_dir != "." and any(part.startswith(".") for part in rel_dir.split(os.sep)):
                    continue
                for fname in filenames:
                    if fname.startswith("."):
                        continue
                    full = os.path.join(dirpath, fname)
                    if os.path.islink(full):
                        continue
                    arcname = "dev/" + os.path.relpath(full, root).replace(os.sep, "/")
                    try:
                        zf.write(full, arcname)
                    except OSError:
                        pass

        body = buf.getvalue()
        self.send_response(200)
        self.send_header("Content-Type", "application/zip")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Content-Disposition", 'attachment; filename="dev.zip"')
        self.end_headers()
        self.wfile.write(body)

    def _json_error(self, code, msg):
        body = json.dumps({"error": msg}).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        super().end_headers()


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 5500
    server = http.server.HTTPServer(("", port), DevHandler)
    print(f"EmuLnk dev server on http://localhost:{port}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")


if __name__ == "__main__":
    main()
