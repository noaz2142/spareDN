import React, { useState } from 'react';
import {
    MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer,
    MDBInput, MDBRow, MDBTypography,
} from 'mdb-react-ui-kit';

import axios from 'axios';
import { DropdownButton, Dropdown } from 'react-bootstrap';

export function AddPartForm({ categoryList }) {
    const [formData, setFormData] = useState({
        partName: '',
        partDescription: '',
        partImage: '',
        state: 'Israel',
        city: '',
        categorId: null
    });
    const [isDetailsSaved, setDetailsSaved] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let _value = value;
        if (name === 'partImage') {
            _value = e.target.files?.[0];
        }
        setFormData((prevData) => ({
            ...prevData,
            [name]: _value,
        }));
    };

    const handleCategoryChange = (value = 0) => {
        setFormData((prevData) => ({
            ...prevData,
            categorId: parseInt(value),
        }));
    };

    const handleUpload = async () => {
        const _formData = new FormData();
        _formData.append('partImage', formData.partImage);

        try {
            const response = await axios.post('https://localhost:7082/api/Parts/upload', _formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Accept": "application/json"
                }
            });
            if (response.status === 200) {
                setDetailsSaved(true);
            }

        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleSaveDetails = () => {
        const partDetails = {
            partForDeviceId: 0,
            partName: formData.partName,
            partImage: formData.partImage?.name,
            description: formData.partDescription,
            price: formData.price,
            contactId: 1,
            categorId: 1,
            partStatus: 'AV', // Set a default value or get it from the user input
            partLocationCity: formData.city,
            partLocationState: formData.state
        };

        axios.post('https://localhost:7082/api/Parts/add', partDetails, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                handleUpload().then((res) => alert(res));
            }
        }).catch((ex) => {
            console.log(ex);
        });
    };


    const selectedCategory = categoryList?.find(({ categorId }) => categorId === formData.categorId);

    return (
        <>
            {!isDetailsSaved
                ? (<MDBContainer className="py-5" style={{ maxWidth: '1100px' }}>
                    <MDBRow className="justify-content-center align-items-center">
                        <MDBCol>
                            <MDBCard className="my-4 shadow-3">
                                <MDBRow className="g-0">
                                    <MDBCol md="6" className="d-xl-block bg-image">
                                        <MDBCardImage src={
                                            formData.partImage
                                                ? URL.createObjectURL(formData.partImage)
                                                : "https://mdbcdn.b-cdn.net/img/Others/extended-example/delivery.webp"
                                        } alt="Sample photo" fluid />
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
                                                <MDBInput label='Part image' type='file' size="lg" name="partImage" onChange={handleInputChange} />
                                            </MDBRow>
                                            <MDBRow>
                                                <DropdownButton
                                                    id="dropdown-category"
                                                    title={`Category: ${selectedCategory?.description || 'Select'}`}
                                                    onSelect={handleCategoryChange}
                                                    // className='col-3'
                                                    variant='secondary'
                                                >
                                                    {categoryList?.map((categoryitem) => (
                                                        <Dropdown.Item key={categoryitem.categorId} eventKey={categoryitem.categorId} href="#">
                                                            {categoryitem.description}
                                                        </Dropdown.Item>
                                                    ))}
                                                </DropdownButton>
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
                </MDBContainer>)
                : <>
                    <h5>Your part has been saved successfully</h5>
                    <div className='row'>
                        <a href="/home" className='col-6'>Go back</a>
                        <a href="/add-part" className='col-6'>Add another part</a>
                    </div>
                </>}
        </>
    );
}
