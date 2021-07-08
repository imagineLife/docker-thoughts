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

#### DB Admin role
```bash
use admin
db.createUser({ user: 'db_admin', pwd: 'DbAdmin123!', roles: [{ db: 'demodb', role: 'dbAdmin' }] })
```
NOTE:
- users should be created on the admin db
- users FOR OTHER dbs should be created while the shell is in admin db

#### Give a single user multiple roles
For the user above, db_admin, below will give them a different role on a different db
```bash
db.grantRolesToUser('db_admin', [{ db: 'playground', role: 'dbOwner'  }])
```
then, to view this users' new role in combination with their old role, use  
```bash  
db.getUsers()
```
should return something like...
```bash
[
	{
		"_id" : "admin.db_admin",
		"userId" : UUID("4427b4b2-e51f-4d5c-82ba-d8ded9f717ca"),
		"user" : "db_admin",
		"db" : "admin",
		"roles" : [
			{
				"role" : "dbOwner",
				"db" : "playground"
			},
			{
				"role" : "dbAdmin",
				"db" : "demodb"
			}
		],
		"mechanisms" : [
			"SCRAM-SHA-1",
			"SCRAM-SHA-256"
		]
	}
]
```

#### Connect as a user
```bash 
mongo --username db_admin --password --authenticationDatabase admin 
```


db.createUser({user:"m103-application-user",pwd:"m103-application-pass", roles:[{db:"applicationData", role:'readWrite'}]})