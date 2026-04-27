import { Client } from "pg";

const pgClient = new Client(
);

async function main() {
  await pgClient.connect();
  const resp = await pgClient.query(
    "UPDATE users SET email='aastha@gmail.com' where id=3;",
  );
  console.log(resp.rows);
}

main();
