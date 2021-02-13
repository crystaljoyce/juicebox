const { client } = require('./index');


async function testDB() {
    try{
        client.connect();
        const {rows} = await client.query(`SELECT * FROM users;`);
        console.log("result: ",rows);
    } catch (error) {  
        console.error(error.message)
    } finally{
        client.end();
    }
}

testDB(); 