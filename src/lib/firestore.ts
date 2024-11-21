import { 
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { db } from './firebase';

// Users
export const createUser = async (userId: string, userData: any) => {
  await setDoc(doc(db, 'users', userId), userData);
};

export const getUser = async (userId: string) => {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

// Restaurants
export const createRestaurant = async (restaurantData: any) => {
  const docRef = doc(collection(db, 'restaurants'));
  await setDoc(docRef, {
    ...restaurantData,
    id: docRef.id,
    createdAt: new Date()
  });
  return docRef.id;
};

export const getRestaurant = async (restaurantId: string) => {
  const docRef = doc(db, 'restaurants', restaurantId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

export const getRestaurants = async () => {
  const querySnapshot = await getDocs(collection(db, 'restaurants'));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Menu Items
export const createMenuItem = async (restaurantId: string, itemData: any) => {
  const docRef = doc(collection(db, `restaurants/${restaurantId}/menuItems`));
  await setDoc(docRef, {
    ...itemData,
    id: docRef.id,
    createdAt: new Date()
  });
  return docRef.id;
};

export const getMenuItems = async (restaurantId: string) => {
  const querySnapshot = await getDocs(
    collection(db, `restaurants/${restaurantId}/menuItems`)
  );
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Orders
export const createOrder = async (orderData: any) => {
  const docRef = doc(collection(db, 'orders'));
  await setDoc(docRef, {
    ...orderData,
    id: docRef.id,
    createdAt: new Date(),
    status: 'PENDING'
  });
  return docRef.id;
};

export const getOrder = async (orderId: string) => {
  const docRef = doc(db, 'orders', orderId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  const docRef = doc(db, 'orders', orderId);
  await updateDoc(docRef, { status, updatedAt: new Date() });
};

// Drivers
export const createDriver = async (driverData: any) => {
  const docRef = doc(collection(db, 'drivers'));
  await setDoc(docRef, {
    ...driverData,
    id: docRef.id,
    createdAt: new Date()
  });
  return docRef.id;
};

export const getAvailableDrivers = async (city: string) => {
  const q = query(
    collection(db, 'drivers'),
    where('city', '==', city),
    where('isAvailable', '==', true)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Reviews
export const createReview = async (reviewData: any) => {
  const docRef = doc(collection(db, 'reviews'));
  await setDoc(docRef, {
    ...reviewData,
    id: docRef.id,
    createdAt: new Date()
  });
  return docRef.id;
};

export const getRestaurantReviews = async (restaurantId: string) => {
  const q = query(
    collection(db, 'reviews'),
    where('restaurantId', '==', restaurantId)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};