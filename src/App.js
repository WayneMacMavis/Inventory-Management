import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Auth from "./components/Auth";
import AutoLogout from './components/AutoLogout';
import useIdleTimer from './components/useIdleTimer';
import Loader from './components/Loader/Loader';
import EditorsPage from './components/EditorsPage/EditorsPage';
import StockTakePage from './components/StockTakePage/StockTakePage';
import ProcurementPage from './components/ProcurementPage/ProcurementPage';
import Navigation from './components/Navigation/Navigation';
import { getItemsFromLocalStorage, saveItemsToLocalStorage } from './components/Utils/LocalStorage';
import { getAuth, onAuthStateChanged, setPersistence, browserSessionPersistence, signOut } from "firebase/auth";
import { app } from "./firebaseConfig";
import logoImage from "../src/assets/Skeg-background.png";
import './App.css';

const auth = getAuth(app);

function App() {
  const isIdle = useIdleTimer(25000); // 10 minutes

  // Auto logout on idle
  useEffect(() => {
    if (isIdle) {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          console.log('User signed out due to inactivity.');
          // Redirect or update state as needed
        })
        .catch(error => {
          console.error('Error signing out:', error);
        });
    }
  }, [isIdle]);

  // State for items in LocalStorage
  const [items, setItems] = useState(() =>
    getItemsFromLocalStorage('items', [
      {
        stockCode: '',
        description: '',
        stockLevelRequired: '',
        responsibleCounter: '',
        responsibleBuyer: '',
        currentLevel: '',
        unit: '',
        orderQuantity: '',
        purchaseUnit: '',
        lastStockDate: '',
        stockRoom: '',
        supplier: '',
      },
    ])
  );

  useEffect(() => {
    saveItemsToLocalStorage('items', items);
  }, [items]);

  // Functionality to modify items
  function handleChange(index, field, value) {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  }

  function removeItem(indexOrId) {
    const updatedItems = items.filter((_, i) => i !== indexOrId);
    setItems(updatedItems);
  }

  function addNewItem(newItem) {
    setItems((prevItems) => [...prevItems, newItem]);
  }

  // Set up authentication state
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set Firebase Auth persistence to SESSION
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          setLoading(false); // Ensure loading state is set to false after auth state is checked
        });
        return unsubscribe;
      })
      .catch((error) => {
        console.error("Error setting auth persistence:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log('User signed out.');
      setUser(null); // Clear user state on logout
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        {user ? (
          <>
            <Navigation />
            <Routes>
              <Route
                path="/"
                element={
                  <EditorsPage
                    items={items}
                    handleChange={handleChange}
                    removeItem={removeItem}
                    addNewItem={addNewItem}
                  />
                }
              />
              <Route path="/stock-take" element={<StockTakePage />} />
              <Route path="/procurement" element={<ProcurementPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <AutoLogout handleLogout={handleLogout} />
          </>
        ) : (
          // If not signed in, show the Auth component for all routes.
          <Routes>
            <Route path="*" element={<Auth />} />
          </Routes>
        )}
         <img src={logoImage} alt="Logo" className="app-background" />
      </div>
    </Router>
  );
}

export default App;
