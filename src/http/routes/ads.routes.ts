import { Router } from "express";
import { prisma } from "../../database";
import { convertToHours, convertToMinutes } from "../../utils/convertTime";

export const adsRoutes = Router();

adsRoutes.get("/:id/discord", async (request, response) => {

  const id = request.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true
    },
    where: {
      id
    }
  })

  return response.json({
    discord: ad.discord,
  });
})

adsRoutes.get("/:id", async (request, response) => {
  const gameId = request.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true
    },
    where: {
      gameId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  
  
  return response.json(
    ads.map(ad => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(','),
        hourStart: convertToHours(ad.hourStart),
        hourEnd: convertToHours(ad.hourEnd)
      }
    })
  );
})

adsRoutes.post("/:id", async (request, response) => {
  const gameId = request.params.id;
  const { name, yearsPlaying, weekDays, hourStart, hourEnd, useVoiceChannel, discord } = request.body;

  const ad = await prisma.ad.create({
    data: {
      name,
      discord,
      yearsPlaying,
      weekDays: weekDays.join(","),
      hourStart: convertToMinutes(hourStart),
      hourEnd: convertToMinutes(hourEnd),
      useVoiceChannel,
      gameId
    }
  })
  return response.status(201).json(ad);
})
