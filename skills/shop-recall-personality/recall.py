#!/usr/bin/env python3
"""shop-recall-personality: customer-gated scoring over the shop personality JSONL."""
import json, sys
from pathlib import Path

MEM_FILE = Path("/sandbox/.openclaw-data/shop-memory/personality.jsonl")

def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "usage: recall.py <customer> [material] [part_family]"}))
        return
    customer = sys.argv[1]
    material = sys.argv[2] if len(sys.argv) > 2 else ""
    part_family = sys.argv[3] if len(sys.argv) > 3 else ""

    if not MEM_FILE.exists() or MEM_FILE.stat().st_size == 0:
        print(json.dumps({"matches": [], "note": "no personality entries yet — shop has no learned preferences"}))
        return

    rows = []
    with MEM_FILE.open() as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            try:
                rows.append(json.loads(line))
            except Exception:
                continue

    def score(r):
        if r.get("customer") != customer:
            return 0
        s = 100
        if material and r.get("material") == material:
            s += 20
        if part_family and r.get("part_family") == part_family:
            s += 10
        return s

    scored = [(score(r), r) for r in rows]
    matches = [r for s, r in sorted([(s, r) for s, r in scored if s > 0], key=lambda x: (-x[0], -x[1].get("ts", 0)))[:5]]

    out = {"matches": matches, "query": {"customer": customer, "material": material, "part_family": part_family}}
    print(json.dumps(out))

if __name__ == "__main__":
    main()
