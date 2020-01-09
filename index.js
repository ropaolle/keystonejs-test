require('dotenv').config();
const { Keystone } = require('@keystonejs/keystone');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const { Text, Checkbox, Password } = require('@keystonejs/fields');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
// const { StaticApp } = require('@keystonejs/app-static');
const { NextApp } = require('@keystonejs/app-next');
const initialiseData = require('./initial-data');

const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);

console.log('√ MongoDB:', process.env.MONGO_URI);

const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');

const keystone = new Keystone({
  name: 'Keystone JS Test',
  adapter: new Adapter({ mongoUri: process.env.MONGO_URI }),
  onConnect: initialiseData,
  sessionStore: new MongoStore({ url: process.env.MONGO_URI })
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
    new NextApp({ dir: 'nextjs-site' })
    // new StaticApp({
    //   path: '/',
    //   src: 'cra-site',
    //   fallback: 'index.html',
    // }),
  ]
};
