let storage = {};
const fs = require('fs');

module.exports = {
    put: (key, value) => {
        if (typeof key === 'string'){
            if (!storage.hasOwnProperty(key)){
                storage[key] = value;
            }
            else{
                throw new Error('Key exists!');
            }
        }
        else{
            throw new Error("The key should be string!");
        }
    },
    get: (key) => {
        if (typeof key === 'string'){
            if (storage.hasOwnProperty(key)){
                return storage[key];
            }
            else{
                throw new Error('Key exists!');
            }
        }
        else{
            throw new Error("The key must be string!");
        }
    },
    getAll: () => {
        if (Object.keys(storage).length === 0){
            throw new Error('Storage is empty!');
        }
        return storage;
    },
    update: (key, newValue) => {
        if (typeof key === 'string'){
            if (storage.hasOwnProperty(key)){
                storage[key] = newValue;
            }
            else{
                throw new Error('The key does not exists!')
            }
        }
        else{
            throw new Error("The key must be string!");
        }
    },
    delete: (key) => {
        if (typeof key === 'string'){
            if (storage.hasOwnProperty(key)){
               delete storage[key];
            }
            else{
                throw new Error('The key does not exists!')
            }
        }
        else{
            throw new Error("The key must be string!");
        }
    },
    clear: () => {
        storage = {};
    },
    save: () => {
        fs.writeFileSync('./storage.json', JSON.stringify(storage), 'utf8');
    },
    load: () => {
        let data = fs.readFileSync('./storage.json', 'utf8', (err, data) => {
            return data;
        });
        return JSON.parse(data);
    }
}