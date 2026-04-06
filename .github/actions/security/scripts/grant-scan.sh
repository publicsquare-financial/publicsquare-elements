#!/bin/bash
set -euo pipefail

# Run grant license scan against sbom.spdx.json.
# Informational only - always exits 0.
# Writes: grant-results.json

if ! command -v grant &>/dev/null; then
  echo "::error::grant is not installed"
  exit 1
fi

echo "::group::Grant license compliance scan"

GRANT_ARGS=(list sbom.spdx.json --output json)

if [ -f .grant.yaml ]; then
  GRANT_ARGS+=(--config .grant.yaml)
  echo "Using .grant.yaml policy"
fi

grant "${GRANT_ARGS[@]}" | tee grant-results.json || true

echo "::endgroup::"

# Print summary to logs
if [ -f grant-results.json ]; then
  echo "::group::Grant results summary"
  jq -r '.[] | "\(.risk)\t\(.license)\t\(.packageName)"' grant-results.json 2>/dev/null | sort | uniq || true
  echo "::endgroup::"
fi

echo "Results written to grant-results.json"
