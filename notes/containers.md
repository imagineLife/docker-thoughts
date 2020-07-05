What?!
HISTORY
- used to need a bunch of physical servers…
    - BENEFITS
        - security
        - custom fine-tuning
    - PROBLEMS
        - always need more capacity than you need
        - capacity is limited
        - takes TIME to add servers
        - hardware breaks
- VIRTUAL MACHINES came along...
    - a layer of abstraction between us & the metal
    - multiple guest instances of linux running inside a HOST instance of  linux
    - one hardware, many 'virtual' servers
    - BENEFIT
        - spin up a new vm
    - PROBLEMS
        - example
            - give 2 companies the same server,
            - competing for source machine resources
            - bugs can go cross vm
        - performance
            - 10 VMS in one physical server
                - means REDUNDANT stuff, like OSs
    - CAN….
        - limit resources

PUBLIC CLOUD
- get VMS from hosted services, AWS, GCP
    - BENEFITS
        - move data-center away from in-house, get vms from services...
          - region sensitive
          - pay per usage
          - never have to worry about hardware
        - cheaper than humans
        - front-end engineers can manage servers!
    - PROBLEM
        - still have to manage…
            - software
            - networking
            - updating
            - OS redundancys still exist
    - .. check out Terraform, Chef, Puppet, Salt...

CONTAINERS
- security features like vms, but 'lighter-weight'...
- host OS executing containers
- 3 Kernel Features put together
    - chroot
    - namespaces
    - control-groups (cgroups)

(the KERNEL connects the application software to the hardware of the machine)

NOTE: the bin folder has the binaries that we need


# HUH?!
- allows for system-agnosticism
- each container has its own...
  - os
  - cpu processes
  - memory
  - network resources
- usually run 1 specific task
  - node
  - mysql
- FORM of virtualization...
  - unlike a vm
    - vms have to emulate hardware then boot an os
    - then a translator app, on the host application (called a hypervisor), allows communication from host to vm
  - HERE THOUGH...
    - docker communicates through system kernel
    - can run any version of linux in a container
    - uses less disk space
      - if multiple containers use the same base container, a single copy of the source is saved.. not 3x
- docker-file explains how a docker image will be built...
  - FROM: ubuntu:etc...
  