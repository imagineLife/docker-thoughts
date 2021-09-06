# CLI Commands

## Get and Set
Set & get a key 
```bash
set demoname "Jake"
# returns OK
get demoname
# returns "Jake"
```

Set & get a key WITH an expiration time
```bash
# set w 10s exp date
set willdisappear "Jake" EX 10

# wait 10s
get willdisappear
# returns (nil)
```

Check element exists
```bash
exists demoname
# returns 1

exists watermelon
# returns 0
```

remove a key
```bash
del demoname
# returns 1

exists demoname
# will now return 0
```

add content to keys
```bash
append sauce "tomato"
# returns 6, the LENGTH of the value of the sauce key

append sauce " basil"
# returns 12

get sauce
# returns "tomato basil"
```

## Pub and Sub
```bash
# subscribe to a "channel"
subscribe chatchannel

# publish to channel
publish chatchannel "some custom message"
```
- the listening client runs the `subscribe <channel-name>`
  - when other redis connected clients publish content to the channel, this listening client will show the new published message
- the submitting client
  - submits a message to the channel