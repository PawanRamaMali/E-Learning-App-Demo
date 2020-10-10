import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch } from 'react-redux'
import { useTable, useSortBy } from 'react-table'
import "../instructor.css";

export default function AdminStudentTable(props) {
  const { allStudents } = props;

  return (

    <div>
    {allStudents ? (
      allStudents.map((student) => (
        <Table key={student.id}>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Activate</th>
              <th>Deactivate</th>
              <th>Delete</th>
              <th>Active</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{student["first_name"]}</td>
              <td>{student["last_name"]}</td>
              <td>{student["email"]}</td>
              <td>
                <Button variant="success" value={student.active} onClick={props.handleActivate(student.id)}>Activate</Button>
              </td>
              <td>
                <Button variant="secondary" value={student.active} onClick={props.handleDeactivate(student.id)}>Deactivate</Button>
              </td>
              <td>
                <Button id={ student.id } onClick={props.handleDelete(student.id)} variant="danger">Delete</Button>
              </td>
              <td>{student.active}</td>
              <td>{student.id}</td>
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