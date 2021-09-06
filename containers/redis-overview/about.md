# Redis through Docker
To  run the default redis image / container
```bash
# expose the default redis container port to the matching port on the host
docker run --name rdb -p 6379:6379 redis
```
Spins up redis through docker

## enter container and open redis cli
in a new terminal window
```bash
docker exec -it rdb redis-cli
```
