import React, { useEffect, useState } from 'react';
import axios from "axios";
import PartSearch from './PartSearch';
import {
    useParams
} from "react-router-dom";

export function PartsView() {
    const [parts, setParts] = useState(null);
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
        <div className="container">
            <PartSearch setParts={(updatedPartList) => setParts(updatedPartList)} />
            <div className="row" id="myItems">
                <div className="col-sm-12 mb-3">
                    {parts ? (
                        parts.map((item) => (
                            // <div >
                            //     <span>{item.partName}</span>
                            // </div
                            <div className="card" key={item.partName}>
                                <div className="card-body">
                                    <h5 className="card-title"><a href="#">{item.partName}</a></h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Card Description</h6>
                                    <p className="card-text">{item.originalPrice}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    );
}
