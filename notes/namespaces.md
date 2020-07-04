
KERNEL FEAT 2: NAMESPACES
this is about un-sharing process capabilities, controlling the flow of capabilities in-between processes

problem with chroot alone.
chroot is concerned with isolating file-system 'roots'
BUT IF 2 chrooted envs are next to one-another, they can see each others processes

- list processes
``ps``

companyA process can KILL companyB processes

Introducing name-spaces to restrict capabilities

using UNSHARE command

RUN THESE COMMANDS, get a new env up && running
in the parent container
# updates available packages I can use
```apt-get update```

# a tool
## https://wiki.debian.org/Debootstrap
```apt-get install debootstrap -y```

debootstrap setsup a totally new change-rootable environment...
```debootstrap --variant=minbase bionic /better-root```

- minbase tells to download least amt of stuff necessary
- bionic is kind of ubuntu
- /better-root is new root name
... gets the bare minimunm stuff (filesystem stuff) needed to run a debian-based ubuntu
... should end terminal output with ```Base system installed successfully```

SEE the new bin tools in this dir
ENTER these commands
```cd better-root```
```chroot . bash```
```ls bin```

...here will show many bin tools i can use in this debootstrapped env!





**UNSHARE HERE!!**
exit out of the better-root
```exit```

enter this command
```unshare --mount --uts --ipc --net --pid --fork --user --map-root-user chroot /better-root bash```

Whats it do-ish?!
- tell everything that I want to 'un'-share between this env & others
- RUNS chroot in /better-root then runsh bash inside the dir after chrooting into it

MORE CODE
```moount -t proc none /proc```
```mount -t sysfs none /sys```
```mount -t tmpfs none /tmp```

What's it do-ish?
https://ss64.com/bash/mount.html
- "...attaches file-system found on some device TO the big file tree..."
-t indicates the file-system type


NOW running this...
```ps aux```
...which shows list of processes that this env can see, IT cannot see any processes outside of itself :) Good news! It should return something like...
```USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.1  18508  3424 ?        S    11:17   0:00 bash
root         9  0.0  0.1  34400  2844 ?        R+   11:18   0:00
``` 
ps aux

ONE WAY TO PROVE THIS, that the child cannot see the parent processes....
1. open new terminal window
2. run docker container ls in this
3. get container name (here, docker-host)
4. get into the container with bash, using....
```docker exec -it docker-host /bin/bash```
5. see ALL processes in the parent container using...
```ps aux```
...
should return something like
```USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.1  18508  3484 pts/0    Ss   10:26   0:00 /bin/bash
root      7430  0.0  0.0   4520   724 pts/0    S    11:21   0:00 unshare --mount --uts --ipc --net --pid --fork --user --map-root-user chroot /bet
root      7431  0.0  0.1  18508  3472 pts/0    S+   11:21   0:00 bash
root      7441  0.6  0.1  18508  3452 pts/1    Ss   11:22   0:00 /bin/bash
root      7451  0.0  0.1  34404  2896 pts/1    R+   11:22   0:00 
```

Host can control children
- see processes
```ps aux```
notice more processes than the child 'knows' about!

```kill 8675``` will kill the 'child' process on 8675

Child CANNOT see outside itself after using this namespace unsharing.