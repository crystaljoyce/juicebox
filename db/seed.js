const { 
    client, 
    getAllUsers,
} = require('./index');

// async function testDB() {
//     try{
//         client.connect();

//         const users = await getAllUsers();
//         console.log("users: ",users);
//     } catch (error) {  
//         console.error(error.message)
//     } 
// }

// testDB(); 

async function dropTables() {
    try{
        console.log('starting to drop tables ... ')
        await client.query(`
        DROP TABLE IF EXISTS users; 
        `);
        console.log('finsihed dropping tables ... ')
    } catch (error) { 
        console.error("error dropping tables!")
        throw error; 
    }
}

async function createTables() {
    try { 
        console.log("starting to build tables ... ")
        await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        );
        `);
        console.log("finshed building tables ... ")
    } catch (error) {
        console.error("error building tables ")
        throw error;
    }
}

async function rebuildDB(){
    try { 
        client.connect();

        await dropTables();
        await createTables();
    } catch (erorr) {
        console.error(error.message)
    } 
}

async function testDB(){
    try{
        console.log("starting to test database ... ");
        const users = await getAllUsers();
        console.log("getAllUsers; ",users);
        console.log("finsihed database tests!")
    } catch (error) {
        console.error("There has been an error in the database test!")
        throw error;
    }
}
rebuildDB()
    .then(testDB)
    .catch(console.error)
    .finally(() => client.end());