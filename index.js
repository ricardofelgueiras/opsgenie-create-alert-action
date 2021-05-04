const core = require('@actions/core');
const github = require('@actions/github');
const opsGenieOperations = require('./opsGenie');

try 
{
    const api_key = core.getInput('api-key');
    const url = core.getInput('opsgenie-api-url');

    const octokit = github.getOctokit(api_key);
    const context = github.context;

    const issue = (async () => {
                    return await octokit.issues.get({
                        ...context.repo,
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