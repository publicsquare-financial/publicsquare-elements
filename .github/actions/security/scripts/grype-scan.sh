#!/bin/bash
set -euo pipefail

# Run grype vulnerability scan against sbom.spdx.json.
# Expects:
#   SEVERITY     - Minimum severity to fail on (CRITICAL, HIGH, MEDIUM, LOW)
#   RESULTS_FILE - Output file for JSON results

: "${SEVERITY:?SEVERITY is required}"
: "${RESULTS_FILE:?RESULTS_FILE is required}"

if ! command -v grype &>/dev/null; then
  echo "::error::grype is not installed"
  exit 1
fi

SEVERITY_LOWER=$(echo "${SEVERITY}" | tr '[:upper:]' '[:lower:]')

GRYPE_ARGS=(sbom.spdx.json --output json --file "${RESULTS_FILE}" --fail-on "${SEVERITY_LOWER}" --only-fixed)

if [ -f .grype.yaml ]; then
  GRYPE_ARGS+=(--config .grype.yaml)
  echo "Using .grype.yaml config"
fi

echo "::group::Grype vulnerability scan (fail-on: ${SEVERITY})"

GRYPE_EXIT=0
grype "${GRYPE_ARGS[@]}" || GRYPE_EXIT=$?

echo "::endgroup::"
echo "Results written to ${RESULTS_FILE}"

# Print summary to logs so output is visible
if [ -f "${RESULTS_FILE}" ]; then
  echo "::group::Grype results summary"
  jq -r '.matches[] | "\(.vulnerability.severity)\t\(.vulnerability.id)\t\(.artifact.name)@\(.artifact.version)"' "${RESULTS_FILE}" 2>/dev/null | sort | uniq || true
  echo "::endgroup::"
fi

exit "${GRYPE_EXIT}"
