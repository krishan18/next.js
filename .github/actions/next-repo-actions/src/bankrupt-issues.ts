import { context, getOctokit } from '@actions/github'
import { info, setFailed } from '@actions/core'

async function main() {
  if (!process.env.GITHUB_TOKEN) throw new TypeError('GITHUB_TOKEN not set')

  const octokit = getOctokit(process.env.GITHUB_TOKEN)
  const { owner, repo } = context.repo
  const query = `repo:${owner}/${repo} is:issue is:open created:2020-01-01..2020-12-31`
  // let issue_number: number[] = []

  try {
    info(`Query: ${query}`) // Debugging: print the query
    const { data } = await octokit.rest.search.issuesAndPullRequests({
      q: query,
      per_page: 50,
    })

    info(`Total # of issues = ${data.items.length}`)
    info(`Response data: ${JSON.stringify(data, null, 2)}`)

    // await octokit.rest.issues.createComment({
    //   owner,
    //   repo,
    //   issue_number,
    //   body: 'Hello world!',
    // })
  } catch (error) {
    setFailed(error)
  }
}

main()
