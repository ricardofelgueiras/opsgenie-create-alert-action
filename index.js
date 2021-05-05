const core = require('@actions/core');
const github = require('@actions/github');
const opsGenieOperations = require('./opsGenie');

try 
{
    const context = github.context;
    const api_key = core.getInput('api-key');
    const url = core.getInput('opsgenie-api-url');
    const github_token = core.getInput('github-token');
    
    // Get issue updated
    const octokit = github.getOctokit(github_token);
    const issue = (async () => {
                    return await octokit.issues.get({
                        repo: context.issue.repo,
                        issue_number: context.issue.number,
                        owner: context.issue.owner
                    })
                })();
    issue.then(value => { 
            console.log(value);
            console.log(JSON.stringify(value));

            // Create OpsGenie alert
            opsGenieOperations.createAlert(value.data, url, api_key);
    });

} catch (error) {
    core.setFailed(error.message);
}