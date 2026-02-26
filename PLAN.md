# Plan: Create PR for README to main

## Summary

Create a Pull Request from the `feature/add-readme` branch to `main` using the `gh` CLI. The branch already contains a committed `README.md` with project info, setup instructions, and contributing guidelines. No files need to be created or modified — the only action is to push the branch (if needed) and open the PR with the specified title and body.

## Files to Create

None. This task only involves creating a GitHub Pull Request.

## Files to Modify

None. The task explicitly requires no file modifications.

## Implementation Steps

1. **Ensure the branch is pushed to the remote**: Run `git push -u origin feature/add-readme` so the remote has the latest commits.
2. **Create the Pull Request**: Run `gh pr create` with:
   - `--base main` to target the main branch
   - `--head feature/add-readme` for the source branch
   - `--title "Add README.md"`
   - `--body` describing that this adds a README with project info, setup instructions, and contributing guidelines

   Full command:
   ```bash
   gh pr create \
     --base main \
     --head feature/add-readme \
     --title "Add README.md" \
     --body "$(cat <<'EOF'
   ## Summary
   - Adds a README.md to the repository with project information, setup instructions, and contributing guidelines

   ## Details
   This PR introduces the initial `README.md` for the project, covering:
   - **Project info**: Name and description of the test repository for the agent-container system
   - **Setup instructions**: Steps to clone, install dependencies, and start the project
   - **Contributing guidelines**: Fork-and-PR workflow for contributors

   ## Test plan
   - [ ] Verify README.md renders correctly on GitHub
   - [ ] Confirm all sections (project info, setup, contributing) are present

   🤖 Generated with [Claude Code](https://claude.com/claude-code)
   EOF
   )"
   ```

## Testing

- Verify the PR was created successfully by checking the URL returned by `gh pr create`.
- Run `gh pr view` to confirm the PR title, body, base branch, and head branch are correct.
- Confirm no files were modified during this process (`git status` should show a clean working tree, aside from this PLAN.md).
