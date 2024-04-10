import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function CommonDialog({
    showDialog, title, message = '', handleConfirm, handleCancel, hideCancel
}) {

    return (
        <>{showDialog && (
            <div
                className="modal show"
                style={{ display: 'block', position: 'initial' }}
            >
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>{message}</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="primary" onClick={handleConfirm} >Proceed</Button>
                        {!hideCancel && <Button variant="" onClick={handleCancel} >Cancel</Button>}
                    </Modal.Footer>
                </Modal.Dialog>
            </div>
        )}
        </>);
}

export default CommonDialog;