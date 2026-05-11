# mergecrew-sample-app

A tiny Next.js app for trying out [Mergecrew](https://github.com/mergecrew/mergecrew)
end-to-end. Connect this repo to a fresh Mergecrew install and watch the agent
loop find a small bug, open a PR that fixes it, run QA, and deploy a Vercel
preview — without touching your own codebase.

## What you're looking at

One page, one component, one deliberate bug. The "decrement" button on the
counter increments instead of decrementing. The Mergecrew agent loop is
expected to:

1. **Discovery** picks up the open `Decrement button increments instead`
   tracker issue you'll file in step 4 below.
2. **PM** turns it into a one-paragraph spec.
3. **Frontend Engineer** edits `components/Counter.tsx`, runs typecheck and
   tests, commits on a feature branch, and opens a PR.
4. **QA** runs install, typecheck, and unit tests against the PR branch.
5. **SRE** dispatches `.github/workflows/deploy-dev.yml` to Vercel and posts
   the preview URL back on the PR.

End state: an open PR with a one-line code change and a Vercel preview link.
You merge it.

## What's in here

| Path | Purpose |
|---|---|
| `app/page.tsx`, `components/Counter.tsx` | The page and the buggy component. |
| `components/Counter.test.tsx` | Render tests that stay green; the bug isn't covered by a unit test on purpose, so the agent loop has to find it from the issue. |
| `mergecrew.yaml` | Stripped-down lifecycle: Discovery → PM → Implementation → QA → Deploy_dev. No post-deploy review steps, so the demo finishes fast. |
| `.github/workflows/deploy-dev.yml` | Dispatched by Mergecrew's `github-actions` deploy adapter; runs `vercel deploy` against the PR branch. |

## Walkthrough

The whole thing should take under ten minutes once Mergecrew is running.

### 1. Get a Mergecrew instance up

Follow the [self-host quickstart](https://github.com/mergecrew/mergecrew#self-host) —
one Docker command. You'll land on `http://localhost:3000` with a demo org.

### 2. Fork this repo (or clone it under your own account)

```bash
gh repo fork mergecrew/mergecrew-sample-app --clone
cd mergecrew-sample-app
```

You need it under an account you control so the Mergecrew GitHub App can be
installed against it.

### 3. Install the Mergecrew GitHub App on your fork

From the Mergecrew UI: **Settings → Integrations → GitHub** and run through
the GitHub App install flow. Grant it access to `mergecrew-sample-app` only.

### 4. Configure the project in Mergecrew

In the Mergecrew UI: **Projects → New** and pick your fork as the connected
repo. Then under **Settings → Deploy targets** add a `dev` target with
adapter `github-actions` and workflow file `deploy-dev.yml`.

You'll also need Vercel secrets on the GitHub repo (Settings → Secrets and
variables → Actions):

- `VERCEL_TOKEN` from <https://vercel.com/account/tokens>
- `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` from `.vercel/project.json` after
  running `vercel link` locally once.

### 5. File the demo issue

In the GitHub UI, open an issue titled:

> Decrement button increments instead

Body:

> The `−` button next to the counter has `aria-label="decrement"` but its
> `onClick` increments the count. It should decrement instead.

### 6. Trigger a run

Back in the Mergecrew UI, on the project overview, click **Run now**. Watch
the timeline: Discovery picks up the issue, PM writes the spec,
Implementation opens a PR, QA verifies, SRE deploys.

### 7. Merge the PR

Open the PR Mergecrew opened, click the preview URL, confirm the buttons now
do the right thing, merge.

## Local development

```bash
pnpm install   # or npm install / yarn
pnpm dev       # http://localhost:3000
pnpm test      # vitest
pnpm typecheck # tsc --noEmit
```

## Reset the demo

If you want to run the loop again, revert the agent's PR and re-file the
issue. The lifecycle has no observation/bug-triage step, so nothing else
will fire spontaneously.

## License

MIT — see [LICENSE](LICENSE).
