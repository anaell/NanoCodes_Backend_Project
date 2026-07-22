import { prisma } from "./prisma.js";

async function seed() {
  try {
    // const new_newsletter_email = await prisma.newsletter.create({
    //   data: { email: "nono01@gmail.com" },
    // });

    const get_all_newsletter_email = await prisma.newsletter.findMany();

    // console.log(new_newsletter_email);
    console.log(get_all_newsletter_email);
  } catch (error) {
    console.error(`An error happened \n${error}`);
  }
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
