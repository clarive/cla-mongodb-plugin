
# MongoDB Plugin

Plugin for mongodb, allows execution of script against any MongoDB database.

## Installing

To install the plugin place the cla-mongoDB-plugin folder inside `CLARIVE_BASE/plugins`
directory in Clarive's instance.

## How to use

Once the plugin is placed in its folder, you can start using it going to your Clarive's
instance.

After restarting your Clarive's instance, you will have a new CI and a new palette service:

## CI:
### MongoDB:

This CI can be create a MongoDB Instance:

- **Name -** Name you want to set for the instance.
- **Description -** Optional description.
- **Server -** The Generic Server where the MongoDB database daemon will listen for incoming connections.
- **Port -** The port is the network port the Mongo database daemon listens for connections from the server.
- **Database Name -** The name of the database.
- **User Name-** User for the database. You will only fill it if the database has user and password.
- **Password -** User password. You will only fill it if the database has user and password.

Example:


		Name: MongoDB1
		Description: some text
		Server: Generic_Server_forMongo
		Port: 27017
		Database Name: myClariveDB
		User: clarive
		Password: abc123


## Palette Services:
### Run a script in MongoDB database

This palette service will execute a script against any MongoDB database.
Parameters:

- **MongoDB Instance -** The MongoDB Instance you want to use.
- **Script -** The script we want to run.

Example:

		MongoDB Instance: MongoDB1
		Script:      var cursor = db.rule.find({rule_type : "pipeline"});
				     var total = 0;
				     while(cursor.hasNext()) {
				       var obj = cursor.next();
				       total += 1;
				     }
				     print(total);

This service will return the script result.



