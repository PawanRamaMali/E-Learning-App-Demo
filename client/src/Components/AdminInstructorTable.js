import React from "react";
import { Table, Button } from "react-bootstrap";
// import { useDispatch, useSelector } from 'react-redux';
import "../instructor.css";

export default function AdminInstructorTable(props) {
  const { allInstructors } = props;

  return (

    <div>
    {allInstructors ? (
      allInstructors.map((instructor) => (
        <Table key={instructor.id}>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Activate</th>
              <th>Deactivate</th>
              <th>Delete</th>
              <th>Activated</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{instructor["first_name"]}</td>
              <td>{instructor["last_name"]}</td>
              <td>{instructor["email"]}</td>
              <td>
                <Button variant="success" value={instructor.active} onClick={props.handleActivate(instructor.id)}>Activate</Button>
              </td>
              <td>
                <Button variant="secondary" value={instructor.active} onClick={props.handleDeactivate(instructor.id)}>Deactivate</Button>
              </td>
              <td>
                <Button id={ instructor.id } onClick={props.handleDelete(instructor.id)} variant="danger">Delete</Button>
              </td>
              <td>{instructor.active}</td>
              <td>{instructor.id}</td>
            </tr>
          </tbody>
        </Table>
      ))
    ) : (
      <p></p>
    )}
  </div>
  );
}