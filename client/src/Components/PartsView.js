import React, { useEffect, useState } from 'react';
import axios from "axios";
import PartSearch from './PartSearch';
import { PartItem } from './index';
import {
    useParams
} from "react-router-dom";

export function PartsView() {
    const [parts, setParts] = useState(null);
    const [selectedPart, setSelectedPart] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        if (!parts?.length) {
            try {
                axios.get('https://localhost:7082/api/Parts/getPartsByCategory', { params: { categoryId: id } })
                    .then(response => setParts(response.data));

            }
            catch (error) {
                console.error('Error fetching parts:', error);
            }
        }
    };

    return (
        <>
            <div className="container parts-view">
                <PartSearch setParts={(updatedPartList) => setParts(updatedPartList)} />
                <div className='container'>
                    <div className="row gx-5" id="myItems">
                        {parts ? (
                            parts.map((item) => (
                                <div className='col-4'>
                                    <div className="card" key={item.partName} onClick={() => setSelectedPart(item)}>
                                        <div className="card-body">
                                            {item.partImage &&
                                                <img
                                                    src={(() => {
                                                        try {
                                                            return require(`../images/${item.partImage}`);
                                                        } catch (error) {
                                                            // image not found
                                                            console.error(`Error loading image: ${error.message}`);
                                                            return null;
                                                        }
                                                    })()}
                                                    width={300}
                                                    alt="Part Image"
                                                />
                                            }
                                            <h5 className="card-title">
                                                {item.partName}
                                            </h5>
                                            <h6 className="card-subtitle mb-2 text-muted">{item.price} NIS</h6>
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
            {selectedPart && <PartItem
                selectedItem={selectedPart}
                handleClose={() => setSelectedPart(null)}
            />}
        </>
    );
}
