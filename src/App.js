import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react'
import { Nav, Navbar, NavDropdown, Form, FormControl, Button, Tab, Row, Col, Container } from 'react-bootstrap';
import './App.css';




function App() {
  const [repos, setRepos] = useState([])
  const [searchTerm, setSearchTerm] = useState(``)
  console.log(searchTerm)

  const onSearchCoderHub = async (e) => {
    e.preventDefault()
    console.log("onSearchCoderHub")
    const response = await fetch(`https://api.github.com/search/repositories?q=${searchTerm}`)
    const json = await response.json()
    console.log({ json })
    setRepos(json.items)
  }






  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline onSubmit={onSearchCoderHub}>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={(e) => setSearchTerm(e.target.value)} />
            <Button variant="outline-success" onClick={onSearchCoderHub}>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>


      <Container className="mt-3 p-e border">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">Repo</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">User</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  {repos.map(r => {
                    return (
                      <div>
                        <h1>{r.full_name}</h1>
                      </div>
                    )
                  })}
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  User
            </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </div>
  );
}

export default App;
