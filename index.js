const core = require('@actions/core');
const github = require('@actions/github');
const opsGenieOperations = require('./opsGenie');

try 
{
    const context = github.context;
    // const api_key = core.getInput('api-key');
    // const url = core.getInput('opsgenie-api-url');
    const github_token = core.getInput('github-token');

    console.log(context.issue.repo);
    console.log(context.issue.issue_number);
    console.log(context.issue.owner);
    
    const octokit = github.getOctokit(github_token);
    const issue = (async () => {
                    return await octokit.issues.get({
                        repo: context.repo,
                        issue_number: context.issue_number,
                        owner: context.owner
                    })
                })();

    console.log(issue);
    console.log(JSON.stringify(issue));


    // Create OpsGenie alert
    // opsGenieOperations.createAlert(context.payload, url, api_key);

} catch (error) {
    core.setFailed(error.message);
}