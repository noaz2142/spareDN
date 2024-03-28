import React, { useState } from 'react';
import axios from "axios";
import { Button } from 'react-bootstrap';

export default function FreeSearch(props) {
    const { setParts } = props;
    const [searchInput, setSearchInput] = useState('');

    const handleSearch = () => {
        // קוראים לקונטרולר עם השם שהמשתמש הכניס בתיבת חיפוש ומצפים לקבל רשימה של חלקים שמתאימים לחיפוש
        if (searchInput) {
            axios.get('https://localhost:7082/api/Parts/search',
                { params: { searchStr: searchInput } })
                .then(response => {
                    if (response.status === 200) {
                        setParts(response?.data || {});
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }

    return (
        <div>
            <span>Enter key words</span>
            <input
                type="text"
                id="myFilter"
                className="form-control"
                onKeyDown={(val) => setSearchInput(val.target.value)}
                placeholder="Example: Canon Camera Charger Ashdod"
            />
            <Button variant="primary" onClick={handleSearch}>Search</Button>
        </div>
    );
}
