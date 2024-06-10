import { context, getOctokit } from '@actions/github'
import { info, setFailed } from '@actions/core'

async function main() {
  if (!process.env.GITHUB_TOKEN) throw new TypeError('GITHUB_TOKEN not set')

  const octokit = getOctokit(process.env.GITHUB_TOKEN)
  const { owner, repo } = context.repo
  // const query = `repo:${owner}/${repo} is:issue is:open created:2020-01-01..2020-12-31`
  const commentBody = `

Hello everyone,

Here is the [bug report](https://github.com/vercel/next.js/issues/new?assignees=&labels=bug&projects=&template=1.bug_report.yml).

Thank you for your understanding and contributions!

Best regards,
The Next.js Team, @samcx
  `

  // let issues: number[] = []

  try {
    // const { data } = await octokit.rest.search.issuesAndPullRequests({
    //   q: query,
    // })

    // info(`Total # of issues = ${data.items.length}`)

    // data.items.forEach((issue) => {
    //   issues.push(issue.number)
    // })

    await octokit.rest.issues.createComment({
      owner,
      repo,
      issue_number: 66573,
      body: commentBody,
    })
  } catch (error) {
    setFailed(error)
  }
}

main()
