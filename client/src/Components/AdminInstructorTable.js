import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from "react-bootstrap";
import "../instructor.css";
import { getAllInstructors } from '../actions'

export default function AdminInstructorTable() {
  const [instructorList, setInstructor] = useState();

  const dispatch = useDispatch()

  const [allInstructors, error, authObj] = useSelector((gState) => [
    gState.allInstructors,
    gState.error,
    gState.authObj
  ])

  useEffect(() => {
    dispatch(getAllInstructors(authObj.accessToken))
  }, [])

  console.log(allInstructors)
  console.log(allInstructors.data)

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