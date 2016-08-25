**DISCLAIMER: This repository is an experimental and not ready for project use.**

# generator-18F-static

An experimental Yeoman static site generator using Jekyll and the Draft U.S. Web Design Standards.

## Running locally

First, install [Yeoman](http://yeoman.io) and generator-18F-static using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
```

To reference this generator locally, you will need to link it. Run the following command from the root level of this directory:

```bash
npm link
```

To test locally, make a new directory for your project:

```bash
mkdir my-project
```

Now we will test our generator by running our Yeoman command:

```bash
yo 18F-static
```

And voila! You should now have your project file and folder scaffolding for your project.
