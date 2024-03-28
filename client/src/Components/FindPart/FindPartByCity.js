import React from 'react';
import { Button } from 'react-bootstrap';

export default function FindPartByCity(props) {
    return (
        <div>
            <span>Search By City</span>
            <input
                type="text"
                id="myFilter"
                className="form-control"
                // onKeyDown={(val) => setSearchInput(val.target.value)}
                placeholder="Search by city.."
            />
            <Button variant="primary">Search</Button>
        </div>
    );
}
