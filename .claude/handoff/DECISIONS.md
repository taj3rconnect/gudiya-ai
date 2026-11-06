# Decisions

From the user:
- "Set up a local Docker container and host this website."
- Ran `/tdone` to save and ship the work.

Made during the work:
- The local copy serves an empty `ASKDAD_URL`. Visit beacons need no CORS preflight, so they would otherwise reach the live Worker from localhost.
- Ask Dad is off locally. The Worker rejects localhost origins anyway.
- The repo is bind-mounted read-only, so `git pull` updates the site with no rebuild.
- nginx blocks dotfiles, `docker/`, and `CLAUDE.md` because the whole repo is mounted.
- Loopback bind only, no tunnel.
- `network_mode: bridge`, because new Compose networks failed on the first host. Other projects' networks were not pruned.

Tried and failed:
- A Compose default network: "all predefined address pools have been fully subnetted".
- `/gudiya-ai` with no trailing slash returned 404 until an exact-match redirect was added.
