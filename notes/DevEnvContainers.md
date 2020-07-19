## Dev-Environment Containers
Devs can have a long onboarding process for "spinning up a dev environment"

### Example, Hugo
SCENARIO
- join a new dev team
- they use [Hugo](https://gohugo.io), a Go framework for static-site generation
- COULD...
	- spend a bunch of time getting everything setyp
- OR...
	- have a container with all the needed parts ready-to-use inside it

Here, this will use the 'hugo-builder' image

### Process
- clone hugo-example from brian holts example

```
docker run --rm -it --mount type=bind,source="$(pwd)",target=/src -p 1313:1313 -u hugo jguyomard/hugo-builder:0.55 hugo server -w --bind=0.0.0.0
 ``` 