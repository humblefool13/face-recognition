const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const sendRequest = require("./proxy");

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());

const s3_link =
  "https://fr-data.s3.ap-south-1.amazonaws.com/students.json?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCmFwLXNvdXRoLTEiRzBFAiB6aqZoDw7I6DiUHQ0EzUdFLyoL8Whm%2B6ZOsPnmowUA%2BAIhAOQIpZVvtPfmtOUiNO%2B5klElMx4BYgyr6jU1iNEBo4FCKssDCEgQABoMMDA4OTcxNjcwOTAzIgxObPCSOHlBMCjWkSkqqANBc3D21ywTXL8kADBrc5IODtsGpYGibw1zIifQHiuFyZTGr%2BHiFeVCyGQpZslT4%2FsLaHoN20Q%2FAtsrkbPwD6%2B7PRXd6xZ%2FZTgL30qqt85xPxSZ4Li3qkXqn5SdiOFuAx6z2LRqfglzOD4LOh9fhWZsfoEvLUmQnoptdTjUmBcAfAzFrrNR6vJPhF3FkvPRbqY9KyXmUcnTXNv69NxSiQ%2BYlD8MJzY8RuetzhkH5UWVp6z6Wvt7TRU5%2BXPkF%2F0pgJiYtEwZu1kAptttaWzPOBRQBLwlE6lEJkIU9oHlnSKIy1EwaNSiEI9eWVR7KuZ6nTqGgKcTsf5Lx3zy1RMfogAnjhDpabciDvlRIvfuVVgeZkEnaR2ZWm7T6iV2amg6eFX%2FtoLynafPvaY1KwZRwlIYDdSU4gHBeJa59gBLfnHMGtEdqaDJdPTpzUIq0VkxCGLNmBhTtQFNKP7UFBEox9jKayzjnxyPbsvjh%2BCZ6C46WLkmdxvRDrB6dEQGQahbvwFTo2T6fsY82TJ3T%2FSC1TtKU6Sj%2BTYnafvWKSgx1XzdzcBHpb8P47uaMPz557kGOuQCUbXZyLQM981w3GzC%2Fd3%2BBOsRbaeEr0A23oAtqTZqPYuoI8KB00U67eD6Gm83XghjXDBnEkWQhzMDwXaQPI1XADg66ub0%2FcrsTqtMHpAt5qstaotrLCjntFoqKz%2BXQNGDHrCgLGio2tJ0oL5GY7GlHl0G3isyRv2SGYpGAMgNZeSXGaoYS3jDf69DfaqKVJ6T4aPo4%2BkH8jaJnT5Daj3RIuRWRxjoJBFJHjdXyQ8cV9fyH5HbcaVH4IHcO%2BCaQoDdGlL4irNBasbmtnyrw1TMbgfzuVBuRGcAo33BgUp3uz9uSnx%2BnqtYAVk7OpL2VoXHqUA7i1QcnG7EffMhTlrct70LAt7%2BzUQ1FjfYlbHWwHVoZhwHvwKkQl4zaOxU9jOnDHWrI06JcEwV36wpAcUt46WSA%2BcnUJk1mLvDUUNJ6Z%2BngQOGQ%2FSnPtfG9wvNTzGKCjKmDdw%2ByCy%2BXijFRd5FID7Vk74%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAQEFWA2V3V7OA2V7V%2F20241117%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20241117T144041Z&X-Amz-Expires=43200&X-Amz-SignedHeaders=host&X-Amz-Signature=f2585ae5011e8623363c79e839d98ef48c6873753c42bd7acbc85b66782f27ed";

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
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.all("/cors-proxy", async (req, res) => {
  try {
    const response = await sendRequest(req);
    res.status(200).json(response.body);
  } catch (e) {
    console.log(e);
  }
});

app.listen(6969, () => console.log("Listening on port 6969!"));
