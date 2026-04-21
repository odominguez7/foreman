#!/usr/bin/env bash
# shop-retrieve-similar-jobs <material> <customer> — returns top-3 similar jobs JSON
mat="$(echo "$1" | tr '[:upper:]' '[:lower:]')"
cust="$2"
if [[ "$mat" == *"6061"* ]] && [[ "$cust" == *"Boeing"* || "$cust" == *"boeing"* ]]; then
cat <<'JSON'
{"query_features":"6061 aluminum bracket, Boeing T2, qty ~150","matches":[{"job_id":"3198","customer":"Boeing T2","part":"Part 82-Alpha bracket","qty":150,"quoted_price":4650,"actual_hours":28,"material":"6061 aluminum","won":true,"date":"2025-08-14"},{"job_id":"3215","customer":"Boeing T2","part":"Part 82-Beta bracket","qty":100,"quoted_price":3200,"actual_hours":20,"material":"6061 aluminum","won":true,"date":"2025-09-02"},{"job_id":"3421","customer":"Boeing T2","part":"Part 82-Gamma bracket","qty":120,"quoted_price":3300,"actual_hours":22,"material":"6061 aluminum","won":false,"date":"2026-02-02"}]}
JSON
elif [[ "$mat" == *"1018"* ]]; then
cat <<'JSON'
{"query_features":"1018 steel shaft, qty ~500","matches":[{"job_id":"3267","customer":"Honda HON-TX","part":"Shaft adapter","qty":500,"quoted_price":7500,"actual_hours":48,"material":"1018 steel","won":true,"date":"2025-10-11"},{"job_id":"3488","customer":"Stellantis","part":"Engine cover plate","qty":200,"quoted_price":5400,"actual_hours":39,"material":"1018 steel","won":true,"date":"2026-03-22"},{"job_id":"3215","customer":"Boeing T2","part":"Part 82-Beta bracket","qty":100,"quoted_price":3200,"actual_hours":20,"material":"6061 aluminum","won":true,"date":"2025-09-02"}]}
JSON
else
cat <<'JSON'
{"query_features":"fallback recent jobs","matches":[{"job_id":"3522","customer":"GE Aviation","part":"Turbine shim","qty":500,"quoted_price":8700,"actual_hours":58,"material":"304 stainless","won":true,"date":"2026-04-14"},{"job_id":"3501","customer":"Boeing T2","part":"Wing-hinge bracket","qty":80,"quoted_price":5100,"actual_hours":31,"material":"6061 aluminum","won":true,"date":"2026-04-03"},{"job_id":"3488","customer":"Stellantis","part":"Engine cover plate","qty":200,"quoted_price":5400,"actual_hours":39,"material":"1018 steel","won":true,"date":"2026-03-22"}]}
JSON
fi
