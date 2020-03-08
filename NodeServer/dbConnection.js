const mysql = require('mysql');

const createTableQuery = `create table If NOT EXISTS Users (
    sno int NOT NULL auto_increment primary key,
    name varchar(255),
    email varchar(255),
    role_type ENUM('Admin','Customer Executive'),
    status ENUM('Active','Inactive','Pending'),
    mobile_number varchar(255)
);`;

const insertUser = `INSERT INTO USERS (name, email, role_type, status, mobile_number) 
VALUES ('locusnine', 'locusnine@locusnine.com','Admin', 'Pending', '9876543210') 
ON DUPLICATE KEY UPDATE sno = 1, name = 'locusnine', email = 'locusnine@locusnine.com', role_type = 'Admin', status = 'Pending', mobile_number = '9876543210';`

var connectionObject = {
     con : mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "locusnineDB"
    }),
    createTable: () => {
        connectionObject.con.query(createTableQuery, function (error, res) {
            if (error) throw error;
            console.log("Table created");
        });

        connectionObject.con.query(insertUser, function (error, res) {
            if (error) throw error;
            console.log("Initial data inserted");
        });
    }
}

module.exports = connectionObject;





