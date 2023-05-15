import app, { init } from "./app.js";

const PORT = process.env.PORT || 4000;

init().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
});
