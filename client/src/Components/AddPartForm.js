import React, { useState } from 'react';
import {
    MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer,
    MDBInput, MDBRow, MDBTypography,
} from 'mdb-react-ui-kit';
import { useParams } from 'react-router';
import axios from 'axios';
import { DropdownButton, Dropdown } from 'react-bootstrap';

export function AddPartForm(props) {
    const { categoryList, currentUser, parts } = props;
    const { itemId } = useParams();
    const defaultItem = itemId ? parts?.find(x => x.partForDeviceId === +itemId) : {};

    const [formData, setFormData] = useState({
        partName: defaultItem?.partName || '',
        partDescription: defaultItem?.description || '',    
        partImage: '',
        state: defaultItem?.partLocationState || currentUser?.state || '',
        city: defaultItem?.partLocationCity || currentUser?.city || '',
        categorId: defaultItem?.categoryId || null,
        model: defaultItem?.model || '',
        device: defaultItem?.device || '',
        brand: defaultItem?.brand || '',
    });
    const [isDetailsSaved, setDetailsSaved] = useState(false);
    const [isImageChanged, setImageChanged] = useState(false);

    const isDefaultImageDisaplyed = itemId && !isImageChanged && defaultItem?.image;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let _value = value;
        if (name === 'partImage') {
            setImageChanged(true);
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
        try {
            let fileToSend = formData.partImage;
            // קריאת אי פי אי- קוראים לקנטרולר ששומר את התמונה בסרבר
            if (isDefaultImageDisaplyed) {
                // Remove data URL prefix
                const base64String = defaultItem?.image.replace(/^data:image\/\w+;base64,/, '');

                // Remove whitespace characters
                const cleanedBase64String = base64String.replace(/\s/g, '');

                // Convert base64 to binary
                const binaryData = atob(cleanedBase64String);

                // Convert binary to array buffer
                const arrayBuffer = new ArrayBuffer(binaryData.length);
                const uint8Array = new Uint8Array(arrayBuffer);
                for (let i = 0; i < binaryData.length; i++) {
                    uint8Array[i] = binaryData.charCodeAt(i);
                }

                // Create Blob from array buffer
                const blob = new Blob([arrayBuffer], { type: 'image/png' });

                // Create File from Blob
                fileToSend = new File([blob], 'image.png', { type: 'image/png' });
            }
            const _formData = new FormData();
            _formData.append('partImage', fileToSend);
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
            partForDeviceId: itemId || 0,
            partName: formData.partName,
            partImage: isDefaultImageDisaplyed ? defaultItem?.partImage : formData.partImage?.name,
            description: formData.partDescription,
            model: formData.model,
            brand: formData.brand,
            device: formData.device,
            contactId: currentUser?.userId,
            categoryId: formData.categorId,
            partLocationCity: formData.city,
            partLocationState: formData.state,
            isAvailable: '1'
        };
        const method = itemId ? 'put' : 'post'; // Determine HTTP method based on itemId
        const path = itemId ? 'Parts/update' : 'Parts/add'; // Determine API path based on itemId

        axios({
            method: method, // Use determined method
            url: `https://localhost:7082/api/${path}`,
            data: partDetails,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.status === 200) {
                if (!isDefaultImageDisaplyed) {
                    handleUpload();
                } else {
                    setDetailsSaved(true);
                }
            }
        }).catch((ex) => {
            console.log(ex);
        });
    };

    const selectedCategory = categoryList?.find(({ categorId }) => categorId === formData.categorId);

    // בק\דיקה שהכפתור יהיה מאופשר רק כשכל הפרטים הנדרשים מלאים
    const checkFormValid = () => {
        return formData.categorId && formData.partName && (formData.partImage || isDefaultImageDisaplyed)
            && formData.state && formData.city && formData.model
    };

    const displayImage = () => {
        try {
            if (isDefaultImageDisaplyed) {
                return `data:image/png;base64,${defaultItem?.image}`;
            }
            if (formData.partImage) {
                return URL.createObjectURL(formData.partImage);
            }
            return "https://mdbcdn.b-cdn.net/img/Others/extended-example/delivery.webp";
        } catch (ex) {
            console.error(ex);
            return "https://mdbcdn.b-cdn.net/img/Others/extended-example/delivery.webp";
        }
    }

    return (
        <>
            {!isDetailsSaved
                ? (<MDBContainer className="py-5" style={{ maxWidth: '1100px' }}>
                    <MDBRow className="justify-content-center align-items-center">
                        <MDBCol>
                            <MDBCard className="my-4 shadow-3">
                                <MDBRow className="g-0">
                                    <MDBCol md="6" className="d-xl-block bg-image">
                                        <MDBCardImage src={displayImage()} alt="Sample photo" fluid />
                                    </MDBCol>
                                    <MDBCol md="6">
                                        <MDBCardBody className="p-md-5 text-black">
                                            <MDBTypography tag="h3" className="mb-4 text-uppercase">Part Info</MDBTypography>
                                            <MDBRow>
                                                <MDBCol md="6" className="mb-4">
                                                    <MDBInput label='Device Name' type='text' size="lg" name="device" value={formData.device} onChange={handleInputChange} />
                                                </MDBCol>
                                                <MDBCol md="6" className="mb-4">
                                                    <MDBInput label='Model' type='text' size="lg" name="model" value={formData.model} onChange={handleInputChange} />
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow>
                                                <MDBCol md="6" className="mb-4">
                                                    <MDBInput label='Brand' type='text' size="lg" name="brand" value={formData.brand} onChange={handleInputChange} />
                                                </MDBCol>
                                            </MDBRow>
                                            <hr />
                                            <MDBRow>
                                                <MDBCol md="6" className="mb-4">
                                                    <MDBInput label='Part name' type='text' size="lg" name="partName" value={formData.partName} onChange={handleInputChange} />
                                                </MDBCol>
                                            </MDBRow>
                                            <MDBRow>
                                                <MDBCol md="12 q" className="mb-12">
                                                    <MDBInput label='Part description' type='text' size="lg" name="partDescription" value={formData.partDescription} onChange={handleInputChange} />
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
                                                    variant='primary'
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

                                            <div className="d-flex justify-content-end pt-3">
                                                <MDBBtn size="lg"
                                                    className="ms-2 btn btn-primary" style={{ backgroundColor: 'hsl(210, 100%, 50%)' }}
                                                    onClick={handleSaveDetails}
                                                    disabled={!checkFormValid()}
                                                >
                                                    Save Details
                                                </MDBBtn>
                                            </div>

                                        </MDBCardBody>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>)
                : <div className='alert-container'>
                    <h5 className='success-alert'>Your part has been saved successfully</h5>
                    <div className='links'>
                        <a href="/home" className=''>Home</a>
                        <a href="/add-part" className=''>Add another part</a>
                    </div>
                </div>}
        </>
    );
}
