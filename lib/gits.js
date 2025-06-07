const { appendFileSync } = require('fs');
const { execSync } = require('child_process');

const addCommit = ({ char, date, x, y}) => {
    const message = `${date} - Add commit for character: ${char} - [${x},${y}]`;
    
    appendFileSync(`${char}.md`, `${message}\n`);
    execSync(`git add ${char}.md`);
    execSync(`git commit -m "${commitMessage}" --date="${date}"`);
}

module.exports = {
    addCommit,
};

