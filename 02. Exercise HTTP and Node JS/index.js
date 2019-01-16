const storage = require('./storage');

storage.put('First', 'FirstPlayer');
storage.put('Second', 'SecondPlayer');
storage.update('First', 'FirstModified');
storage.save();

console.log(storage.load());