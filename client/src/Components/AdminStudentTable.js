import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux'
import { deleteStudent } from '../actions'
import "../instructor.css";


export default function AdminStudentTable(props) {
  const { allStudents } = props;
  console.log(allStudents);

  const dispatch = useDispatch()

  function handelDelete(id) {
    dispatch(deleteStudent(id))
  }


  return (

    <div>
    {allStudents ? (
      allStudents.map((student) => (
        <Table key={student.id} id="myTable">
          <input type="text" id="myInput" onkeyup="myFunction()" placeholder="Search for names.."></input>
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
              <td>{student["first_name"]}</td>
              <td>{student["last_name"]}</td>
              <td>{student["email"]}</td>
              <td>{student["createdAt"]}</td>
              <td>
                <Button>Activate</Button>
              </td>
              <td>
                <Button>Deactivate</Button>
              </td>
              <td>
                <Button id={ student.id } onClick={() => handelDelete(student.id)}>Delete</Button>
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

function myFunction() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  // loop through table rows and hide those that do not match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
