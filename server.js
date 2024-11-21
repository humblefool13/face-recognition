import express from "express";
import fetch from "node-fetch";
import cors from "cors";

import sendRequest from "./proxy.js";

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());

const s3_link = "https://fr-data1.s3.ap-south-1.amazonaws.com/students.json";

async function getAllStudents() {
  const response = await fetch(s3_link);
  const result = await response.json();
  return result;
}

app.get("/", async (req, res) => {
  try {
    const students = await getAllStudents();
    res.status(200).json({ students });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error - /", error });
  }
});

app.all("/cors-proxy", async (req, res) => {
  try {
    const response = await sendRequest(req);
    res.status(200).json(response.body);
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "Internal Server Error - /cors-proxy", error });
  }
});

app.listen(6969, () => console.log("Listening on port 6969!"));
