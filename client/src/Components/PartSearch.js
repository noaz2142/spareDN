import React from 'react';
import axios from "axios";

export default function PartSearch(props) {
    const { setParts } = props;

    const handleSearch = (search) => {
        // קוראים לקונטרולר עם השם שהמשתמש הכניס בתיבת חיפוש ומצפים לקבל רשימה של חלקים שמתאימים לחיפוש
        axios.get('https://localhost:7082/api/Parts/getPartByName', { params: { name: search, categoryId: -1 } })
            .then(response => {
                if (response.status === 200) {
                    setParts(response?.data || {});
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }

    return (
        <div class="row">
            <div class="col-sm-12 mb-3">
                <input
                    type="text"
                    id="myFilter"
                    className="form-control"
                    onKeyDown={(val) => handleSearch(val.target.value)}
                    placeholder="Search for names.."
                />
            </div>
        </div>
    );
}
