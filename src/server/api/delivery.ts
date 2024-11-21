import express from 'express';
import prisma from '../db';

const router = express.Router();

// Assigner un livreur à une commande
router.post('/:orderId/assign', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { driverId } = req.body;

    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        driverId,
        status: 'IN_DELIVERY'
      }
    });

    res.json(order);
  } catch (error) {
    res.status(400).json({ error: 'Erreur lors de l\'assignation du livreur' });
  }
});

// Marquer une commande comme livrée
router.post('/:orderId/complete', async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status: 'DELIVERED' }
    });

    res.json(order);
  } catch (error) {
    res.status(400).json({ error: 'Erreur lors de la finalisation de la livraison' });
  }
});

// Obtenir les livraisons en cours pour un livreur
router.get('/driver/:driverId', async (req, res) => {
  try {
    const { driverId } = req.params;

    const deliveries = await prisma.order.findMany({
      where: {
        driverId,
        status: {
          in: ['IN_DELIVERY', 'READY_FOR_PICKUP']
        }
      },
      include: {
        restaurant: true,
        customer: true
      }
    });

    res.json(deliveries);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des livraisons' });
  }
});

export default router;