import React, { useState, useRef } from 'react';
import axios from "axios"
import { Form, Row, Col, Button } from 'react-bootstrap';
import Dropzone from "react-dropzone";
import {API_URL} from "../utils/constants";

const NewProd = (props) => {
    const [file, setFile] = useState(null); // state for storing actual image
    const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
    const [state, setState] = useState({
        prod_name: '',
        prod_desc: '',
        prod_price: 0,
        prod_disc: 0
    });
    const [errorMsg, setErrorMsg] = useState('');
    const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
    const dropRef = useRef(); // React ref for managing the hover state of droppable area

    const handleInputChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    };

    const onDrop = (files) => {
        const [uploadedFile] = files;
        setFile(uploadedFile);

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewSrc(fileReader.result);
        };
        fileReader.readAsDataURL(uploadedFile);
        setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
    };


    const handleOnSubmit = async (event) => {
        event.preventDefault();
        console.log("I'm here");
        try {
            const { prod_name, prod_desc, prod_price, prod_disc } = state;
            if (prod_name.trim() !== '' && prod_desc.trim() !== '') {
                if (file) {
                    const formData = new FormData();
                    formData.append('file', file);
                    formData.append('prod_name', prod_name);
                    formData.append('prod_desc', prod_desc);
                    formData.append('prod_price', prod_price);
                    formData.append('prod_disc', prod_disc);

                    console.log('before axios request');
                    setErrorMsg('');
                    await axios.post(`${API_URL}/products/add`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        params: {
                            'cat_name': 'Kapi za Bradu'
                        }
                    });
                    console.log('after request')
                } else {
                    setErrorMsg('Please select a file to add.');
                }
            } else {
                setErrorMsg('Please enter all the field values.');
            }
        } catch (error) {
            error.response && setErrorMsg(error.response.data);
        }

    };

    return (
        <React.Fragment>
            <Form className="search-form" onSubmit={handleOnSubmit}>
                {errorMsg && <p className="errorMsg">{errorMsg}</p>}
                <Row>
                <Col>
                <Row>
                    <Col>
                        <Form.Group controlId="prod_name">
                            <Form.Control
                                type="text"
                                name="prod_name"
                                value={state.prod_name || ''}
                                placeholder="Enter title"
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="prod_desc">
                            <Form.Control
                                type="text"
                                name="prod_desc"
                                value={state.prod_desc || ''}
                                placeholder="Enter description"
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="prod_price">
                                <Form.Control
                                    type="number"
                                    name="prod_price"
                                    value={state.prod_price || ''}
                                    placeholder="Enter price"
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="prod_disc">
                                <Form.Control
                                    type="number"
                                    name="prod_disc"
                                    value={state.prod_disc || ''}
                                    placeholder="Enter discount"
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Col>
                    <Col>
                <div className="upload-section">
                    <Dropzone onDrop={onDrop}>
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
                                <input {...getInputProps()} />
                                <p>Drag and drop a file OR click here to select a file</p>
                                {file && (
                                    <div>
                                        <strong>Selected file:</strong> {file.name}
                                    </div>
                                )}
                            </div>
                        )}
                    </Dropzone>
                    {previewSrc ? (
                        isPreviewAvailable ? (
                            <div className="image-preview">
                                <img className="preview-image" src={previewSrc} alt="Preview" />
                            </div>
                        ) : (
                            <div className="preview-message">
                                <p>No preview available for this file</p>
                            </div>
                        )
                    ) : (
                        <div className="preview-message">
                            <p>Image preview will be shown here after selection</p>
                        </div>
                    )}
                </div>
                </Col>
                </Row>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </React.Fragment>
    );
};

export default NewProd;
