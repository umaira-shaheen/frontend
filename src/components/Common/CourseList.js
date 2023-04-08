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
  
const CourseList = (args) => {
    const toggle = () => setModal(!modal);
    const [modal, setModal] = useState(false);
    return(
        <>

 <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Courses</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      onClick={toggle}
                      size="md"
                    >
                      Add new Course
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              {/* <CardHeader className="border-0">
                <h3 className="mb-0">Courses</h3>
               
              </CardHeader> */}
              <Table className="align-items-center table-flush" responsive>
               {/* AllCourses.map(function(item, i){
                  console.log('test');
                  return <li key={i}>Test</li>
                }) */}
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Course title</th>
                    <th scope="col">Course Code</th>
                    <th scope="col">Start date</th>
                    <th scope="col">End date</th>
                    <th scope="col">Category</th>
                    <th scope="col">Action</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>

                { args.courses ?
                  args.courses.map((row, index) => {
                  return(
                  <tr key={index}>
                    <th scope="row">
                      {/* <i className="ni ni-book-bookmark text-blue"/> */}
                      <span className="mb-0 text-sm">
                        {row.Course_title}
                      </span>

                    </th>
                    <td>{row.Course_code}</td>
                    <td>
                      <Badge color="" className="badge-dot">
                        <i className="bg-info" />
                        {moment(row.start_date).format('DD-MM-YYYY')}
                      
                      </Badge>
                    </td>
                    <td>
                      <Badge color="" className="badge-dot">
                        <i className="bg-info" />
                        {moment(row.end_date).format('DD-MM-YYYY')}
                      </Badge>
                    </td>
                    <td>{row.Course_category}</td>
                    <td>
                      <Button color="primary"   onClick={() => {FindCourse(row._id)}}>
                      <i className="ni ni-active-40"></i>
                      </Button>
                      <Button color="danger" onClick={() => {Deletetoggle(row._id,row.Course_title)}}>
                        <i className="ni ni-fat-remove"></i>
                      </Button>
                    </td>

                  </tr> )
                  })
                  :
                  <tr>
                    <td span="5">No course found!</td>
                  </tr>
                }
                </tbody>
              </Table>

            </Card>
          </div>
        </Row>
      
        </>
    )
}
export default CourseList;