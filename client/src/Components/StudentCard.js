import React, {useState} from 'react';
import {Card, Button, Image} from "react-bootstrap";
import "../instructor.css";
import $ from "jquery";

export default function StudentCard(props) {
// const [user, setUser] = useState({
//     data: data,

// })

   const randomUser = function() {
        $.ajax({
            url: 'https://randomuser.me/api/',
            dataType: 'json',
            success: function(data) {
                console.log(data);
            }
        });
   }


    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <div className="student-card-content">
                    <Image className="student-card-image"src="https://randomuser.me/api/portraits/women/89.jpg" roundedCircle></Image>
                    <div className="list-group-flush">
                        <div>Name: {props.firstName}{props.lastName}</div>
                        <div>Email: {props.email}</div>
                    </div>
                    <Card.Body>
                        <Button className="primary-button" href="#">Edit</Button>
                        <Button className="homepage-button" variant="danger" href="#">Delete Student</Button>
                    </Card.Body>
                </div>
            </Card>
        </div>
    )
}