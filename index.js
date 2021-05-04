const core = require('@actions/core');
const github = require('@actions/github');
const opsGenieOperations = require('./opsGenie');

try 
{
    const api_key = core.getInput('api-key');
    const url = core.getInput('opsgenie-api-url');
    
    core.debug(JSON.stringify(github.context.issue));
    
    // Create OpsGenie alert
    // opsGenieOperations.createAlert(github.context.payload, url, api_key);

} catch (error) {
    core.setFailed(error.message);
}