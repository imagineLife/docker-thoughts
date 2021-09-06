# CLI Commands
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
