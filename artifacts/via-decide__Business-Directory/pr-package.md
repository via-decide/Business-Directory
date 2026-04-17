Branch: simba/create-dataset-exporter
Title: Create dataset exporter.

## Summary
- Repo orchestration task for via-decide/Business-Directory
- Goal: Create dataset exporter.

## Testing Checklist
- [ ] Run unit/integration tests
- [ ] Validate command flow
- [ ] Validate generated artifact files

## Risks
- Prompt quality depends on repository metadata completeness.
- GitHub API limits/token scope can block deep inspection.

## Rollback
- Revert branch and remove generated artifact files if workflow output is invalid.