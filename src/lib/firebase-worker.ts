import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from './firebase-config';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Utilisateurs
export const createUser = async (userData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
    const user = userCredential.user;

    // Ajouter les informations supplémentaires dans Firestore
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      role: userData.role,
      fullName: userData.fullName,
      phone: userData.phone,
      address: userData.address,
      createdAt: new Date()
    });

    return user;
  } catch (error) {
    throw error;
  }
};

// Restaurants
export const createRestaurant = async (restaurantData) => {
  try {
    const docRef = await addDoc(collection(db, 'restaurants'), {
      ...restaurantData,
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

// Commandes
export const createOrder = async (orderData) => {
  try {
    const docRef = await addDoc(collection(db, 'orders'), {
      ...orderData,
      status: 'PENDING',
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

// Livreurs
export const createDriver = async (driverData) => {
  try {
    const docRef = await addDoc(collection(db, 'drivers'), {
      ...driverData,
      isAvailable: true,
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

// Recherche de restaurants
export const searchRestaurants = async (searchQuery) => {
  try {
    const q = query(collection(db, 'restaurants'), 
      where('name', '>=', searchQuery),
      where('name', '<=', searchQuery + '\uf8ff')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw error;
  }
};

// Gestion des commandes
export const updateOrderStatus = async (orderId, status) => {
  try {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, {
      status: status,
      updatedAt: new Date()
    });
  } catch (error) {
    throw error;
  }
};