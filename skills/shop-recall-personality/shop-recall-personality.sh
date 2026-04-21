#!/usr/bin/env bash
# shop-recall-personality "<customer>" "<material>" "<part_family>"
# Customer-gated retrieval from the shop personality store.
SKILL_DIR="$(cd "$(dirname "$0")" && pwd)"
exec python3 "${SKILL_DIR}/recall.py" "$@"
