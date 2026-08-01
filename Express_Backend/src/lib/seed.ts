import { prisma } from "./prisma.ts";

const seed = async () => {
    try{
        const artisan1 = await prisma.user.create({
            data: {
              id: "user-1", 
              f_name: "John",
              l_name: "Doe",
              email: "john.doe@example.com",
              password: "supersecret123",
              role: "user", 
              phone_no: null,
              whatsapp_no: null,
              updated_at: new Date(),
            },
        });
        console.log(artisan1);

        const getArtisans = await prisma.user.findMany();
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