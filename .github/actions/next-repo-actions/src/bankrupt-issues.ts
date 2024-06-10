import { context, getOctokit } from '@actions/github'
import { info, setFailed } from '@actions/core'

async function main() {
  if (!process.env.GITHUB_TOKEN) throw new TypeError('GITHUB_TOKEN not set')

  const octokit = getOctokit(process.env.GITHUB_TOKEN)
  const { owner, repo } = context.repo
  const commentBody = `

Hi everyone!

We are currently in the process of closing older issues to keep our repository clean and focused. If you believe your issue is still relevant, we encourage you to reopen the same issue using the [bug report template](https://github.com/vercel/next.js/issues/new?assignees=&labels=bug&projects=&template=1.bug_report.yml). If there is context in the original issue, please include it in your new issue.

Thank you for your understanding and contributions!

Best regards,
The Next.js Team
  `

  try {
    await octokit.rest.issues.createComment({
      owner,
      repo,
      issue_number: 66573,
      body: commentBody,
    })

    await octokit.rest.issues.addAssignees({
      owner,
      repo,
      issue_number: 66573,
      assignees: ['samcx'],
    })

    info(`Commented on and assigned issue #66573 to @samcx`)
  } catch (error) {
    setFailed(error)
  }
}

main()
