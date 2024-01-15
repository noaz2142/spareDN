import React from 'react';
import { useNavigate } from "react-router-dom";

export function CategoryView({categoryList}) {
    const navigate = useNavigate();

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
