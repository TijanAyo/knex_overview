import app from "./index";
import { environment } from "./config";

const PORT = Number(environment.PORT) || 5050;

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running on localhost:${PORT}`);
    });
  } catch (err: any) {
    console.error(`Failed to connect to the database: ${err.message}`);
    process.exit(1);
  }
};

startServer();
