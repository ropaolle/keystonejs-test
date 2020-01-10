# keystonejs-test

master: admin@example.com/e5400f810f8f

## Eslint

```bash
# KeystoneJS
npx eslint --init
npm i -D eslint-config-prettier eslint-plugin-prettier prettier
#extends: ["standard", "prettier", "plugin:prettier/recommended"],

```

## Debian/Ubuntu

```bash
sudo apt-get update

## Curl, git
sudo apt install curl git

## Node.js
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs

## Run `sudo apt-get install -y nodejs` to install Node.js 12.x and npm
## You may also need development tools to build native addons:
sudo apt-get install gcc g++ make

## To install the Yarn package manager, run:
curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn
```

## Symlincs

[info](https://www.howtogeek.com/howto/16226/complete-guide-to-symbolic-links-symlinks-on-windows-or-linux/)

```bat
REM mklink /J Link Target
mklink /J "C:\SAVE\GitHub\_KEYSTONE\keystonejs-test\app" "C:\SAVE\GitHub\_KEYSTONE\nextjs-test"
```
