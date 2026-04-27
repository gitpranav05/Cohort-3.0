import { Client } from "pg";
const pgClient = new Client("postgresql://neondb_owner:npg_F6PeoRAy4gIS@ep-misty-tree-amrqhn4g-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require");
async function main() {
    await pgClient.connect();
    const resp = await pgClient.query("UPDATE users SET email='aastha@gmail.com' where id=3;");
    console.log(resp.rows);
}
main();
//# sourceMappingURL=index.js.map