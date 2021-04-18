import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react'
import { Nav, Tab, Row, Col, Container, Card } from 'react-bootstrap';
import React from 'react';

import MarkdownRenderer from 'react-markdown-renderer';
import NavigationBar from './components/NavigationBar'
import PaginationBar from './components/PaginationBar'
import RepoTab from './components/RepoTab'
import './App.css';



function App() {

  const [pageNumber, setPageNumber] = useState(0)
  const [readMe, setReadme] = useState(``)
  const [repos, setRepos] = useState([])
  const [users, setUsers] = useState([])
  const [issues, setIssues] = useState([])
  const [searchTerm, setSearchTerm] = useState(``)
  console.log(searchTerm)

  const onSearchCoderHub = async (e) => {
    e.preventDefault()
    onSearchRepo()
    onSearchUsers()
    onSearchIssues()
  }

  const onSearchRepo = async () => {
    const searchPage = pageNumber + 1
    console.log("onSearchCoderHub")
    const response = await fetch(`https://api.github.com/search/repositories?q=${searchTerm}&page=${searchPage}`)
    const json = await response.json()
    console.log({ json })
    setRepos(json.items)
    setPageNumber(searchPage)
  }

  const onSearchUsers = async () => {
    const searchPage = pageNumber + 1
    const response = await fetch(`https://api.github.com/search/users?q=${searchTerm}&page=${searchPage}`)
    const json = await response.json()
    console.log({ json })
    setUsers(json.items)
  }

  const onSearchIssues = async () => {
    const searchPage = pageNumber + 1
    const response = await fetch(`https://api.github.com/search/issues?q=${searchTerm}&page=${searchPage}`)
    const json = await response.json()
    console.log({ json })
    setIssues(json.items)
  }

  const fetchReadme = async () => {
    const url = `https://api.github.com/repos${window.location.pathname}/readme`
    const response = await fetch(url);
    const json = await response.json()
    const decodeBase64 = atob(json.content)
    console.log(json.content)
    setReadme(decodeBase64)

  }

  // const fetchUser = async () => {
  //   const url = `https://api.github.com/users${window.location.pathname}`
  //   const response = await fetch(url);
  //   const json = await response.json()
  //   const decodeBase64 = atob(json.content)
  //   console.log(json.content)
  //   setReadme(decodeBase64)

  // }

  useEffect(() => {
    if (window.location.pathname.length > 1) fetchReadme()
  }, [])


  console.log({ window: window.location.pathname });


  return (
    <div className="App">
      <NavigationBar
        onSearchCoderHub={onSearchCoderHub}
        setSearchTerm={setSearchTerm}
      />


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
                <Nav.Item>
                  <Nav.Link eventKey="third">Issue</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>

            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  {readMe && <MarkdownRenderer markdown={readMe} />}
                  <RepoTab repos={repos} />
                  <PaginationBar
                    pageNumber={pageNumber}
                    onSearchCoderHub={onSearchCoderHub} />
                </Tab.Pane>

                <Tab.Pane eventKey="second">
                  <h1>User</h1>
                  {users.map(u => {
                    return (
                      <Card class="border mb-2">
                        <Card.Body>
                          <Card.Title>
                            <a href={u.login}>{u.login}</a>

                          </Card.Title>
                        </Card.Body>
                      </Card>
                    )
                  })}
                </Tab.Pane>

                <Tab.Pane eventKey="third">
                  <h1>Issues</h1>
                  {issues.map(i => {
                    console.log(i)
                    return (
                      <Card class="border mb-2">
                        <Card.Body>
                          <Card.Subtitle class="mb-2"> {i.repository_url} #{i.number} </Card.Subtitle>
                          <Card.Title>
                            <a href={i.title}>{i.title}</a>
                            <a href={i.labels.name}>{i.labels.name}</a>
                          </Card.Title>

                          <Card.Text>
                            {i.body}
                            <MarkdownRenderer markdown={readMe} />
                          </Card.Text>
                          <Card.Link href="#">{i.user.login} opened {<Moment format="fromNow ago">{i.updated_at}</Moment>}</Card.Link>

                        </Card.Body>
                      </Card>
                    )
                  })}
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
