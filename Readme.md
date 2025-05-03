# MongoDB Practice

This README provides an overview of basic MongoDB concepts, data types, CRUD operations, indexing, aggregation, and shell commands.

## Data Types

* **String**
* **Integer**
* **Double**
* **Boolean**
* **Null**
* **Array**
* **Object**
* **Date**
* **Binary Data** (non-text values)

Examples:
```json
// Simple document
{
  "skill": ["C++", "C", "Java"],
  "book": {
    "name": "Deep",
    "author": "XYZ",
    "pages": 775
  }
}
```

## ObjectId Structure

A MongoDB `_id` field of type ObjectId consists of 12 bytes:

1. **4 bytes**: Timestamp (creation date/time)
2. **3 bytes**: Machine identifier
3. **2 bytes**: Process ID
4. **3 bytes**: Counter

Every ObjectId is globally unique.

## CRUD Operations

### Create

```js
// Single document
db.collection.insertOne({ name: "Alice", age: 30 });

// Multiple documents
db.collection.insertMany([
  { name: "Bob", age: 25 },
  { name: "Carol", age: 28 }
]);
```

### Read

```js
// Find all documents
db.employee.find();

// Pretty-print results
db.employee.find().pretty();

// Iterate with a cursor
var cur = db.employee.find().pretty();
while (cur.hasNext()) {
  print(tojson(cur.next()));
}

// ForEach shorthand
cur.forEach(printjson);

// Convert to array
var array1 = cur.toArray();
var firstRecord = array1[0];

// Count
db.employee.find().count();
```

### Update

```js
db.employee.findAndModify({
  query: { empid: 123 },
  update: { $set: { city: "Chandigarh", mobile: "6283142732" } }
});
```

### Delete

```js
// Single delete
db.employee.deleteOne({ empid: 123 });

// Multiple deletes
db.employee.deleteMany({ city: "Chandigarh" });
```

## Query Modifiers

```js
// Sort: 1 = ascending, -1 = descending
db.students.find().sort({ name: 1, age: -1 });

// Skip and limit
db.students.find().skip(2).limit(4);

// Count
db.students.find().count();

// Size (alias for limit in some drivers)
db.students.find().size(4);
```

## Indexing

```js
// Create index
db.employee.createIndex({ employeename: 1, city: -1 });

// List indexes
db.employee.getIndexes();

// Drop index
db.employee.dropIndex('employeename_1_city_-1');
```

## Aggregation Pipelines

Aggregation stages process data sequentially:

```js
// Example: total likes by category for posts with >1 like
db.posts.aggregate([
  { $match: { likes: { $gt: 1 } } },
  { $group: { _id: "$category", totalLikes: { $sum: "$likes" } } }
]);

// Output to collection
db.posts.aggregate([
  { $match: { likes: { $gt: 1 } } },
  { $group: { _id: "$category", totalLikes: { $sum: "$likes" } } },
  { $out: "likesCount" }
]);

// Limit result count
db.movies.aggregate([{ $limit: 5 }]);

// Projection and sort example
db.restaurant.aggregate([
  { $project: { name: 1, address: 1, cuisine: 1 } },
  { $sort: { name: 1 } },
  { $limit: 5 }
]);
```

## Useful Commands

```js
// Copy collection
db.employee.copyTo("backupCollection");

// Distinct values in a field
db.employee.distinct("city");

// Bulk operations
var bulk = db.employee.initializeUnorderedBulkOp();
bulk.insert({ empid: 101, ename: 'GST' });
// ... add more bulk.insert() calls ...
bulk.execute();
```

---

*End of README.md*
