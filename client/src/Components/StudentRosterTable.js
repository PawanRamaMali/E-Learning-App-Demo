import React, {useState} from 'react'
import { Table } from "react-bootstrap"
import "../instructor.css";

export default function StudentRosterTable() {
    const [studentList, setStudent] = useState();

    return (
        <Table className="table-expand">
            <thead>
                <tr className="table-expand-row">
                    <th >Course Name</th>
                    <th >First Name</th>
                    <th >Last Name</th>
                    <th >Email Address</th>
                    <th ></th>
                </tr>
            </thead>
            <tbody id="emptyTable"></tbody>
        </Table>
    )
}