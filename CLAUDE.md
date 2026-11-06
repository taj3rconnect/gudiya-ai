# gudiya-ai

Static site. Production is GitHub Pages at `/gudiya-ai/`.

## Local Docker copy (TajHome-Room)

- URL: http://127.0.0.1:3078/gudiya-ai/ (loopback only; port registered in the vault PORT_REGISTRY as `gudiya-ai`)
- Start: `docker compose -f docker/compose.yml up -d`
- Stop: `docker compose -f docker/compose.yml down`
- The repo is bind-mounted read-only, so `git pull` updates the site with no rebuild.
- `config.js` is replaced by `docker/config.local.js` (empty `ASKDAD_URL`). This stops local visits reaching the live Worker. Ask Dad is off locally.
- `docker/nginx.conf` blocks dotfiles, `docker/`, and this file. Add any new non-site file to that block.
