import glob
import re
import os

for f in sorted(glob.glob("*.html")):
    content = open(f, encoding="utf-8").read()
    
    # Check internal hash links
    hrefs = re.findall(r'href=[\'"](#[a-zA-Z0-9_\-]+)[\'"]', content)
    ids = set(re.findall(r'id=[\'"]([a-zA-Z0-9_\-]+)[\'"]', content))
    missing = [h for h in set(hrefs) if h[1:] not in ids]
    if missing:
        print(f"{f}: MISSING IDs -> {missing}")

    # Check relative links (e.g. page.html or assets/...)
    rel_links = re.findall(r'(?:href|src)=[\'"]([a-zA-Z0-9_\-/\.]+\.[a-zA-Z0-9]+(?:#[a-zA-Z0-9_\-]+)?)[\'"]', content)
    for link in set(rel_links):
        if link.startswith('http') or link.startswith('mailto:') or link.startswith('tel:'):
            continue
        clean_path = link.split('#')[0]
        if not os.path.exists(clean_path):
            print(f"{f}: BROKEN LINK/ASSET -> {clean_path}")

print("Check finished!")
