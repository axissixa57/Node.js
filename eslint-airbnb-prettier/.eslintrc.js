module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "airbnb",
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        // fix error: Expected linebreaks to be 'LF' but found 'CRLF'
        "linebreak-style": ["error", "windows"]
    }
};