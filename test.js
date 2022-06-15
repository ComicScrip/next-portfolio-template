const db = require("./db");

async function main() {
  await db.user.delete({ where: { email: "visitor@website.com" } });
  console.log("done");
}

main();
