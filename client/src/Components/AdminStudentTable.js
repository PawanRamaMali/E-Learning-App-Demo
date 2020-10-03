import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from "react-bootstrap";
import "../instructor.css";
import { getAllStudents } from '../actions'

export default function AdminStudentTable() {
  const [studentList, setStudent] = useState();

  const dispatch = useDispatch()

  const [allStudents, error, authObj] = useSelector((gState) => [
    gState.allStudents,
    gState.error,
    gState.authObj
  ])

  useEffect(() => {
    dispatch(getAllStudents(authObj.accessToken))
  }, [])

  console.log(allStudents)
  console.log(allStudents.data)

  return (
    <Table className="table-expand">
      <thead>
        <tr className="table-expand-row">
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Active</th>
          <th>ID</th>
          <th></th>
        </tr>
      </thead>
      <tbody id="emptyTable"></tbody>
    </Table>
  );
}
