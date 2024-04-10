import React, { useEffect, useState } from 'react';
import axios from "axios";
import PartSearch from './PartSearch';
import { PartItem } from './index';
import {
    useParams, useNavigate
} from "react-router-dom";
import CommonDialog from './CommonDialog';

export function PartsView({
    currentUser, hideSearch, parts, setParts, editUserParts,
    getUserProducts
}) {
    const [images, setImages] = useState(null);
    const [selectedPart, setSelectedPart] = useState(null);
    const [showRemoveWarning, setShowRemoveWarning] = useState(false);
    const [removedPartId, setRemovedPartId] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();

    const fetchImages = async () => {
        // קריאה לקונטרולר שמחזיר את התמונות של החלקים
        if (!images?.length) {
            try {
                axios.get('https://localhost:7082/api/Parts/getImages')
                    .then(response => setImages(response.data));

            }
            catch (error) {
                console.error('Error fetching parts:', error);
            }
        }
    };

    useEffect(() => {
        // קריאת אי פי אי לשליפת המוצרים
        fetchData();
        // קריאת אי פי אי לשליפת התמונות של המוצרים
        fetchImages();
    }, []);

    const fetchData = async () => {
        if (!parts?.length) {
            try {
                // קורא לקונטרולר שמחזיר את הרשימה של החלקים
                axios.get('https://localhost:7082/api/Parts/getPartsByCategory',
                    { params: { categoryId: id, userId: currentUser?.userId } })
                    .then(response => setParts(response.data));

            }
            catch (error) {
                console.error('Error fetching parts:', error);
            }
        }
    };

    const getImg = (id) => {
        // מתאימים לכל חלק את התמונה שמתאימה לו
        return images?.find(x => x.partForDeviceId === id)?.fileImage;
    };

    const handleCardSelection = (item) => {
        if (!editUserParts) {
            setSelectedPart(item)
        }
    };

    const onPartEdit = (itemId) => {
        const partIndex = parts.findIndex(x => x.partForDeviceId === itemId);
        if (partIndex >= 0) {
            parts[partIndex].image = getImg(itemId);
            setParts(parts);
        }
        navigate(`/add-part/${itemId}`);
    };

    const removePart = async () => {
        if (removedPartId) {
            try {
                const path = `https://localhost:7082/api/Parts/ChangeAvailability?id=${removedPartId}`;
                await axios.put(path);
                if (getUserProducts) {
                    getUserProducts();
                }
                setShowRemoveWarning(false);
            }
            catch (error) {
                console.error('Error fetching parts:', error);
            }
        }
    }



    return (
        <>
            {/* הודעה למשתמש שלא הוסיף אף מוצר */}
            <CommonDialog title="You Did Not Share Anything :("
                showDialog={currentUser?.isNewUser}
                handleConfirm={() => navigate('/add-part')}
                hideCancel
                message='You can only see products that were shared 2 days ago. Please share products as soon as possible to get the hot products.'
            />
            <CommonDialog title="Delete Product"
                showDialog={showRemoveWarning}
                handleConfirm={removePart}
                handleCancel={() => setShowRemoveWarning(false)}
                message='Are you sure you want to delete this product?'
            />

            <div className="container parts-view">
                {!hideSearch &&
                    <PartSearch setParts={(updatedPartList) => setParts(updatedPartList)} currentUser={currentUser} />
                }
                <div className='container'>
                    <div className="row gx-5" id="myItems">
                        {parts ? (
                            parts.map((item) => (
                                <div className='col-4' key={item.partForDeviceId}>
                                    <div className="card" key={item.partName} onClick={() => handleCardSelection(item)}>
                                        {editUserParts &&
                                            <>
                                                <div className='delete-icon' role='button' onClick={() => { setRemovedPartId(item.partForDeviceId); setShowRemoveWarning(true); }}>
                                                    <i class="bi bi-trash3-fill" />
                                                </div>
                                                <div className='edit-icon' role='button' onClick={() => onPartEdit(item.partForDeviceId)}>
                                                    <i class="bi bi-pencil" />
                                                </div>
                                            </>
                                        }
                                        <div className="card-body">
                                            {getImg(item.partForDeviceId) &&
                                                <img
                                                    src={`data:image/png;base64,${getImg(item.partForDeviceId)}`}
                                                    alt={`Image ${item.partForDeviceId}`}
                                                    width={300}
                                                />
                                            }
                                            <h5 className="card-title">
                                                {item.partName}
                                            </h5>
                                            <h6 className="card-subtitle mb-2 text-muted">Model: {item.model}</h6>
                                            <h6 className="card-subtitle mb-2 text-muted">Brand: {item.brand}</h6>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
            </div>
            {selectedPart &&
                <PartItem
                    images={images}
                    selectedItem={selectedPart}
                    handleClose={() => setSelectedPart(null)}
                />}
        </>
    );
}
