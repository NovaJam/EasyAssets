import app from "./app";
import { connectDB } from "./lib/connectDB";

import { mongoDbUri } from "./env";

const port = 6090;

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  await connectDB(mongoDbUri as string);
});
