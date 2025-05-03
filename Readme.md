MOngodb attles-> online cloud cluster used
String,Integer,Double,Boolean,Null,Array,Objects
skill:[c++,c,java]
book:{name:'deep',
    author:'xyz',
    paper:775
}
_id- 12 bytes 4bytes-timestamp -date and time of creating record 
2bytes -> couter 
every id be unique id

undefined is as good as null 
date also type
binary data - non text based value (0,1)
find command is used to retrieve data
db.employee.find()
db.employee.find.pretty()


var cur=db.employee.find().pretty()
while(cur.hasNext())
{
    print(tojson(cur.next()))
}

cur.forEach(printJson)
var arry1=cur.toArray()
var rec=arry1[0];
cur.count()
db.employee.find.count()
db.students.find().count()
.size(n)
.skip(n)
//db.tablename.find() for searching full collection
//use dbname() for using the database
.sort({filedname:1/-1,fieldname2:1,-1})
db.students.find().skip(2)
db.students.find().limit(4)
db.students.find().count()
7
db.students.find().size(4)
db.students.find()
use config
To insert a single document, use the insertOne() method.
To insert multiple documents at once, use the insertMany() method.
//bulk insertiin -> bulk.insert

//bulk insertion
var bulk=db.employee.initialize unorderedBulkOp()
bulk.insert({empid:101,ename:'gst'.. . . . .})
you have to write bulk as many as you want to insert records
bulk.execute()

//FIND AND MODIFY

db.employee.findAndModify(
   { query:{empid:123}
   },
   {
    update:{$set:{city:"chandigarh",mobile:6283142732}}
   }

)


//COPY
db.employee.copyTo("collection name") //copy to the given collection

//distinct
for finding unique value
db.employee.distinct("city) [city1,city2,city3]

index creation
db.employee.createIndex({employeename:1/-1,city:1/-1})
we can create multiple index for multiply fileds in a time
db.employee.getIndexes() - will give the fields on which ,indexes created
delete index-> db.epmoyee.dropindex('indexname/feildname')

/AGGREGATE pipelines
1st output can be used in 2nd state and 2nd output is used in further state...

example
//posts  post having more likes two stages
db.posts.aggregrate([{
    $match:{likes:{$gt:1}
    },
    {
        $group:{_id:"$category",totalLikes:{$sum: "$likes"}
    }
}
}])
category-> filed

for storing the data in collection: of above aggregation
db.posts.aggregrate([{
    $match:{likes:{$gt:1}
    },
    {
        $group:{_id:"$category",totalLikes:{$sum: "$likes"}
    }
},
{
    $out:"gikescount
}
}])


//limit COMMAND for aggregation
//db.movies.aggregate
db.movies.aggregate([{$limit: n}]) n-> no. of records


//PROJECTION $project
db.restaurent.aggregrate({$project:{
$sort:{"name":1} }
{"name":1,
"address":1,
"cursine":1}},{
    limit:5
})