## Node && Docker
can be applied to other language tools as well (python etc)

```docker run -it node:12-stretch```
- node is the name of the official node container
- 12-stretch is attached to debian stretch
	- running a container...
	- we care about what version of linux it is on
	- what version of node it is on

- automatically opens the node repl (read, evaluate, print, loop)
	- this is the automatic run process from the container
- 

### start the node container, but open a bash gui
```docker run -it node:12-stretch bash```
- now can run things like ```node -v```

- we MIGHT NOT know what version of linux we are using, so the ```cat /etc/issue``` command is helpful in displaying what version of linux is being used


## Why tags matter
- there are MANY versions of the node container...
  - node:alpine
  - node:10.17.0-buster
  - node:12.13.1-buster
tags can be leveraged to pin the version... if an app/container is created, and set on the shelf for a year, the TAGS save the versions of the modules, so that newer breaking versions aren't over-writing the working version 