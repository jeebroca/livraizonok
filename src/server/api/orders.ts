import express from 'express';
import { z } from 'zod';
import prisma from '../db';

const router = express.Router();

const orderItemSchema = z.object({
  menuItemId: z.string(),
  quantity: z.number().positive()
});

const orderSchema = z.object({
  customerId: z.string(),
  restaurantId: z.string(),
  items: z.array(orderItemSchema),
  address: z.string()
});

// Créer une nouvelle commande
router.post('/', async (req, res) => {
  try {
    const data = orderSchema.parse(req.body);
    
    // Calculer le total de la commande
    const menuItems = await prisma.menuItem.findMany({
      where: {
        id: {
          in: data.items.map(item => item.menuItemId)
        }
      }
    });

    const total = data.items.reduce((sum, item) => {
      const menuItem = menuItems.find(mi => mi.id === item.menuItemId);
      return sum + (menuItem?.price || 0) * item.quantity;
    }, 0);

    // Créer la commande avec ses items
    const order = await prisma.order.create({
      data: {
        customerId: data.customerId,
        restaurantId: data.restaurantId,
        total,
        address: data.address,
        items: {
          create: data.items.map(item => ({
            menuItemId: item.menuItemId,
            quantity: item.quantity,
            price: menuItems.find(mi => mi.id === item.menuItemId)?.price || 0
          }))
        }
      },
      include: {
        items: true
      }
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: 'Erreur lors de la création de la commande' });
  }
});

// Mettre à jour le statut d'une commande
router.patch('/:orderId/status', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status }
    });

    res.json(order);
  } catch (error) {
    res.status(400).json({ error: 'Erreur lors de la mise à jour du statut' });
  }
});

export default router;