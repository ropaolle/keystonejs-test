const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { Text, Checkbox, Password } = require('@keystonejs/fields');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
// const { StaticApp } = require('@keystonejs/app-static');
const { NextApp } = require('@keystonejs/app-next');
const initialiseData = require('./initial-data');

const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');
const PROJECT_NAME = 'Keystone JS Test';

const keystone = new Keystone({
  name: PROJECT_NAME,
  // adapter: new Adapter({ mongoUri: 'mongodb://olle:9dksert9we9@localhost:27017/keystonejs' }),
  adapter: new Adapter({ mongoUri: 'mongodb://localhost:27017/keystonejs' }),
  onConnect: initialiseData
});

// Access control functions
const userIsAdmin = ({ authentication: { item: user } }) => Boolean(user && user.isAdmin);
const userOwnsItem = ({ authentication: { item: user } }) => {
  if (!user) {
    return false;
  }
  return { id: user.id };
};
const userIsAdminOrOwner = auth => {
  const isAdmin = access.userIsAdmin(auth);
  const isOwner = access.userOwnsItem(auth);
  return isAdmin ? isAdmin : isOwner;
};
const access = { userIsAdmin, userOwnsItem, userIsAdminOrOwner };

keystone.createList('User', {
  fields: {
    name: { type: Text },
    email: {
      type: Text,
      isUnique: true
    },
    isAdmin: { type: Checkbox },
    password: {
      type: Password
    }
  },
  access: {
    read: access.userIsAdminOrOwner,
    update: access.userIsAdminOrOwner,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth: true
  }
});

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User'
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      // requiered to allow NextApp/StaticApp
      enableDefaultRoute: false,
      authStrategy
    }),
    new NextApp({ dir: 'nextjs-site' }),
    // new StaticApp({
    //   path: '/',
    //   src: 'cra-site',
    //   fallback: 'index.html',
    // }),
  ]
};
