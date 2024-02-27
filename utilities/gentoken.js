import bcrypt from "bcrypt";
import { env } from "process";

const saltRounds = 12;

bcrypt
  .genSalt(saltRounds)
  .then((salt) => {
    console.log("Salt: ", salt);
    return bcrypt.hash(env.PASS, salt);
  })
  .then((hash) => {
    console.log("Hash: ", hash);
  })
  .catch((err) => console.error(err.message));
