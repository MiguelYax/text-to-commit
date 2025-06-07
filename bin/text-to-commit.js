#!/usr/bin/env node

const { prompt } = require('yax-cli');
const { getCommitSchedule } = require('../lib/converter');
const { addCommit } = require('../lib/gits');

const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const main = async () => {
    const values = await prompt(
        [
            {
                type: 'input',
                name: 'startDate',
                question: 'Provide a Sunday start date (Format: YYYY-MM-DD):',
                validate: (input) => datePattern.test(input)
            },
            {
                type: 'input',
                name: 'text',
                question: 'Text to convert to commit history  (10 chars max):',
                validate: (input) => {
                    return input.trim() !== '' && input.length <= 10;
                }
            }
        ],
    )

    const schedule = getCommitSchedule(values.text, values.startDate);
    const { generate } = await prompt(
        [
            {
                type: 'confirm',
                name: 'generate',
                question: 'Do you want to generate the commit history?',
                default: true
            }
        ]
    );
    if (generate) {
        for (const entry of schedule) {
            addCommit(entry);
        }
    }

    console.log('Commit history generated successfully.');
    console.log('You can now push your changes to the remote repository.');
    console.log('Use "git push" to upload your commits.');
    console.log('Thank you for using the text-to-commit tool!');
}

main();
