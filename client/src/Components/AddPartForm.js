import React, { useState } from 'react';
import {
    MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer,
    MDBInput, MDBRow, MDBTypography
} from 'mdb-react-ui-kit';
import axios from 'axios';

export function AddPartForm() {
    const [formData, setFormData] = useState({
        partName: '',
        partDescription: '',
        partImage: '',
        state: 'Israel',
        city: '',
        email: '', // You may need to populate this with the user's email
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSaveDetails = () => {
        const partDetails = {
            partForDeviceId: 0,
            partName: formData.partName,
            partImage: formData.partImage,
            description: formData.partDescription,
            price: formData.price,
            contactId: 0, // You may need to get the contactId from the user input
            categoryId: 0, // You may need to get the categoryId from the user input
            partStatus: 'string', // Set a default value or get it from the user input
            partLocationCity: formData.city,
            partLocationState: formData.state,
            category: {
                categorId: 0, // You may need to get the categoryId from the user input
                description: 'string', // Set a default value or get it from the user input
            },
        };

        axios.post('https://localhost:7082/api/parts', partDetails)
        .then(response => {
          if (response.status === 200) {
            // setShowSuccess(true);
          }
        })
        .catch((ex) => {
          console.log(ex);
          // setShowFailure(true);
        });

        // Make your API call here using the 'payload' data
        // Example: fetch('api/parts', { method: 'POST', body: JSON.stringify(payload) })
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

                                    <MDBInput label='Email' type='text' className="mb-4" size="lg" value={formData.email} readOnly />

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
