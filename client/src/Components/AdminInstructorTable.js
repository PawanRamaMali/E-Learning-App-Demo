import React, { useState } from 'react'
import { Table } from "react-bootstrap";
import "../instructor.css";

export default function AdminInstructorTable() {

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