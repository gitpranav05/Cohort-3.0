import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.js";
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
export { adapter };
const client = new PrismaClient({ adapter }); // ✅ Now valid with 0 arguments
async function createUser() {
    await client.user.create({
        data: {
            username: "pranav",
            password: "123123",
            age: 21,
            city: "PCMC" // ✅ Valid since we added it to schema and regenerated
        },
    });
}
createUser();
export { client };
//# sourceMappingURL=index.js.map