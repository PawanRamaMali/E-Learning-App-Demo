import React, {useState} from 'react';
import { Table, Button } from "react-bootstrap";
import UpdateStudentModal from './UpdateStudentModal';
import "../instructor.css";

export default function StudentRosterTable( props ) {
    const { stuRoster } = props;
    const [updateStudentModal, setUpdateStudentModal] = useState(false);
    
    const renderRows = () => {
        return stuRoster.map((student, id) =>{
            return(
                <>
                    {student.Users.map(user =>
                    <tr key={id}>
                    <td>{student.course_name}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.email}</td>
                    <td>
                        <Button className="InsBtn AddStu primary-button" onClick={() => {setUpdateStudentModal(true)}}>Update</Button>
                        <Button variant="danger" id="delButton">Delete</Button>
                    </td>
                    </tr>
                    )}
                </>
            )
        })
    }

    return (
        < >
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
                <tbody id="emptyTable">
                {renderRows()}
                </tbody>
            </Table>
            <UpdateStudentModal show={updateStudentModal} onHide={() => setUpdateStudentModal(false)} />
        </>
    )
            
}