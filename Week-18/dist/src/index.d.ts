import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
declare const adapter: PrismaPg;
export { adapter };
declare const client: import("./generated/prisma/internal/class.js").PrismaClient<never, import("./generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined, import("@prisma/client/runtime/client").DefaultArgs>;
export { client };
//# sourceMappingURL=index.d.ts.map