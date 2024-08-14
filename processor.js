const fs = require('fs');
const logFile = 'responses.html';

// init HTML
function initHtmlFile() {
    if (!fs.existsSync(logFile)) {
        const initContent = `
            <html>
            <head>
                <title>Create Action Logs</title>
                <style>
                    table { width: 100%; border-collapse: collapse; }
                    th, td { border: 1px solid black; padding: 8px; }
                    th { background-color: #f2f2f2; }
                    pre { white-space: pre-wrap; word-wrap: break-word; }
                </style>
            </head>
            <body>
                <h1>Create Action Logs</h1>
                <table>
                    <tr>
                        <th>URL</th>
                        <th>Request</th>
                        <th>Response</th>
                        <th>Response Time (ms)</th>
                        <th>Not present in response</th>
                    </tr>
        `;
        fs.writeFileSync(logFile, initContent);
    }
}




function findMissingKeys(obj1, obj2, prefix = '') {

    if (!isObject(obj1) || !isObject(obj2)) {
        return 'Unable to compare';
    }

    let missingKeys = [];
    const keys1 = Object.keys(obj1);

    for (let key of keys1) {
        const fullPath = prefix ? `${prefix}.${key}` : key;
        if (!(key in obj2)) {
            missingKeys.push(fullPath);
        } else {
            const val1 = obj1[key];
            const val2 = obj2[key];
            if (isObject(val1) && isObject(val2)) {
                missingKeys = missingKeys.concat(findMissingKeys(val1, val2, fullPath));
            }
        }
    }
    const stringWithCommas = missingKeys.join(',');
    const htmlOutput = stringWithCommas.replace(/,/g, '<br>');
    return htmlOutput;
}

function isObject(object) {
    return object != null && typeof object === 'object';
}






// table
function appendHtmlEntry(requestParams, response,customMessage = '',requestBody) {
   
    let formattedResponse;
    let formattedRequest;
    try {
        formattedResponse = JSON.stringify(JSON.parse(response.body), null, 4);
        formattedRequest = JSON.stringify(JSON.parse(requestBody), null, 4);
    
    } catch (e) {
        formattedResponse = response.body;
    }
    const responseTime = response.timings.phases.total;

    let objRequest = JSON.parse(formattedRequest);
    let objResponse = JSON.parse(formattedResponse);

    const structuresAreEqual = findMissingKeys(objRequest, objResponse);

    const entryContent = `
                <tr>
                    <td>${customMessage.vars.customMessage}<br>${requestParams.url}<br>Status Code:${response.statusCode}</td>
                    <td><pre>${formattedRequest}</pre></td>
                    <td><pre>${formattedResponse}</pre></td>
                    <td>${responseTime}ms</>
                    <td>${structuresAreEqual}</>
                </tr>
    `;
    fs.appendFileSync(logFile, entryContent);
}

function finalizeHtmlFile() {
    const finalizeContent = `
            </table>
        </body>
        </html>
    `;
    fs.appendFileSync(logFile, finalizeContent);
}

function logRequestBody(requestParams, context, ee, next) {
    context.vars.requestBody = requestParams.body || JSON.stringify(requestParams.json);
    return next();
}

module.exports = {logRequestBody,
    captureResponse: (requestParams, response, context, ee, next) => {
         let requestBody = context.vars.requestBody || 'Empty';
         //println(context.vars)
         //console.log(response);
        appendHtmlEntry(requestParams, response, context,requestBody);
        return next();
    }
};

initHtmlFile();






