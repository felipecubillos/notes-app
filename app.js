const yargs = require('yargs');
const chalk = require('chalk');
const notes = require('./notes.js');

yargs.version("1.3");

// add notes
yargs
    .command(
        'add <title> <body>',
        'adding a note',
        (yargs) => {
            yargs.positional('title', {
                describe: 'You should provide a note title',
                type: 'string'
            }),
            yargs.positional('body',
            {describe: 'you should provide a note content',
             type: 'string'    
        })
        },
         (yargs) => {
            console.log('Note added : ' + yargs.title);
            console.log(' the body of the note is : '+ yargs.body);
            notes.addNotes(yargs.title,yargs.body);
        }
    );

// remove notes
yargs
    .command(
        'remove <title>',
        'remove a note ',
         (yargs) => {
            yargs.positional(
                'title',
                {
                    describe: 'provide a name for a note to remove',
                    type: 'string'
                }
            )
        },
         (yargs) => {
            notes.removeNote(yargs.title);
            //console.log(' note deleted: ' + yargs.title)
        }
    );

// read notes
yargs
    .command(
        'read <title>',
        'read a note ',
        (yargs) => {
            yargs.positional(
                'title',
                {
                    describe: 'Title note to read',
                    type: 'string'
                }
            )
        },
         (yargs) => {
            //console.log(' title readed : ' + yargs.title)
           notes.readNote(yargs.title);
        }
    );

// list notes
yargs
    .command(
        'list',
        'list a note ',
        
         (yargs) =>{
          //  console.log(' note listed: ' + yargs.title)
          notes.listNotes();
        }
    );
yargs.parse();
//console.log(yargs.argv);