# OpenCode setup package

1. Unzip into the ROOT of the project (next to package.json). Commit first: `git init && git add -A && git commit -m "template"` (so you can diff or revert).
2. Put `clients.md` and `brief.md` in the project root (or `docs/`). The agents read both and check every fact against them; conflicts are logged in `docs/DISCREPANCIES.md` and the reconciled table is `docs/VERIFIED_FACTS.md` (both are created in Phase 0).
3. Put the client's media in `public/assets/` and fill `docs/MEDIA_MANIFEST.md`.
4. Run `opencode` in the project root, select the `build` agent, and paste the contents of `KICKOFF.md`.
5. Agent files are in `.opencode/agents/`. If your OpenCode version uses the older folder name, rename it to `.opencode/agent/`.
   Check which one is loaded by typing `@` in the prompt; the six agents (a-foundation ... f-integrator) should appear.
