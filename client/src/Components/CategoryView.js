import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PartSearch from './PartSearch';

// save 
// https://codesandbox.io/s/zyotd?file=/src/App.js
// todo: add card

export function CategoryView() {
    const [categoryList, setCategorys] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!categoryList?.length) {
            axios.get('https://localhost:7082/api/Parts/getCategoryList', {})
                .then(response => setCategorys(response.data || []))
                .catch((ex) => console.error(ex));
        }
    }, []);

    return (
        <div className="container">
            <div className="row" id="myItems">
                <div className="col-sm-12 mb-3">
                    {categoryList ? (
                        categoryList.map((item) => (
                            <div className="card" key={item.CategoryId}>
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <a onClick={() => navigate(`/parts/${item.categorId}`)}>{item.description}</a>
                                    </h5>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div >
    );
}
