import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux'
import { deleteInstructor } from '../actions'
import "../instructor.css";

export default function AdminInstructorTable(props) {
  const { allInstructors } = props;
  console.log(allInstructors);

  const dispatch = useDispatch()

  function handelDelete(id) {
    dispatch(deleteInstructor(id))
  }


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
              <th>Date Created</th>
              <th>Activate</th>
              <th>Deactivate</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{instructor["first_name"]}</td>
              <td>{instructor["last_name"]}</td>
              <td>{instructor["email"]}</td>
              <td>{instructor["createdAt"]}</td>
              <td>
                <Button>Activate</Button>
              </td>
              <td>
                <Button>Deactivate</Button>
              </td>
              <td>
                <Button id={ instructor.id } onClick={() => handelDelete(instructor.id)}>Delete</Button>
              </td>
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