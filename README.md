# MongoDB Plugin

<img src="https://cdn.rawgit.com/clarive/cla-mongodb-plugin/master/public/icon/mongodb.svg" alt="MongoDB Plugin" title="MongoDB Plugin" width="120" height="120">

Plugin for MongoDB, allows execution of script against any MongoDB database.

## What is MongoDB

MongoDB is a document database with the scalability and flexibility that you want with the querying and indexing that you need

## Requirements

To be able to use the plugin correctly, you must have MongoDB installed on the server. We recommend MongoDB 3.2 or higher.

## Installing

To install the plugin place the cla-mongodb-plugin folder inside `$CLARIVE_BASE/plugins` directory in Clarive's instance.

## How to use

Once the plugin is placed in its folder, you can start using it going to your Clarive's instance.

After restarting your Clarive's instance, you will have a new Resource and a new palette service:

**MongoDB Configuration**

In *Clarive SE*: Resources -> ClariveSE.

In *Clarive EE*: Resources -> DatabaseConnection.

- **Name -** Name you want to set for the instance.
- **Description -** Optional description.
- **Server -** The Generic Server where the MongoDB database daemon will listen for incoming connections.
- **Port -** The port is the network port the Mongo database daemon listens for connections from the server.
- **Path -** Binary mongoDB path.
- **Database Name -** The name of the database.
- **User Name-** User for the database. You will only fill it if the database has user and password.
- **Password -** User password. You will only fill it if the database has user and password.

Example:

```yaml
Name: MongoDB Instance
Description: mongo example configuration
Server: MongoDB-1
Port: 27017
Path: /opt/mongodb/bin/mongo
Database Name: clarive
Username: clarive
Password: password
```

### Parameters

The parameters available for this service are:

- **MongoDB Instance (mongodb) -** The MongoDB Instance you configured previously.
- **Script (script) -** The script to be executed.

**Only Clarive EE**

- **Errors and Output** - These two fields deal with managing control errors. The options are:
   - **Fail and Output Error** - Search for the configured error pattern in the script output. If found, an error
     message is displayed in the monitor showing the match.
   - **Warning and Output warning** - Search for configured warning pattern in script output. If found, an error message
     is displayed in the monitor showing the match.
   - **Custom** - If the Errors combo is set to custom, a new form is displayed to define the behavior with the
     following fields:
   - **Ok** - Range of return code values for the script to have succeeded. No message will be displayed in the monitor.
   - **Warn** - Range of return code values to warn the user. A warning will be displayed in the monitor.
   - **Error** - Range of return code values for the script to have failed. An error message will be displayed in the
     monitor.

### In Clarive EE

You can find this service in the Rule Designer palette.

Op Name: **MongoDB**

Example:

```yaml
MongoDB Instance: MongoDB1
Script: var cursor = db.rule.find({rule_type : "pipeline"});
     var total = 0;
     while(cursor.hasNext()) {
       var obj = cursor.next();
       total += 1;
     }
     print(total);
```

### In Clarive SE

#### Rulebook

If you want to use the plugin through the Rulebook, in any `do` block, use this ops as examples to configure the different parameters:

```yaml
rule: MongoDB
do:
    mongodb_script:
       server: 'MongoDB-1' # Required. Use the mid set to the resource you created
       code: |  # Required
            var cursor = db.rule.find({rule_type : "pipeline"});
            var total = 0;
            while(cursor.hasNext()) {
                var obj = cursor.next();
                total += 1;
            }
            print(total);
```

##### Outputs

###### Success

The plugin will return all the console output you executed.

```yaml
rule: MongoDB
do:
    - myvar = mongodb_script:
       server: 'MongoDB-1'  # Required. Use the mid set to the resource you created
       code: |  # Required
            var cursor = db.rule.find({rule_type : "pipeline"});
            var total = 0;
            while(cursor.hasNext()) {
                var obj = cursor.next();
                total += 1;
            }
            print(total);
    - echo: ${myvar}
```

For this command the output will be similar to this one:

```yaml
7
```

###### Possible configuration failures

**Code failed**

```yaml
Error running remote script
```

Make sure that the option is available and you code is correct to be executed in MongoDB.

**Variable required**

```yaml
Error in rulebook (compile): Required argument(s) missing for op "mongodb_script": "server"
```

Make sure you have all required variables defined.

**Not allowed variable**

```yaml
Error in rulebook (compile): Argument `script` not available for op "mongodb_script"
```

Make sure you are using the correct paramaters (make sure you are writing the variable names correctly).

## More questions?

Feel free to join **[Clarive Community](https://community.clarive.com/)** to resolve any of your doubts.