const {MongoClient}=require('mongodb')
const url ="connectionstring"
const client=new MongoClient(url);
async function myconn()
{
    try{
        await client.connect();
        const db=client.db("databasename")
        const collection=db.collection("students");

        const records=await collection.find() or findOne()
        console.log(records)
    }
    finally{
        await client.close();
    }
}
myconn()