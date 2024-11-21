import express from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import prisma from '../db';

const router = express.Router();

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['CUSTOMER', 'RESTAURANT', 'DRIVER']),
  fullName: z.string(),
  phone: z.string().optional(),
  address: z.string().optional(),
  restaurantName: z.string().optional(),
  cuisineType: z.string().optional(),
  vehicleType: z.string().optional(),
  city: z.string().optional(),
});

router.post('/register', async (req, res) => {
  try {
    const data = registerSchema.parse(req.body);
    
    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    // Create user
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        role: data.role,
      },
    });

    // Create specific profile based on role
    switch (data.role) {
      case 'CUSTOMER':
        await prisma.customer.create({
          data: {
            userId: user.id,
            fullName: data.fullName,
            phone: data.phone,
            address: data.address,
          },
        });
        break;

      case 'RESTAURANT':
        if (!data.restaurantName || !data.cuisineType) {
          throw new Error('Restaurant details required');
        }
        await prisma.restaurant.create({
          data: {
            userId: user.id,
            name: data.restaurantName,
            phone: data.phone || '',
            address: data.address || '',
            cuisineType: data.cuisineType,
          },
        });
        break;

      case 'DRIVER':
        if (!data.vehicleType || !data.city) {
          throw new Error('Driver details required');
        }
        await prisma.driver.create({
          data: {
            userId: user.id,
            fullName: data.fullName,
            phone: data.phone || '',
            vehicleType: data.vehicleType,
            city: data.city,
          },
        });
        break;
    }

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ error: 'Registration failed' });
  }
});

export default router;