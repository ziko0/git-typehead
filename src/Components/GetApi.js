import React, { useState } from 'react';
import { Button, Form, Card, Container, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './component.css';


function GetApi() {

 

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [visitProfile, setVisitProfile] = useState('');
    const [userInput, setUserInput] = useState('');
    // const [error, setError] = useState(null);




    const setData = ({ login, avatar_url, html_url }) => {
        setName(login);
        setAvatar(avatar_url);
        setVisitProfile(html_url);
    };

    
    const handleSearch = (e) => {
        setUserInput(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
            fetch(`https://api.github.com/users/${userInput}`)
            .then((response) => {
                if (response.ok) {
                  return response.json();
                } else {
                  throw new Error('Something went wrong');
                }
              })
            .then(data => {
               setData(data);
            })
        
            

        
    }

    return(
        <div>
            <Container className='mt-5'>
            <Row>
                <Col>
                    <div className='search'>
                        <Form onSubmit={handleSubmit} > 
                            <Form.Group className="mb-3"  >
                                <Form.Control className='search-field' type="text" placeholder="Just enter Username and wait"  onChange={handleSearch}/>
                                <Button variant="primary" type='submit' className='visit-btn'>Search</Button>
                            </Form.Group>  
                        </Form>
                    </div>
                </Col>
                
            </Row>
            {/* card */}
            <Row>
                <Col>
                    {userInput && <div className='user d-flex justify-content-center mt-2'>
                       <Card style={{ width: '18rem' }} className='info-card'>
                            <Card.Img variant="top" src={avatar} />
                            <Card.Body>
                                <Card.Title>UserName:  {name}</Card.Title>
                                <Button variant="primary" href={visitProfile} target='_blank' className='visit-btn'>Go on Profile</Button>
                            </Card.Body>
                        </Card>
                </div>}
                </Col>
            </Row>
            </Container>

          
        </div>
    )
}

export default GetApi;