import React, { useState } from 'react';
import {
    MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer,
    MDBInput, MDBRow, MDBTypography,
    MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem
} from 'mdb-react-ui-kit';

import axios from 'axios';

export function AddPartForm({ categoryList }) {
    const [formData, setFormData] = useState({
        partName: '',
        partDescription: '',
        partImage: '',
        state: 'Israel',
        city: '',
        categoryId: null
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCategoryChange = (value) => {
        setFormData((prevData) => ({
            ...prevData,
            categoryId: value,
        }));
    };

    const handleSaveDetails = () => {
        const partDetails = {
            partForDeviceId: 0,
            partName: formData.partName,
            partImage: formData.partImage,
            description: formData.partDescription,
            price: formData.price,
            contactId: 1, // You may need to get the contactId from the user input
            categoryId: 1, // You may need to get the categoryId from the user input
            partStatus: 'AV', // Set a default value or get it from the user input
            partLocationCity: formData.city,
            partLocationState: formData.state
        };

        axios.post('https://localhost:7082/api/Parts/add', partDetails)
            .then(response => {
                if (response.status === 200) {
                    // setShowSuccess(true);
                }
            })
            .catch((ex) => {
                console.log(ex);
                // setShowFailure(true);
            });

    };

    return (
        <MDBContainer className="py-5" style={{ maxWidth: '1100px' }}>
            <MDBRow className="justify-content-center align-items-center">
                <MDBCol>
                    <MDBCard className="my-4 shadow-3">
                        <MDBRow className="g-0">
                            <MDBCol md="6" className="d-xl-block bg-image">
                                <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Others/extended-example/delivery.webp" alt="Sample photo" fluid />
                            </MDBCol>
                            <MDBCol md="6">
                                <MDBCardBody className="p-md-5 text-black">
                                    <MDBTypography tag="h3" className="mb-4 text-uppercase">Part Info</MDBTypography>
                                    <MDBRow>
                                        <MDBCol md="6" className="mb-4">
                                            <MDBInput label='Part name' type='text' size="lg" name="partName" value={formData.partName} onChange={handleInputChange} />
                                        </MDBCol>
                                        <MDBCol md="6" className="mb-4">
                                            <MDBInput label='Part description' type='text' size="lg" name="partDescription" value={formData.partDescription} onChange={handleInputChange} />
                                        </MDBCol>
                                    </MDBRow>

                                    <MDBRow>
                                        <MDBCol md="6" className="mb-4">
                                            <MDBInput label='Price' type='text' size="lg" name="price" value={formData.price} onChange={handleInputChange} />
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                        <MDBInput label='Part image' type='file' size="lg" name="partImage" value={formData.partImage} onChange={handleInputChange} />
                                    </MDBRow>
                                    <MDBRow>
                                        <div className='mb-2'>
                                            Category: {categoryList?.find(({ categoryId }) => categoryId === formData.categoryId)?.description || 'Not Selected'}
                                        </div>
                                        <MDBDropdown>
                                            <MDBDropdownToggle tag='a' className='btn btn-primary'>
                                                Select
                                            </MDBDropdownToggle>
                                            <MDBDropdownMenu>
                                                {categoryList?.map((categoryitem) => (
                                                    <MDBDropdownItem key={categoryitem.categoryId} onClick={() => handleCategoryChange(categoryitem.categoryId)} link>
                                                        {categoryitem.description}
                                                    </MDBDropdownItem>
                                                ))}
                                            </MDBDropdownMenu>
                                        </MDBDropdown>
                                    </MDBRow>
                                    <hr />
                                    <span>Address</span>
                                    <MDBRow>
                                        <MDBCol md="6" className="mb-4">
                                            <MDBInput label='State' type='text' size="lg" name="state" value={formData.state} onChange={handleInputChange} />
                                        </MDBCol>
                                        <MDBCol md="6" className="mb-4">
                                            <MDBInput label='City' type='text' size="lg" name="city" value={formData.city} onChange={handleInputChange} />
                                        </MDBCol>
                                    </MDBRow>

                                    {/* <MDBInput label='Email' type='text' className="mb-4" size="lg" value={formData.email} readOnly /> */}

                                    <div className="d-flex justify-content-end pt-3">
                                        <MDBBtn size="lg" className="ms-2" style={{ backgroundColor: 'hsl(210, 100%, 50%)' }} onClick={handleSaveDetails}>Save Details</MDBBtn>
                                    </div>

                                </MDBCardBody>
                            </MDBCol>
                        </MDBRow>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}
