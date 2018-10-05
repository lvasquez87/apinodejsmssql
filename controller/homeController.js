module.exports = {
    default: function (req, res) {        
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello World\n');
    },
    user: function (req, res) {
        const sql = require('mssql');
         
        var config = {
            user: 'adminscada',
            password: 'Mersan00',
            server: '10.10.21.25\\SCADA',
            database: 'Recetas',
             
            options: {
                encrypt: false
            }
        }
        
    //Function to connect to database and execute query
    let  executeQuery = function(res, query){ 
        const pool = new sql.ConnectionPool(config, function (err) {
                if (err) {   
                    console.log("Error while connecting database :- " + err);
                    res.send(err);
                }
                else {
                    // create Request object
                    var request = new sql.Request(pool);
                    // query to the database
                    request.query(query, function (err, recordset) {
                    if (err) {
                        console.log("Error while querying database :- " + err);
                        res.send(err);
                    }
                    else {
                        console.log("conectado");
                        //console.log(res);
                        res.end(JSON.stringify(recordset.recordset));
                        //res.send(res);
                        pool.close();
                    }
                    });
                }
                
            }); 
                  
    
             
}

var query = "select * from BatchesEncabezado where orden = "+req.params.orden;
executeQuery (res, query);

        /*var connection = new sql.Connection(config, function (err) {
             
            var request = new sql.Request(connection);
            request.query('select top 10 * from dbo.[BatchesEncabezado]', function (err, recordset) {
                res.end(JSON.stringify(recordset));
            });
 
        });
        app.get("/user", function(req , res){
            var query = "select * from Recetas.BatchesEncabezado";
            executeQuery (res, query);
        });*/
}
}