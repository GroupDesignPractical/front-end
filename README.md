# Market Junction

Frontend for group design practical

## Developing

### Docker

The easiest way to setup a development environment is using
[docker](https://www.docker.com/).

We will volume mount the current directory containing the frontend source code
to a container, which runs a typescript compiler and a node server instance in
the background; first, we'll use the container to install our node
dependencies:

`docker run -it -v "$PWD":/opt/market-junction -w /opt/market-junction --rm mhart/alpine-node npm install`

(if using Windows append `--no-bin-links`)

This populates the `node_modules` folder in the current directory.

Now we can start up the application:

`docker run -it -p 80:3000 -v "$PWD":/opt/market-junction -w /opt/market-junction --rm mhart/alpine-node npm start`

(Windows seems to be super bugged and needs a fresh install of some binaries
because it fails to find them: 
`docker run -it -p 80:3000 -v "$PWD":/opt/market-junction -w /opt/market-junction --rm mhart/alpine-node sh -c 'npm install typescript concurrently lite-server -g && npm start'`
)

The frontend can now be observed at [`localhost`](http://localhost).

Note that any changes to `.ts` cause a page refresh and are immediately
reflected..

#### Windows instructions

* Install [Docker Toolbox](https://download.docker.com/win/stable/DockerToolbox.exe)
* Launch Docker Quickstart Terminal
* `cd` to directory containing cloned code
* Proceed as above
* Available at output of `docker-machine ip default` instead of `localhost`
