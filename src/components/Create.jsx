import React, { useEffect, useState } from "react";
import "../App.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  addDetailsAPI,
  getAllDetailsAPI,
  updateDetailsAPI,
} from "../Services/allAPI";
import Home from "./Home";
import Dropdown from "react-bootstrap/Dropdown";

function Create() {
  const [deleteResponse, setDeleteResponse] = useState("");
  const [forceRender, setForceRender] = useState(false);
  const [allDetails, setAllDetails] = useState([]);
  const [empDetails, setEmpDetails] = useState({
    empId: "",
    empName: "",
    empEmail: "",
    empStatus: "",
  });
  const [show, setShow] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    getAllDetails();
  }, [forceRender, deleteResponse]);

  const handleUpload = async () => {
    const { empId, empName, empEmail, empStatus } = empDetails;
    if (empId && empName && empEmail && empStatus) {
      try {
        const result = editingItem
          ? await updateDetailsAPI(editingItem.id, empDetails)
          : await addDetailsAPI(empDetails);
        if (result.status >= 200 && result.status < 300) {
          handleClose();
          setForceRender((prev) => !prev);
        } else {
          alert(editingItem ? "Update failed" : "Upload failed");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Please Fill the Form Completely");
    }
  };

  const handleClose = () => {
    setShow(false);
    setEmpDetails({
      empId: "",
      empName: "",
      empEmail: "",
      empStatus: "",
    });
    setEditingItem(null);
  };

  const handleShow = () => setShow(true);

  const getAllDetails = async () => {
    try {
      const result = await getAllDetailsAPI();
      if (result.status >= 200 && result.status < 300) {
        setAllDetails(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (item) => {
    handleShow();
    setEditingItem(item);
    setEmpDetails(item);
  };

  const handleStatusSelect = (status) => {
    setEmpDetails({ ...empDetails, empStatus: status });
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-center my-5">
        <h2 className="me-3">Employee Details</h2>
        <button
          onClick={handleShow}
          className="btn btn-warning text-light fw-bolder shadow"
        >
          Add
        </button>
      </div>
      <div className="box-head-container">
        <div className="box-head one fw-bolder">ID</div>
        <div className="box-head two fw-bolder">Name</div>
        <div className="box-head three fw-bolder">Email</div>
        <div className="box-head four fw-bolder">Status</div>
        <div className="box-head five fw-bolder "></div>
      </div>
      
      <div>
       { allDetails?.length >0 ?
       (allDetails?.map((details) => (
          <div key={details.id}>
            <Home
              displayData={details}
              setDeleteResponse={setDeleteResponse}
              onEdit={handleEdit}
            />
          </div>
        ))):(
          <div className="text-center fw-bolder text-danger ">
           <h2 className="mt-5"> Nothing to Display</h2>
          </div>
        )}
      </div>
      <Modal show={show} onHide={handleClose} className="modal">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingItem ? "Edit Employee Details" : "Add Employee Details"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          <div className="row">
            <input
              value={empDetails.empId}
              onChange={(e) =>
                setEmpDetails({ ...empDetails, empId: e.target.value })
              }
              type="text"
              placeholder="Employee Id"
              className="empAdd-input"
            />
            <input
              value={empDetails.empName}
              onChange={(e) =>
                setEmpDetails({ ...empDetails, empName: e.target.value })
              }
              type="text"
              placeholder="Employee Name"
              className="empAdd-input mt-4"
            />
            <input
              value={empDetails.empEmail}
              onChange={(e) =>
                setEmpDetails({ ...empDetails, empEmail: e.target.value })
              }
              type="text"
              placeholder="Employee Email"
              className="empAdd-input mt-4"
            />
            <Dropdown className="dropdown-add" onSelect={handleStatusSelect}>
              <Dropdown.Toggle
                variant=""
                className="border w-100 mt-2"
                id="dropdown-basic"
              >
                {empDetails.empStatus
                  ? empDetails.empStatus
                  : "Employee Status"}
              </Dropdown.Toggle>
              <Dropdown.Menu className="w-50 text-center ">
                <Dropdown.Item eventKey="Active" className="text-success">Active</Dropdown.Item>
                <Dropdown.Item eventKey="Inactive" className="text-danger">Inactive</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpload}>
            {editingItem ? "Update" : "Upload"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Create;