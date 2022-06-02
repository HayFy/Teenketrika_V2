import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";
 
export const jobRouter = express.Router();
jobRouter.use(express.json());
 
jobRouter.get("/", async (_req, res) => {
   try {
       const jobs = await collections.jobs.find({}).toArray();
       res.status(200).send(jobs);
   } catch (error) {
       res.status(500).send(error.message);
   }
});

jobRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const job = await collections.jobs.findOne(query);
  
        if (job) {
            res.status(200).send(job);
        } else {
            res.status(404).send(`Failed to find a job: ID ${id}`);
        }
  
    } catch (error) {
        res.status(404).send(`Failed to find a job: ID ${req?.params?.id}`);
    }
 });

 jobRouter.post("/", async (req, res) => {
    try {
        const job = req.body;
        const result = await collections.jobs.insertOne(job);
  
        if (result.acknowledged) {
            res.status(201).send(`Created a new job: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new job.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
 });

 jobRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const job = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.jobs.updateOne(query, { $set: job });
  
        if (result && result.matchedCount) {
            res.status(200).send(`Updated an job: ID ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find an job: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update an job: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
 });

 jobRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.jobs.deleteOne(query);
  
        if (result && result.deletedCount) {
            res.status(202).send(`Removed an job: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove an job: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find an job: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
 });