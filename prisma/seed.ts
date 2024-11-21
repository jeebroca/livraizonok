import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Création des utilisateurs de test
  const customerUser = await prisma.user.create({
    data: {
      email: 'client@example.com',
      password: await bcrypt.hash('password123', 10),
      role: 'CUSTOMER',
      customer: {
        create: {
          fullName: 'Jean Dupont',
          phone: '+596 690 20 08 80',
          address: 'section Pichery 97140 capesterre de Marie Galante'
        }
      }
    }
  });

  const restaurantUser = await prisma.user.create({
    data: {
      email: 'restaurant@example.com',
      password: await bcrypt.hash('password123', 10),
      role: 'RESTAURANT',
      restaurant: {
        create: {
          name: 'Ti Bébélé',
          description: 'Les meilleurs bébélés de la Martinique',
          address: 'section Pichery 97140 capesterre de Marie Galante',
          phone: '+596 690 20 08 80',
          cuisineType: 'Antillais'
        }
      }
    }
  });

  const driverUser = await prisma.user.create({
    data: {
      email: 'livreur@example.com',
      password: await bcrypt.hash('password123', 10),
      role: 'DRIVER',
      driver: {
        create: {
          fullName: 'Pierre Martin',
          phone: '+596 690 20 08 80',
          vehicleType: 'scooter',
          city: 'Capesterre de Marie-Galante'
        }
      }
    }
  });

  // Création des plats pour le restaurant
  const restaurant = await prisma.restaurant.findFirst({
    where: { userId: restaurantUser.id }
  });

  if (restaurant) {
    await prisma.menuItem.createMany({
      data: [
        {
          restaurantId: restaurant.id,
          name: 'Bébélé Traditionnel',
          description: 'Bébélé aux légumes et viande de porc',
          price: 15.90,
          category: 'Bébélés',
          isAvailable: true
        },
        {
          restaurantId: restaurant.id,
          name: 'Bokit Morue',
          description: 'Bokit garni à la morue',
          price: 8.50,
          category: 'Bokits',
          isAvailable: true
        },
        {
          restaurantId: restaurant.id,
          name: 'Colombo de Poulet',
          description: 'Colombo de poulet avec riz et légumes',
          price: 12.90,
          category: 'Plats Antillais',
          isAvailable: true
        }
      ]
    });
  }

  console.log('Base de données initialisée avec succès !');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });