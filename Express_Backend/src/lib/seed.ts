import { prisma } from "./prisma.ts";

const seed = async () => {
    try{
        const artisan1 = await prisma.users.create({
            data: {
                name: "John Doe",
                email: "john.doe@example.com",
                password: "supersecret123"
            }
        });
        console.log(artisan1);

        const getArtisans = await prisma.users.findMany();
        console.log(getArtisans);
    }catch(err){
        console.log(err)
    }
}

seed()
    .then(async () => {
        console.log("Seeding completed successfully.");
        await prisma.$disconnect();
    })
    .catch((err) => {
        console.error("Error occurred while seeding:", err);
        prisma.$disconnect();
    });