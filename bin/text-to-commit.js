#!/usr/bin/env node

const { prompt } = require('yax-cli');
const { getCommitSchedule } = require('../lib/converter');
const { addCommit } = require('../lib/gits');

const main = async () => {
    const values = await prompt(
        [
            {
                type: 'input',
                name: 'startDate',
                question: 'Enter the start date for the commit history (YYYY-MM-DD):',
                validate: (input) => {
                    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
                    return datePattern.test(input);
                }
            },
            {
                type: 'input',
                name: 'text',
                question: 'Text to convert to commit history  (8 chars max):',
                validate: (input) => {
                    return input.trim() !== '' && input.length <= 8;
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
            if (entry.commit) {
                addCommit(entry);
            }
        }
    }
}

main();
