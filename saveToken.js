const fs = require('fs');
const csvFile = 'tokens.csv';


function writeCsvWithToken(token) {
    fs.writeFileSync(csvFile, `${token}\n`);
}

module.exports = {
    captureResponse: (requestParams, response, context, ee, next) => {
        const token = context.vars.token || 'No token captured';
        writeCsvWithToken(token);
        return next();
    }
};
