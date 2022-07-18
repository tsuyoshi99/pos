# Medical POS

This project is created as MonoRepository for Medical POS.

## Getting Started

Run `yarn install` to install all dependencies.

## Frontend Repo

To start the development server:

```
yarn workpace ui dev
```

## API Repo

Create .env file and paste this in:

```
ENV="development"
PORT=7070
JWT_SECRET=1NyMkstsubPyWOotDaIaIZ5ZmAu7zM3k
POSTGRES_URL=postgres://rest:rest123@localhost:5432/rest
SALT=10
```


Run API in Local Environment: 

```
yarn workspace api dev
```

For API Documentation:

```
yarn workspace api docs
```

## Committing Changes to Remote Repository

Staging All Changes:

```
git add .
```

Commit Message:

```
yarn commit
```

Push to Remote:

```
git push origin [branch]
```
