#!/usr/bin/env node
// guideline-dates.mjs — records when each guideline last changed.
//
// /guidelines.json publishes an `updatedAt` per guideline. Git knows the answer,
// but the build machine does not: Vercel checks the repository out without a
// usable per-file history, so reading git at build time collapses every date
// onto the build day. The dates are therefore generated here, committed, and
// read back by server/routes/guidelines.json.ts.
//
// Run after committing a change to a guideline:
//
//   npm run dates && git add guideline-dates.json && git commit
//
// `npm run validate` fails when a guideline has no entry, and warns when git
// knows a newer date than the file records.

import { execFileSync } from 'node:child_process'
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join, dirname, resolve, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const CONTENT_ROOT = join(REPO_ROOT, 'content', 'guidelines')
const DATES_FILE = join(REPO_ROOT, 'guideline-dates.json')

export function guidelineFiles() {
  const out = []
  for (const category of readdirSync(CONTENT_ROOT)) {
    const dir = join(CONTENT_ROOT, category)
    if (!statSync(dir).isDirectory()) continue
    for (const file of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
      out.push(relative(REPO_ROOT, join(dir, file)))
    }
  }
  return out.sort()
}

// Last commit that touched the file, or '' when git cannot answer.
export function gitDate(repoRelativePath) {
  try {
    return execFileSync('git', ['log', '-1', '--format=%cI', '--', repoRelativePath], {
      cwd: REPO_ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore']
    }).trim()
  } catch {
    return ''
  }
}

export function readDates() {
  try {
    return JSON.parse(readFileSync(DATES_FILE, 'utf8'))
  } catch {
    return {}
  }
}

function main() {
  const existing = readDates()
  const dates = {}
  let fromGit = 0

  for (const file of guidelineFiles()) {
    const id = file.split('/').pop().replace(/\.md$/, '').toUpperCase()
    const committed = gitDate(file)
    if (committed) fromGit++
    dates[id] =
      committed || existing[id] || statSync(join(REPO_ROOT, file)).mtime.toISOString()
  }

  writeFileSync(DATES_FILE, `${JSON.stringify(dates, null, 2)}\n`)
  console.log(`✔ ${Object.keys(dates).length} dates written (${fromGit} from git).`)
}

if (import.meta.url === `file://${process.argv[1]}`) main()
