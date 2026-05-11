# mergecrew-sample-app

A tiny Next.js app for trying out [Mergecrew](https://github.com/mergecrew/mergecrew)
end-to-end. Connect this repo to a fresh Mergecrew install and watch the agent
loop pick up a tracker issue, open a PR, run QA, and deploy a Vercel preview —
without touching your own codebase.

Two pre-canned scenarios live below: a bug fix and a feature add. You can run
them back-to-back to see both flavours of the loop on the same repo.

## What's in here

| Path | Purpose |
|---|---|
| `app/page.tsx`, `components/Counter.tsx` | The page and the (deliberately buggy) component. |
| `components/Counter.test.tsx` | Render tests that stay green; the scenarios aren't covered by failing unit tests on purpose, so the agent loop has to act on the tracker issues. |
| `mergecrew.yaml` | Stripped-down lifecycle: Discovery → PM → Implementation → QA → Deploy_dev. No post-deploy review steps, so each demo run finishes fast. |
| `.github/workflows/deploy-dev.yml` | Dispatched by Mergecrew's `github-actions` deploy adapter; runs `vercel deploy` against the PR branch. |

## One-time setup

Steps 1–4 only happen once. After this, scenarios 1 and 2 each take ~5 minutes.

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

## Scenario 1: fix a bug

The "decrement" button next to the counter increments instead. The agent loop
should find the issue, write a one-line fix, run QA, deploy a preview, comment
back on the PR.

### 5a. File the issue

In the GitHub UI of your fork, open an issue titled:

> Decrement button increments instead

Body:

> The `−` button next to the counter has `aria-label="decrement"` but its
> `onClick` increments the count. It should decrement instead.

### 6a. Trigger a run

Back in the Mergecrew UI, on the project overview, click **Run now**. Watch
the timeline: Discovery picks up the issue, PM writes the spec, Frontend
Engineer opens a PR, QA verifies, SRE deploys.

### 7a. Review and merge

Open the PR Mergecrew opened, click the preview URL, confirm the `−` button
now decrements, merge.

## Scenario 2: add a feature

Now the buttons work, but there's no way to get back to zero from a high
count. The agent loop should add a third button.

### 5b. File the issue

In the GitHub UI of your fork, open a second issue:

> Add a Reset button to the counter

Body:

> The counter needs a way to return to zero without clicking decrement
> repeatedly. Add a third button labelled `Reset` (or `↺`) next to the
> existing increment/decrement controls. When clicked, it should set the
> count back to `0`. Update the existing component tests to cover the new
> control: rendering the button and verifying its `aria-label`.

### 6b. Trigger a second run

In the Mergecrew UI, click **Run now** again. Same lifecycle, different
intent. The agent should open a new PR adding the button to
`components/Counter.tsx` and extending `components/Counter.test.tsx`.

### 7b. Review and merge

Open the PR, click the preview URL, confirm a `Reset` button now appears and
zeroes the counter, merge.

## What you've just seen

Two runs against the same repo exercising the two common intent flavours:

| Scenario | Intent kind | Files the agent touches |
|---|---|---|
| 1 | Bug fix (one-line) | `components/Counter.tsx` |
| 2 | Feature add | `components/Counter.tsx` + `components/Counter.test.tsx` |

Both flow through the same Discovery → PM → Implementation → QA → Deploy_dev
lifecycle defined in `mergecrew.yaml`.

## Local development

```bash
pnpm install   # or npm install / yarn
pnpm dev       # http://localhost:3000
pnpm test      # vitest
pnpm typecheck # tsc --noEmit
```

## Reset and re-run

To replay either scenario from scratch: revert the agent's merged PR (GitHub
exposes a one-click **Revert** on each merged PR), close any open Mergecrew
PRs against the same intent, then re-file the issue. The lifecycle has no
observation/bug-triage step, so nothing else fires spontaneously.

## License

MIT — see [LICENSE](LICENSE).
