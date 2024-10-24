import React, { useState } from 'react';
import { Button, Form, Table, Container, Row, Col } from 'react-bootstrap';
import './App.css'; // Import CSS
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [students, setStudents] = useState([
    { name: 'Nguyen Tran Quang Nhat', code: 'QE180014', active: true },
    { name: 'Hoang Le Quy An', code: 'QE180045', active: false },
  ]);
  const [newStudent, setNewStudent] = useState({ name: '', code: '', active: false });
  const [selectedCount, setSelectedCount] = useState(0);

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.code) {
      setStudents([newStudent, ...students]);
      setNewStudent({ name: '', code: '', active: false });
    }
  };

  const handleDeleteStudent = (index) => {
    const updatedList = students.filter((_, i) => i !== index);
    setStudents(updatedList);
  };

  const handleSelectStudent = (e) => {
    setSelectedCount(e.target.checked ? selectedCount + 1 : selectedCount - 1);
  };

  const handleClearAll = () => {
    setStudents([]);
    setSelectedCount(0);
  };

  return (
    <Container>
      <div className="total-selected">
        <h4>Total Selected Student: {selectedCount}</h4>
        <Button variant="primary" onClick={handleClearAll}>
          Clear
        </Button>
      </div>

      <Form className="mt-3">
        <Row>
          <Col md={4}>
            <Form.Control
              placeholder="Student Name"
              value={newStudent.name}
              onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            />
          </Col>
          <Col md={4}>
            <Form.Control
              placeholder="Student Code"
              value={newStudent.code}
              onChange={(e) => setNewStudent({ ...newStudent, code: e.target.value })}
            />
          </Col>
          <Col md={2}>
            <Form.Check
              type="checkbox"
              label="Still Active"
              checked={newStudent.active}
              onChange={(e) => setNewStudent({ ...newStudent, active: e.target.checked })}
            />
          </Col>
          <Col md={2}>
            <Button variant="primary" onClick={handleAddStudent}>
              Add
            </Button>
          </Col>
        </Row>
      </Form>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Select</th>
            <th>Student Name</th>
            <th>Student Code</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>
                <Form.Check type="checkbox" onChange={handleSelectStudent} />
              </td>
              <td>{student.name}</td>
              <td>{student.code}</td>
              <td>
                <span
                  className={`btn-status ${
                    student.active ? 'active-status' : 'inactive-status'
                  }`}
                >
                  {student.active ? 'Active' : 'In-active'}
                </span>
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteStudent(index)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default App;
