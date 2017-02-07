**DISCLAIMER: This repository is an experimental and not ready for project use.**

# generator-18F-static

This is an experimental [Yeoman] generator that gets you up and running with [Jekyll] and the [U.S. Web Design Standards](https://standards.usa.gov).

## Installing the generator

1. First, ensure that you have [Node.js](https://nodejs.org/en/) installed.

1. Install the [Yeoman] command line tool with [npm](https://www.npmjs.com/) in the terminal:

  ```sh
  npm install -g yo
  ```

1. Download or clone this repository, `cd` into it, then link it with [npm link]:

  ```sh
  git clone git@github.com:18F/generator-18F-static.git
  cd generator-18F-static
  npm link
  ```

## Running the generator

First, create a directory for your project, and `cd` into it in the terminal:

```sh
mkdir my-project
cd my-project
```

Now you can run the generator with:

```bash
yo 18F-static
```

This will prompt you for short answers to a series of questions about how you'd like your project set up. Once you've answered all of the questions (and unless an error occurs), you should end up with a project "scaffolding" that you can run locally with:

```sh
npm start
```

This will start a [Jekyll] server at [http://localhost:4000](http://localhost:4000).

[Yeoman]: http://yeoman.io/
[npm link]: https://docs.npmjs.com/cli/link
[Jekyll]: https://jekyllrb.com/
