## KERNEL FEAT 3: CGroups
invented @ google
### THE PROBLEM
- running multiple processes
    - (web-servers, **not** on separate vms)
- BUT if google-maps team writes a bad process that clogs the cpu...
	- might kill other google process (google docs etc)

### THE SOLUTION
- NEED to control how much cpu each process gets

HERE, this cGroups doc reviewes ram && cpu. but theres much more...

### RUN THIS inside the ubuntu 'container', the 'better-root' from prev docs...
```apt-get install -y cgroup-tools htop```

### CGroup
https://wiki.archlinux.org/index.php/cgroups

### htop
https://hisham.hm/htop/
give a little cmd gui of what is happening on the cpo...CHECK OUT HTOP
enter ```htop``` into the terminal, its a 'gui' of processes running on the computer :) interesting!


### create a new control-group in the better-root
from within the better-root, run...
```cgcreate -g cpu,memory,blkio,devices,freezer:/sandbox```
- sandbox is the NAME of the cGroup being created

### enter the HOST container
start another terminal
- new terminal
enter the same unshared environment
```unshare --mount --uts --pic --net --pid --fork --user --map-root-user chroot /better-root bash```


### find the bash process of the child container, enter this in terminal 
```ps aux```
...show ALL processes, even child processes
- the 'bash' command, under the COMMAND column, directly below the unshare... command, is the child process we want. Find the Process id under the PID column (7501 or something)


### move a process 'into' a controlGroup
assign all processes inside this un-shared child TO a control-group, entering this command in the PARENT container
```cgclassify -g cpu,memory,blkio,devices,freezer:sandbox 7501```
- 7501 is the pid of the ```bash``` process
- this bash process has NOW been put into the sandbox controlGroup

### SEE that the process is attached to a cgroup 
```cat sys/fs/cgroup/cpu/sandbox/tasks```
should return the PID that was moved previously, ```7501```
NOW, the process is classified under the control-group


### SEE what kind of resources this control-group has access to...
```cat /sys/fs/cgroup/cpu/sandbox/cpu.shares```
... should show 1024...?! shows that this is a low-priority control-group
...if this was a lower number its priority would be higher

### Limit the cGroup CPU
SET the c-group to ONLY use 5% of processing power
```
cgset -r cpu.cfs_period_us=100000 -r cpu.cfs_quota_us=$[ 5000 * $(getconf _NPROCESSORS_ONLN) ] sandbox
```

### SET the c-group max memory allotted to 80Megabytes
```cgset -r memory.limit_in_bytes=80M sandbox```

### SEE allotted memory
```cgget -r memory.stat sandbox```
...should output something like...
```
sandbox:
memory.stat: cache 0
	rss 0
	rss_huge 0
	shmem 0
	mapped_file 0
	dirty 0
	writeback 0
	swap 0
	pgpgin 0
	pgpgout 0
	pgfault 0
	pgmajfault 0
	inactive_anon 0
	active_anon 0
	inactive_file 0
	active_file 0
	unevictable 0
	hierarchical_memory_limit 83886080
	hierarchical_memsw_limit 9223372036854771712
	total_cache 0
	total_rss 0
	total_rss_huge 0
	total_shmem 0
	total_mapped_file 0
	total_dirty 0
	total_writeback 0
	total_swap 0
	total_pgpgin 0
	total_pgpgout 0
	total_pgfault 0
	total_pgmajfault 0
	total_inactive_anon 0
	total_active_anon 0
	total_inactive_file 0
	total_active_file 0
	total_unevictable 0
```
NOTICE the hierarchical_memory_limit is 83....
this is the 80 mb I alotted

### TEST max memory usage of this limited container
CAN TEST MAX MEMORY USAGE by 'screaming into the void' of the limited container

- #### say yes into the void
``` yes > /dev/null```
- open the ```htop```  tool monitoring the process...
- SEE that the memory being used for that process is 12%-ish of the docker container
- #### fill memory until it is full
- run ```yes | tr \\n x | head -c 1048576000 | grep n```
- go back to the ```htop``` tool
- see that the memory being used is not higher



## Created a container
- chroot
- cGroup
- namespace


