import React, { useEffect, useState } from 'react';
import axios from "axios";
import PartSearch from './PartSearch';
import { PartItem } from './index';
import {
    useParams, useNavigate
} from "react-router-dom";

export function PartsView({
    currentUser, hideSearch, parts, setParts, editUserParts
}) {
    const [images, setImages] = useState(null);
    const [selectedPart, setSelectedPart] = useState(null);

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

    return (
        <>
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
                                            <div className='edit-icon' role='button' onClick={() => onPartEdit(item.partForDeviceId)}>
                                                <i class="bi bi-pencil" />
                                            </div>
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
