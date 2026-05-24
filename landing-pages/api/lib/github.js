import { Octokit } from '@octokit/rest';

const token = process.env.GITHUB_TOKEN;
const owner = process.env.GITHUB_OWNER || 'simplesolutions05055-blip';
const repo  = process.env.GITHUB_REPO  || 'simple-solution-Pages';
const branch = process.env.GITHUB_BRANCH || 'main';

if (!token) {
  console.warn('[github] Missing GITHUB_TOKEN env var');
}

export const octokit = new Octokit({ auth: token });

/**
 * Create or update a file in the repo via the Contents API.
 * Returns the commit SHA on success.
 */
export async function commitFile({ path, content, message }) {
  // 1. Check if file exists (to grab its sha for update)
  let existingSha;
  try {
    const { data } = await octokit.repos.getContent({ owner, repo, path, ref: branch });
    if (!Array.isArray(data)) existingSha = data.sha;
  } catch (e) {
    if (e.status !== 404) throw e;
  }

  const { data } = await octokit.repos.createOrUpdateFileContents({
    owner, repo, path,
    message,
    content: Buffer.from(content, 'utf8').toString('base64'),
    branch,
    sha: existingSha,
  });
  return data.commit.sha;
}

/** Read a file from the repo (returns utf-8 string). */
export async function readFile(path) {
  const { data } = await octokit.repos.getContent({ owner, repo, path, ref: branch });
  if (Array.isArray(data)) throw new Error('Path is a directory: ' + path);
  return Buffer.from(data.content, 'base64').toString('utf8');
}
