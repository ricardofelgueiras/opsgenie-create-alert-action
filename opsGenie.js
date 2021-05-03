var opsGenie = require('opsgenie-sdk');

function createAlert(issuePayload, url, apiKey) {
    opsGenie.configure({
        'api_key': apiKey,
        'host': url
    });

    var create_alert_json = getJson(issuePayload.issue);

    console.log(create_alert_json);

    opsGenie.alertV2.create(create_alert_json, function (error, alert) {
        if (error) {
            console.error(error);
        } else {
            console.log(alert);
        }
    });
}

function getJson(issue) {
    var create_alert_json = {
        "message": issue.title,
        "description": issue.html_url,
        "priority": getPriorityFromLabels(issue.labels)
    };
    return create_alert_json;
}

function getPriorityFromLabels(labels) {
    var labelsWithPriorityNames = [];

    labels.forEach(function(label) {
        if (label.name == "P1" || label.name == "P2" || label.name == "P3") {
            labelsWithPriorityNames.push(label.name);
        }
    });

    if (labelsWithPriorityNames.length > 0) {
        return labelsWithPriorityNames.sort()[0];
    }
    
    // default priority is P5
    return "P5";
}

module.exports = { getPriorityFromLabels, getJson, createAlert }