module.exports =
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 456:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const core = __webpack_require__(105);
const github = __webpack_require__(82);
const opsGenieOperations = __webpack_require__(385);

try 
{
    const context = github.context;
    // const api_key = core.getInput('api-key');
    // const url = core.getInput('opsgenie-api-url');
    const github_token = core.getInput('github-token');
    
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

/***/ }),

/***/ 385:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var opsGenie = __webpack_require__(551);

function createAlert(issuePayload, url, apiKey) {
    opsGenie.configure({
        'api_key': apiKey,
        'host': url
    });

    var create_alert_json = getJson(issuePayload.issue);

    opsGenie.alertV2.create(create_alert_json, function (error, alert) {
        if (error) {
            console.error(error);
        } else {
            console.log(alert);
        }
    });
}

function getJson(issue) {

    console.log(JSON.stringify(issue));

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

/***/ }),

/***/ 105:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 82:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ }),

/***/ 551:
/***/ ((module) => {

module.exports = eval("require")("opsgenie-sdk");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	__webpack_require__.ab = __dirname + "/";/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(456);
/******/ })()
;