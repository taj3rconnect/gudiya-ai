<!-- resume-branch: main -->
# Status

Goal: host the static site in a local Docker container.

Done:
- Container `gudiya-ai` serves the site on 127.0.0.1:3078 at `/gudiya-ai/`.
- Files: `docker/compose.yml`, `docker/nginx.conf`, `docker/config.local.js`, root `CLAUDE.md`, `.gitignore`.
- Port 3078 is registered in the vault PORT_REGISTRY.
- The wip branch for this work was merged into main.

In progress: nothing.

Open questions: none.

Next step: none — clean stopping point. To run the site on another PC, run `docker compose -f docker/compose.yml up -d` from the repo root.
