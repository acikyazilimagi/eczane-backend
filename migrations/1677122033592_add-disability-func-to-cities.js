/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    // Add a column to the table, named isActive default value is true
    pgm.addColumn('cities', {   
        isActive: {
            type: 'boolean',
            notNull: true,
            default: true,      
        },
    })
};

exports.down = pgm => {
    // Remove the column
    pgm.dropColumn('cities', 'isActive');
};
