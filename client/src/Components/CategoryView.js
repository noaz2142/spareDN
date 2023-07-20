import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

export function CategoryView() {
    const [categoryList, setCategorys] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setCategorys([{
            id: 1,
            desc: 'Kitchen Dishes'
        },
        {
            id: 2,
            desc: 'Electricity'
        }]);
    }, []);

    return (
        <div className="container">
            <div className="row" id="myItems">
                <div className="col-sm-12 mb-3">
                    {categoryList ? (
                        categoryList.map((item) => (
                            <div className="card" key={item.id}>
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <a onClick={() => navigate(`/parts/${item.id}`)}>{item.desc}</a>
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
