import React, { useState } from 'react';
import { Button,  Card, Container, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './component.css';


function GetApi() {

 

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [visitProfile, setVisitProfile] = useState('');
    const [userInput, setUserInput] = useState('');
  




    const setData = ({ login, avatar_url, html_url }) => {
        setName(login);
        setAvatar(avatar_url);
        setVisitProfile(html_url);
    };

//     handleSearch to get typed info from input
 
    const handleSearch = (e) => {
        setUserInput(e.target.value);
    }

//     handleSbumit to fetch data after submitting form 
    
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
            <header>Search Github User's</header>
            <Container className='mt-5'>
            <Row>
                <Col>
                    <div className='search'>
                        <form onSubmit={handleSubmit} > 
                                <input type='text' className='search-field'  placeholder="Github: Username"  onChange={handleSearch} />
                                <Button variant="primary" type='submit' className='search-btn btn'>Search</Button>
                           
                        </form>
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
                                <Button variant="primary" href={visitProfile} target='_blank' className='visit-btn btn'>Go on Profile</Button>
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
