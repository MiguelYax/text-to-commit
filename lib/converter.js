const characters = require('./typography');

const resolvePosition = (char, matrix, currentDate, schedule) => {
    const r = matrix.length;
    const c = matrix[0].length;
    console.log('row', r, 'col', char);
    for (let x = 0; x < c; x++) {
        for (let y = 0; y < r; y++) {
            const v = matrix[y][x];
            const date = currentDate.toISOString().split('T')[0];
            console.log('x', x, 'y', y, 'value', v, 'date', date);
            if (v) {
                schedule.push({
                    date,
                    char,
                    x,
                    y,
                    commit: true,
                })
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
    }
};

const getCommitSchedule = (text, startDate) => {

    let currentDate = new Date(startDate);
    const schedule = [];

    text
        .toLowerCase()
        .split('')
        .map((c) => (c === ' ') ? c : `${c} `)
        .join('')
        .split('')
        .forEach((char) => {
            console.log('schedule for:', char);
            if (characters[char]) {
                resolvePosition(char, characters[char], currentDate, schedule);
            } else {
                throw new Error(`Character "${char}" not found in typography.`);
            }
        })

    console.log('schedule', schedule);
    return schedule;
};

module.exports = {
    getCommitSchedule,
};
