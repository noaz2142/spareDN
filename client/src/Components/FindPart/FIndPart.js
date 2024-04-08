import React, { useState } from 'react';
import FindPartByCity from './FindPartByCity';
import FreeSearch from './FreeSearch';
import { PartsView } from '..';

export const FindPart = ({ parts, setParts }) => {
    return (
        <div className='find-part-wrapper row'>
            <div className='col-6 search-box'>
                <h5>Smart Search</h5>
                <FreeSearch setParts={setParts} />
            </div>
            {parts?.length > 0 && <PartsView parts={parts} setParts={setParts} hideSearch/>}
        </div>
    );
}