#!/usr/bin/env bash
# shop-check-material <material> <qty> — returns inventory JSON
mat="$(echo "$1" | tr '[:upper:]' '[:lower:]' | sed 's/aluminum 6061/6061 aluminum/;s/aluminum 6063/6063 aluminum/;s/^4140$/4140 steel/;s/^1018$/1018 steel/;s/ss 304/304 stainless/;s/ss 316/316 stainless/')"
qty="${2:-0}"
case "$mat" in
  "6061 aluminum"|"6063 aluminum"|"1018 steel"|"brass 360")
    printf '{"material":"%s","qty":%d,"in_stock":true,"lead_time_days":0,"supplier":"On hand"}\n' "$mat" "$qty" ;;
  "4140 steel")
    printf '{"material":"%s","qty":%d,"in_stock":false,"lead_time_days":3,"supplier":"Admiral Steel"}\n' "$mat" "$qty" ;;
  "304 stainless")
    printf '{"material":"%s","qty":%d,"in_stock":false,"lead_time_days":7,"supplier":"Ryerson"}\n' "$mat" "$qty" ;;
  "316 stainless")
    printf '{"material":"%s","qty":%d,"in_stock":false,"lead_time_days":10,"supplier":"Ryerson"}\n' "$mat" "$qty" ;;
  "titanium gr5")
    printf '{"material":"%s","qty":%d,"in_stock":false,"lead_time_days":21,"supplier":"TMS Titanium"}\n' "$mat" "$qty" ;;
  *) echo '{"error":"Unknown material","material":"'"$1"'","hint":"Supported: 6061/6063 aluminum, 4140/1018 steel, 304/316 stainless, brass 360, titanium Gr5"}' ;;
esac
