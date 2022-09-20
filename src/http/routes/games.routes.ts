import { Router } from "express";
import { prisma } from "../../database";

export const gamesRoutes = Router();

gamesRoutes.get("/", async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true
        }
      }
    }
  });
  
  return response.json(games);
})

