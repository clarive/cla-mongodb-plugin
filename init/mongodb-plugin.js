var ci = require("cla/ci");

ci.createClass("MongoDB", {
    form: '/plugin/cla-mongodb-plugin/form/mongodb-server.js',
    icon: '/plugin/cla-mongodb-plugin/icon/mongodb.svg',
    has: {
        server: {
            is: "rw",
            isa: "ArrayRef",
            required: true
        },
        port: {
            is: "rw",
            isa: "Int",
            default: 27017,
            required: true
        },
        dbName: {
            is: "rw",
            isa: "Str",
            required: false
        },
        userName: {
            is: "rw",
            isa: "Str",
            required: false
        },
        pwd: {
            is: "rw",
            isa: "Str",
            required: false
        }
    },
    methods: {
        ping: function() {
            return 1;
        }
    },
    roles: ['DatabaseConnection']
});