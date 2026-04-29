import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });

export { adapter };

const client = new PrismaClient({ adapter });

async function createUser() {
  const user =await client.user.findFirst({
    where: {
      id:2
    },
    include:{
      todos:true
    }
  });

  console.log(user);
}

createUser();

export { client };
