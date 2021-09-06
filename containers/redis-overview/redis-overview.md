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