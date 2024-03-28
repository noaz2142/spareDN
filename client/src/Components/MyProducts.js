import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PartsView } from '.';

export function MyProducts({ currentUser, setParts }) {
    const [userParts, setUserParts] = useState([]);

    useEffect(() => {
        setParts(userParts);
        // return () => setParts([]);
    }, [userParts])

    const getUserProducts = async () => {
        if (currentUser?.userId) {
            try {
                axios.get('https://localhost:7082/api/Parts/getUserParts',
                    { params: { userId: currentUser.userId } })
                    .then(response => {
                        if (response.status === 200) {
                            setUserParts(response?.data || {});
                        }
                    })
            }
            catch (err) {
                console.error(err);
            };
        }
    }
    // הצגת רשימת קטגוריות, בלחיצה על קטגוריה מוצגים המוצרים בקטגוריה
    useEffect(() => {
        getUserProducts()
    }, []);

    return (
        <div>
            <h3>my Products</h3>
            {userParts?.length > 0 && <PartsView parts={userParts} setParts={setUserParts} editUserParts />}
        </div>
    );
}
