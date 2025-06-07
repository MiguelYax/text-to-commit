const { appendFileSync } = require('fs');
const { execSync } = require('child_process');

const addCommit = ({ char, date }) => {
    const message = `${date} - Add commit for character: ${char}`;

    appendFileSync(`${char}.md`, `- ${message}\n`);
    execSync(`git add ${char}.md`);
    execSync(`git commit -m "${message}" --date="${date}"`);
}

module.exports = {
    addCommit,
};

