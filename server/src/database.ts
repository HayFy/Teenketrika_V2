import * as mongodb from "mongodb";
import { off } from "process";
import { Employee } from "./employee";
import { Job } from "./job";
 
export const collections: {
   employees?: mongodb.Collection<Employee>;
   jobs?: mongodb.Collection<Job>
} = {};
 
export async function connectToDatabase(uri: string) {
   const client = new mongodb.MongoClient(uri);
   await client.connect();
 
   const db = client.db("meanStackExample");
   await applySchemaValidation(db);

   const employeesCollection = db.collection<Employee>("employees");
   collections.employees = employeesCollection;

   const jobsCollection = db.collection<Job>("Jobs");
   collections.jobs = jobsCollection;
}
 
// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Employee model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongodb.Db) {

   const jsonSchema = {
       $jsonSchema: {
           bsonType: "object",
           required: ["name", "position", "level"],
           additionalProperties: false,
           properties: {
               _id: {},
               name: {
                   bsonType: "string",
                   description: "'name' is required and is a string",
               },
               position: {
                   bsonType: "string",
                   description: "'position' is required and is a string",
                   minLength: 5
               },
               level: {
                   bsonType: "string",
                   description: "'level' is required and is one of 'junior', 'mid', or 'senior'",
                   enum: ["junior", "mid", "senior"],
               },
           },
       },
   };

   const jsonJobSchema = {
    $jsonJobSchema: {
        bsonType: "object",
        required: ["titre", "position", "typeContrat"],
        additionalProperties: false,
        properties: {
            _id: {},
            titre: {
                bsonType: "string",
                description: "'titre' is required and is a string",
            },
            description: {
                bsonType: "string",
                description: "'description' is required and is a string",
                minLength: 20
            },
            typeContrat: {
                bsonType: "string",
                description: "'typeContrat' is required and is one of 'CDI', 'CDD', or 'Alternant', or'Stage'",
                enum: ["CDI", "CDD", "Alternant","Stage"],
            },
        },
    },
};

 
   // Try applying the modification to the collection, if the collection doesn't exist, create it
  await db.command({
       collMod: "employees",
       validator: jsonSchema
   }).catch(async (error: mongodb.MongoServerError) => {
       if (error.codeName === 'NamespaceNotFound') {
           await db.createCollection("employees", {validator: jsonSchema});
       }
   });

   await db.command({
       collMod: "Jobs",
       validator: jsonJobSchema
   }).catch(async (error: mongodb.MongoServerError) => {
       if (error.codeName === 'NamespaceNotFound') {
           await db.createCollection("Jobs", {validator: jsonJobSchema});
       }
   });
}