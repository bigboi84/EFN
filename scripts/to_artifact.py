#!/usr/bin/env python3
"""Turn a single-file Vite build (dist-single/index.html or dist-arena-single/index.html) into the
body-only page format used for claude.ai artifacts.  Usage: to_artifact.py <index.html> <out.html>"""
import re
import sys

src, out = sys.argv[1], sys.argv[2]
s = open(src).read()
head = re.search(r"<head>(.*)</head>", s, re.S).group(1)
body = re.search(r"<body>(.*)</body>", s, re.S).group(1)
head = re.sub(r"<meta charset[^>]*>\s*", "", head)
head = re.sub(r'<meta name="viewport"[^>]*>\s*', "", head)
title = re.search(r"<title>.*?</title>", head).group(0)
head = head.replace(title, "")
scripts = re.findall(r'<script type="module"[^>]*>.*?</script>', head, re.S)
for sc in scripts:
    head = head.replace(sc, "")
open(out, "w").write(title + "\n" + head.strip() + "\n" + body.strip() + "\n" + "\n".join(scripts))
