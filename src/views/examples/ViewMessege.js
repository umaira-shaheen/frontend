import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NewHeader from 'components/Headers/NewHeader';
import {
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardFooter,
    Table,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Badge,
    Button,
    Alert,
    UncontrolledDropdown,
    UncontrolledTooltip,
    Progress,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Modal, ModalHeader, ModalBody, ModalFooter,
    FormGroup,
    Form,
    Input,
    Label
} from "reactstrap";
const ViewMessege=()=>{
    var moment = require('moment');
    const [messegetable, setMessegetable] = useState("");
    const [rerender, setRerender] = useState(false);

    useEffect(() => {
        GetMessege();
    }, []);
    function GetMessege(e) {
        axios({
            method: 'get',
            withCredentials: true,
            url: "http://localhost:8000/Messege/GetMessege",
        })
            .then(res => {
                if (res.data) {
                    setMessegetable(res.data)
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
return(
    <>
      <NewHeader/>
      <Container className="mt--7" fluid>
      <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                            <h2 className="display-8" style={{ textAlign: 'center' }}>Messege Box</h2>

                                <Row className="align-items-center">
                                </Row>
                            </CardHeader>
                           
                            <Table className="align-items-center table-flush " responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Phonenumber</th>

                                        <th scope="col">Date</th>
                                        <th scope="col">Subject</th>
                                        <th scope="col">Messege</th>
                                       
                                        <th scope="col" />
                                    </tr>
                                </thead>
                                <tbody>

                                    {messegetable ?
                                        messegetable.map((row, index) => {
                                            return (
                                                <tr key={index}>
                                                    <th scope="row">
                                                        {/* <i className="ni ni-book-bookmark text-blue"/> */}
                                                        <span className="mb-0 text-sm">
                                                            {row.Name}
                                                        </span>

                                                    </th>

                                                   
                                                    <td>{row.Email}</td>
                                                    <td>{row.PhoneNumber}</td>
                                                    <td>
                                                        <Badge color="" className="badge-dot">
                                                            <i className="bg-info" />
                                                            {moment(row.createdAt).format('DD-MM-YYYY')}
                                                        </Badge>
                                                    </td>
                                                    <td>{row.Subject}</td>
                                                    <td>{row.Messege}</td>
                                                   


                                                </tr>)
                                        })
                                        :
                                        <tr>
                                            <td span="5">No Reviews Given Yet!</td>
                                        </tr>
                                    }
                                </tbody>
                            </Table>

                        </Card>
                    </div>
                </Row>
        </Container>
    </>
)
}
export default ViewMessege;