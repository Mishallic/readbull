print('Start #################################################################');

db = db.getSiblingDB('prod');
db.createUser(
    {
        user: 'root',
        pwd: 'root123',
        roles: [{ role: 'readWrite', db: 'prod' }],
    },
);
db.createCollection('users');

db = db.getSiblingDB('dev');
db.createUser(
    {
        user: 'root',
        pwd: 'root123',
        roles: [{ role: 'readWrite', db: 'dev' }],
    },
);
db.createCollection('users');

db = db.getSiblingDB('tst');
db.createUser(
    {
        user: 'root',
        pwd: 'root123',
        roles: [{ role: 'readWrite', db: 'tst' }],
    },
);
db.createCollection('users');

print('END #################################################################');