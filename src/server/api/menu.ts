import express from 'express';
import { z } from 'zod';
import prisma from '../db';

const router = express.Router();

const menuItemSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: z.number().positive(),
  category: z.string(),
  isAvailable: z.boolean().default(true)
});

// Créer un nouvel item du menu
router.post('/:restaurantId/items', async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const data = menuItemSchema.parse(req.body);

    const menuItem = await prisma.menuItem.create({
      data: {
        ...data,
        restaurantId
      }
    });

    res.status(201).json(menuItem);
  } catch (error) {
    res.status(400).json({ error: 'Erreur lors de la création de l\'item' });
  }
});

// Obtenir le menu d'un restaurant
router.get('/:restaurantId/items', async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const menu = await prisma.menuItem.findMany({
      where: { restaurantId }
    });
    res.json(menu);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du menu' });
  }
});

export default router;