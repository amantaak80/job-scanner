require("dotenv").config();

const app = require("./src/app");

const connectToDB = require("./src/config/database");
const { generateInterviewReport } = require("./src/services/ai.service");
const {
  sampleResume,
  selfDescription,
  relatedJobDescription,
} = require("./src/services/temp");

connectToDB();

if (process.env.RUN_AI_BOOTSTRAP === "true") {
  generateInterviewReport({
    resume: sampleResume,
    selfDescription: selfDescription,
    jobDescription: relatedJobDescription,
  })
    .then((report) => {
      console.log("AI bootstrap report generated successfully.");
      console.log(report);
    })
    .catch((error) => {
      console.error("AI bootstrap skipped:", error.message);
    });
}

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
