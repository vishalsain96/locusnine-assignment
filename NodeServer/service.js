import connectionObject from './dbConnection.js';

export var dataService = {
    getUsers: function (callback) {
        connectionObject.con.query('select * from Users', function (err, recordset) {
            if (err) throw err;
            return callback(err, recordset);
        });
    },
    insertUser : function (body,callback) {
        const insertQuery = `INSERT INTO USERS ( name, email, role_type, status, mobile_number) 
        VALUES ( '`+ body.data.name +`', '`+ body.data.email +`','`+ body.data.role_type +`', '`+ body.data.status +`' , '` + body.data.mobile_number + `') `
        connectionObject.con.query(insertQuery, function (err, recordset) {
            if (err) throw err;
            var response = {
                message : "Data inserted successfully"
            };
            return callback(err, response);
        });
    },
    updateUser: function (body,callback) {
        const updateQuery = `Update USERS 
        Set name = "`+ body.data.name +`",email = "`+ body.data.email +`" , role_type = "`+ body.data.role_type +`", status = "`+ body.data.status +`", mobile_number = "`+ body.data.mobile_number +`"
        where sno = '`+ body.data.sno +`'`;
        console.log(updateQuery);
        connectionObject.con.query(updateQuery, function (err, recordset) {
            console.log("Updating..")
            if (err) throw err;
            var response = {
                message : "Data Updated successfully"
            };
            return callback(err, response);
        });
    },
    deleteUser: function (sno,callback) {
        const deleteQuery = `Delete from Users where sno="`+ sno + `"`;
        connectionObject.con.query(deleteQuery, function (err, recordset) {
            if (err) throw err;
            var response = {
                message : "Data deleted successfully"
            };
            return callback(err, response);
        });
    },
}