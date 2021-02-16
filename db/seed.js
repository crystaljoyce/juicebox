const { 
    client, 
    getAllUsers,
    createUser,
    updateUser,
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
            password VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL, 
            location VARCHAR(255) NOT NULL, 
            active BOOLEAN DEFAULT true
        );
        `);
        console.log("finshed building tables ... ")
    } catch (error) {
        console.error("error building tables ")
        throw error;
    }
}

async function createInitialUsers() {
    try{
        console.log("starting to create users ... ");
        const albert = await createUser({ username: 'albert', password: 'bertie99', name: 'Al', location: 'Sacramento, CA'});
        const sandra = await createUser({ username: 'sandra', password: 'glamgal', name: 'Sandy', location: 'San Diego, CA'});
        console.log(albert);
        console.log(sandra);
        console.log("finished creating init users");
    } catch(error) {
        console.error(error.message)
        console.log("there is an error with creating init users")
        throw error; 
    }
}

async function rebuildDB(){
    try { 
        client.connect();

        await dropTables();
        await createTables();
        await createInitialUsers();
    } catch (error) {
        console.error(error)
    } 
}

async function testDB(){
    try{
        console.log("starting to test database ... ");
        const users = await getAllUsers();
        console.log("getAllUsers; ",users);
        console.log("finsihed database tests!")
        const updateUserResult = await updateUser(users[0].id, {
            name: "Bethany Smith",
            location: "Frankfurt, Germany"
        }); console.log(updateUserResult);
    } catch (error) {
        console.error("There has been an error in the database test!")
        throw error;
    }
}
rebuildDB()
    .then(testDB)
    .catch(console.error)
    .finally(() => client.end());