import type { Request,Response } from "express";
import { z } from "zod";

const  ArtisanSchema= z.object({
    name: z.string(),
    skill: z.string(),
    rating: z.number(),
    address: z.string(),
    experience: z.string()
});

type Artisansbody = z.infer<typeof ArtisanSchema>;

const CreateArtisan = async (req: Request<{},{}, Artisansbody>,res: Response) => {

    const parseResult = ArtisanSchema.safeParse(req.body);

    if(!parseResult.success){
        return res.status(400).json({
            success: false,
            message: "Invalid inputs",
            errors: parseResult.error,
        });
    }

    

}
export { CreateArtisan}