const path = require('path');

exports.createDirTemplate = function (dir, requestedUrl) {
    return `
        <div>
            <h4>Directory ${requestedUrl}</h4>
            <ul>
                ${dir.map(file => {
                    const filePath = path.join(requestedUrl, file); // f:\IT\NodeJS\RSschool\nodejs-lecture\node-js-networking\2-http\static-server\static\event-loop.png
                    const fileUrl = path.relative(__dirname, filePath); // содержится последяя часть пути: event-loop.png
                    return `
                        <li>
                            <a href="${fileUrl}">${file}</a>
                        </li>
                    `
                })}
            </ul>
        </div>
    `
}