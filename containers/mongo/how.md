run from cmd line

```docker run --name nosql -d mongo:bionic```

### Use Cases
Practicing creating && working with db users

#### DB User Types & Roles
```bash 
use admin
# switched to db admin
db.createUser({user:"admin_officer",pwd:"AdminSecurity123!", roles:[{db:"admin", role:'userAdmin'}]})

Successfully added user: {
	"user" : "admin_officer",
	"roles" : [
		{
			"db" : "admin",
			"role" : "userAdmin"
		}
	]
}
```