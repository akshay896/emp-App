import React, { useState } from "react";
import "../App.css";
import { removeDetailsAPI } from "../Services/allAPI";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Home({ displayData, setDeleteResponse, onEdit }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRemove = async (empId) => {
    try {
      const result = await removeDetailsAPI(empId);
      setDeleteResponse(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
     <div className="box-head-container">
        <div className="box-head one mt-2">
        <td>{displayData?.empId}</td>
        </div>
        <div className="box-head two mt-2">
        <td>{displayData?.empName}</td>
        </div>
        <div className="box-head three mt-2">
        <td>{displayData?.empEmail}</td>
        </div>
        <div className="box-head four mt-2">
        <td>{displayData?.empStatus}</td>
        </div>
        <div className="box-head five">
        <td className="d-flex justify-content-evenly">
                <button onClick={() => onEdit(displayData)} className="btn btn-primary ">Edit</button>
                <button onClick={handleShow} className="btn btn-success">Read</button>
                <button onClick={() => handleRemove(displayData?.id)} className="btn btn-danger">Delete</button>
              </td>
        </div>
      </div>
      <div className="w-75 m-auto">
        {/* Render table headers outside the loop */}
        <table className="table table-striped">
          
          <tbody>
            {/* Render each row of data */}
            <tr>
              
              
             
              
              
            </tr>
          </tbody>
        </table>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Details of {displayData?.empName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Employee Id : {displayData?.empId}</p>
          <p>Email : {displayData?.empEmail}</p>
          <p>Employee Status : {displayData?.empStatus}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => onEdit(displayData)}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Home;
