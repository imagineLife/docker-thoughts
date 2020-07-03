
KERNEL FEAT 1: CHROOT
this is about un=sharing file-system content
... linux jails, jailing a process to a particular part of the OS

do all of this INSIDE A DOCKER CONTAINER!
even though this portion is ABOUT the make-up of containers, this step is to USE a UNIX-based OS, not the mac linux-based os

setup a docker container to use...
```
docker run -it --name docker-host --rm --privileged ubuntuLbionic
```

- sets root directory of a new process
- in containers, the root of the new container-root should be 
- PURPOSE FOR CONTAINERS
    - restrict hardware-file-access between containers
    - new process (container) can not see outside of its chroot-ed root dir

MACintosh is not a linux-based kernel, its a unix based kernel

the above docker container command should return something like...
Unable to find image 'ubuntu:bionic' locally
bionic: Pulling from library/ubuntu
423ae2b273f4: Pull complete 
de83a2304fa1: Pull complete 
f9a83bce3af0: Pull complete 
b6b53be908de: Pull complete 
Digest: sha256:04d48df82c938587820d7b6006f5071dbbffceb7ca01d2814f81857c631d44df
Status: Downloaded newer image for ubuntu:bionic

- creates a ubuntu ‘container’
- drops us inside that container
run in any terminal/emulator (zsh && bash work) 

now I’m @ the root of the new container
check which linux env im in 

```cat /etc/issue```
- prints ```ubuntu 18.04.3```, which linux env we are in!

this can also be done in powershell, windows terminal
 
**see entire system**
```ls```
...should return something like...
```
bin   dev  home  lib64  mnt  proc  run   srv  tmp  var
boot  etc  lib   media  opt  root  sbin  sys  usr
```



**MAKING A NEW ROOT**
make a new folder to put my container in
```mkdir my-new-root```
```cd my-new-root```

CANT just run ```chroot . bash```
…terminal wi’ll run… ’…what is bash”
there is not bash in there

need to copy OS inside the new dir, my-new-root

**make a bin folder**
```mkdir my-new-root/bin```

**copy the existing bin into my-new-root**
```cp bin/bash my-new-root/bin```

show the new bin folder,
```ls my-new-root/bin```
...should show... bash

STILL can’t run bash
need libraries that the processes && commands need to run

- show needed dependencies of bash
```ldd bin/bash```
...should return something like...

	```linux-vdso.so.1 (0x00007fff5f5e1000)
	libtinfo.so.5 => /lib/x86_64-linux-gnu/libtinfo.so.5 (0x00007f1b0eb75000)
	libdl.so.2 => /lib/x86_64-linux-gnu/libdl.so.2 (0x00007f1b0e971000)
	libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f1b0e580000)
	/lib64/ld-linux-x86-64.so.2 (0x00007f1b0f0b9000)```

we need this stuff.

- make 2 more directories, lib && lib64
```mkdir my-new-root/lib{,64}```

- show all files in my-new-root
cd into my-new-root
ls the dir
	… should show 
	bin lib lib64

notice the ldd paths listed in the ldd command
the dependencies that have paths need to be copied into my-new-proj

- copy dependencies from ldd to new-proj
1. cp
    1. highlight && paste the 3 paths from libtinfo.so, libdl.so, && libc.so
    2. PASTE after cp
2. ```cp /path/1 /path/2 /path/3 my-new-root/lib```
... copy command should be...
```cp /lib/x86_64-linux-gnu/libtinfo.so.5 /lib/x86_64-linux-gnu/libdl.so.2 /lib/x86_64-linux-gnu/libc.so.6 /lib64/ld-linux-x86-64.so.2 my-new-root/lib```


Check that dependencies have been copied
```cd my-new-root```
```ls lib```
	… should show 3 things, the libc, libel && libtinfo

- copy && prepare lib64 file with file from ldd output
```cp /lib64/ld-linux-x86-64.so.2 lib64/```

**NOW can go into new env**
- Enter new env && open bash terminal
```chroot my-new-root/ bash```

- see what dir im im
pwd 
...shows /...
bash thinks i’m in the root of the system! 
this is part of the container goal

- see what files are in my env
ls
notice no files!

- get out of chroot
exit


- prepare environment 
… copy files like we just did into my-new-root/lib


COPY the ls command from parent 'container' to 'my-new-container'
cp /bin/ls my-new-root/bin

Check the dependencies needed to run the ls command
ldd /bin/ls

copy these dependencies from parent to child, like previous command being copied

ABOVE OVERVIEW OF USING CHROTT && COPYING OS COMMANDS
- COMMANDS have dependencies,
- ... dependencies can be discovered by typing 
``` ldd/{command-name-here}``` 
- ... ( we did this for the bash command && the ls command)
- COMMAND DEPENDENCIES have been copied to my-new-root
- now my-new-root can use the bash && ls commands




Get the ‘cat’ command into our new env
- copy from bin/cat into bin
cp /bin/cat bin

- copy from bin/cat into bin
cp /bin/cat bin


