# Market Junction

Frontend for group design practical

## Developing

### Docker

The easiest way to setup a development environment is using
[docker](https://www.docker.com/).

First, build an image of the base: `docker build .` (~ 5 mins)

Take note of the `IMAGEID` in the last line; it will be different almost
every time the image is built, and looks something like:

```
...
Removing intermediate container 242cfe02b328
Successfully built 43d25183ce2e <- IMAGEID
```

Then, the current directory can be volume mounted into the container, which
runs a typescript compiler and a `nginx` instance in the background; invoke the
container as follows:

`docker run -p 80:80 -v "$PWD":/opt/market-junction --name market-junction -d IMAGEID`

The frontend can now be observed at [`localhost`](http://localhost).

Note that any changes to `.ts` files are reflected upon page refresh.

#### Windows instructions

* Install [Docker Toolbox](https://download.docker.com/win/stable/DockerToolbox.exe)
* Launch Docker Quickstart Terminal
* `cd` to directory containing cloned code
* Proceed as above
* Available at output of `docker-machine ip default` instead of `localhost`
