import React, { Component } from "react";
import "../../components/SideNav/SideNav.css"
//import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import {List, ListItem} from "../../components/List";
import { FormBtn } from "../../components/Form";
import { Row, Col, Navbar, NavItem, SideNav, SideNavItem, Modal, Collapsible, CollapsibleItem, Collection, CollectionItem, Input, Button, Table, Chip} from 'react-materialize';
import Geocode from "react-geocode";
import SimpleMap from "../../components/GoogleMaps/google-maps"

class Games extends Component {
  // Setting our component's initial state
  state = {
    games: [],
    title: "",
    sport: "",
    authorEmail: "",
    author: "",
    authorId: "",
    playerNumber: "",
    date: "",
    time: "",
    gender: "",
    city: "",
    state: "",
    description: "",
    emailToWho: "",
    players: [],
    userImage: this.props.userImage,
    userID: this.props.userID,
  };

  //When the component mounts, load all books and save them to this.state.books
  componentDidMount() {
    this.loadGames();
    this.loadUser(this.state.userID);
    Geocode.setApiKey("AIzaSyBFxBvSfL6-CmTt4k6mtU03hLHt9OJgHuI");
  }

  // Loads all books and sets them to this.state.games
  loadGames = () => {
    API.getGames()
      .then(res =>
          this.setState({
            games: res.data,
            title: "",
            sport: "",
            playerNumber: "",
            date: "",
            time: "",
            gender: "",
            city: "",
            state: "",
            description: ""
          })
        )
      .catch(err => console.log(err));
  };


  // Loads all books  and sets them to this.state.books
  loadUser = id => {
    API.getUser(id)
      .then(res =>
        this.setState({
          author: res.data.name,
          authorEmail: res.data.email
        })
      )

      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  deleteGame = id => {
    console.log("deleteGame firing in Games.js client")
    API.deleteGame(id)
      .then(res => this.loadGames())
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  updateGame = (id, userData) => {
    console.log("Player added to game")
    this.setState({
      inGame: true
    })
    API.updateGame(id, userData)
      .then(res => this.loadGames())
      .catch(err => console.log(err.response));
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  
  // Handles updating component state when the user types into the input field
  handleButtonClick = e => {
    console.log(e)
  };

  geocode = (city, state) => {
    return Geocode.fromAddress(`${city}, ${state}`);
}

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      this.geocode(this.state.city, this.state.state)
        .then(res => {
          let { lat, lng } = res.results[0].geometry.location;
          API.saveGame({
            title: this.state.title,
            author: this.state.author,
            sport: this.state.sport,
            playerNumber: this.state.playerNumber,
            date: this.state.date,
            time: this.state.time,
            gender: this.state.gender,
            lat: lat,
            lng: lng,
            description: this.state.description,
            authorEmail: this.state.authorEmail,
            authorId: this.state.userID,
            authorPhoto: this.state.userImage,
          })
        .then(res => this.loadGames())
        .catch(err => console.log(err));
      })
    }
  };

  sendMail = (emailToWho) => {
    console.log("sendMail hit on games.js")
    API.sendMail({
      emailToWho: emailToWho,
      emailMessageContent: this.state.emailMessageContent,
      emailFromWhoName: this.state.author,
      emailFromWhoEmail: this.state.authorEmail
    }).then(
      this.setState({
        emailMessageContent: "",
        emailToWho: "",
      })
    )
  }

  
  render() {
    return (

      <Row>
        <Col s={8} offset='s4'>
          <Navbar className="cyan darken-3 center">
            <h4>WePlay</h4>
            <NavItem>
            </NavItem>
          </Navbar>
        


          <h3 className="center">Current Games</h3>

          {this.state.games.length ? (
            <List> 
              {this.state.games.map(game => {
                
                
                let inGame = ["null"];
                if(game.players) {
                  game.players.map(element => {
                  // console.log("userID: ", this.state.userID)
                  // console.log("element.email: ", element.email)
                  console.log("=======")
                  if(this.state.userID == element.email) {
                      // console.log("true: ", game._id)
                      inGame[0] = game._id
                    } 
                  })
                }


                // console.log("inGame: ", inGame[0])
                // console.log("game._id: ", game._id)
                  
                return (
                    <ListItem key={game._id}>
                    
                    <div className="center">
                        <h5><strong>
                          {game.title} by {game.author}
                        </strong>
                        </h5>
                    </div>

                    <div className="center description">
                      <h6>Description:</h6>
                      <p id='gameDescription'>{game.description}</p>
                    </div>
                      
                      <Table className='center gameInfo'>
                        <thead>
                          <tr>
                            <th data-field="id" className='center'>Sport</th>
                            <th data-field="name" className='center'>Date</th>
                            <th data-field="name" className='center'>Time</th>
                            <th data-field="price" className='center'>Male | Female | Co-Ed</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <td className='center'>{game.sport}</td>
                            <td className='center'>{game.date}</td>
                            <td className='center'>{game.time} </td>
                            <td className='center'>{game.gender}</td>
                          </tr>
                        </tbody>
                      </Table>

                      <Row className='center icons'>
                        <Col s={3}>
                          <Modal
                              header='Attendees'
                              trigger={<i className="material-icons">people</i>}>
                              <Row>
                                <Col s={12}>
                                
                                {/* creates author chip in attendees section */}
                                  <Chip>
                                    <img src={game.authorPhoto} alt='UserImage' />
                                    {game.author}
                                  </Chip>
                                  
                                  {/* creates chips for players if there are players added to game */}

                                  {game.players ? game.players.map(element => {
                                    return(
                                      <Chip>
                                        <img src={element.photo} alt='UserImage' />
                                        {element.email}
                                      </Chip>
                                      )
                                  }) : console.log('You have no players')}

                                </Col>
                              </Row>
                            </Modal>
                          <p>{game.playerNumber} spots left!</p>
                        </Col>
                        <Col s={3}>
                          <Modal
                              header='Location'
                              trigger={<i className="material-icons">location_on</i>}>
                              <div className='container'>
                                <Row>
                                  <SimpleMap lat={game.lat} lng={game.lng}></SimpleMap>
                                </Row>
                              </div>
                            </Modal>
                          <p>Location</p>
                        </Col>
                        <Col s={3}>
                        <Modal
                          header='Contact Event Author'
                          trigger={<i className="material-icons">email</i>}>
                          <Row>
                            <Row>
                              <Input
                                s={6}
                                label={"From: " + this.state.author}
                                value={this.state.authorEmail}
                                onChange={this.handleInputChange}
                                name="authorEmail"
                                placeholder={this.state.authorEmail}
                                disabled
                              />
                              <Input
                                s={6}
                                label={"To: " + game.author}
                                value={game.authorEmail}
                                onChange={this.handleInputChange}
                                name="emailToWho"
                                placeholder={game.authorEmail}
                                disabled
                              />

                            </Row>
                            <Row>
                              <Input
                                s={12}
                                label="Message"
                                value={this.state.emailMessageContent}
                                onChange={this.handleInputChange}
                                name="emailMessageContent"
                                placeholder="So excited for the volleyball game. Where is the exact location?"
                                type='textarea'
                              />
                            </Row>
                            <Row className='center'>
                              <Button className="modal-close" onClick={() => this.sendMail(game.authorEmail)}>Send</Button>

                            </Row>
                          </Row>
                        </Modal>
                        <p>Contact</p>
                      </Col>
                      <Col s={3}>
                        <Modal
                          header='Share'
                          trigger={<i className="material-icons">share</i>}>
                          <Row>
                            <Row>
                              <Input
                                s={6}
                                label={"From: " + this.state.author}
                                value={this.state.authorEmail}
                                onChange={this.handleInputChange}
                                name="authorEmail"
                                placeholder={this.state.authorEmail}
                                disabled
                              />
                              <Input
                                placeholder="JohnDoe@email.com"
                                s={6}
                                label="To:"
                                name="emailToWho"
                                onChange={this.handleInputChange}
                                value={this.state.emailToWho}
                                 />
                            </Row>
                            <Row>
                              <Input
                                s={12}
                                label="Message"
                                value={this.state.emailMessageContent}
                                onChange={this.handleInputChange}
                                name="emailMessageContent"
                                placeholder="Hey! Check out this game I found on WePlay!"
                                type='textarea'
                              />
                            </Row>
                            <Row className='center'>
                              <Button className="modal-close" onClick={() => this.sendMail(this.state.emailToWho)}>Share</Button>
                            </Row>
                            </Row>
                          </Modal>
                          
                          <p>Share</p>
                        </Col>
                        
                      </Row>

                      <Row className='center joinBtn'>
                      <Button waves='light' id={game._id} disabled={game._id === inGame[0] ? true : game.playerNumber === 0 ? true : false} 
                        onClick={() => this.updateGame(game._id, {email: this.props.userID, photo:this.props.userImage})}
                        >
                          Join!
                        </Button>
                      </Row>
                    </ListItem>
                );
              })}
            </List>
          ) : (
              <h5 className="center">No Results to Display</h5>
            )}
        </Col>
        <Col s={8}>
          <SideNav>
            {/* USER SIDENAV SECTION */}
            <SideNavItem
              userView
              className="cyan darken-3"
              user={{
                image: this.state.userImage,
                name: this.state.author,
                email: this.state.authorEmail
              }}
            />

            {/* NEW GAME BUTTON MODAL POPUP */}
            <SideNavItem>
              <Modal
                header="Create New Game"
                //fixedFooter
                //bottomSheet
                trigger={
                  <SideNavItem className="center">
                    <Button className="cyan darken-3">Create Game</Button>
                   
                  </SideNavItem>
                }
              >
                <Row>
                  <Input
                    s={4}
                    value={this.state.author}
                    onChange={this.handleChange}
                    name="author"
                    placeholder="Player Name *"
                  />
                  <Input
                    s={8}
                    value={this.state.authorEmail}
                    onChange={this.handleChange}
                    name="authorEmail"
                    placeholder="Player Email *"
                  />
                  <Input
                    s={12}
                    value={this.state.title}
                    onChange={this.handleInputChange}
                    name="title"
                    placeholder="Event Title *"
                  />
                  <Input
                    s={2}
                    value={this.state.sport}
                    onChange={this.handleInputChange}
                    name="sport"
                    placeholder="Sport *"
                  />

                  <Input
                    s={3}
                    offset="s8"
                    value={this.state.playerNumber}
                    onChange={this.handleInputChange}
                    name="playerNumber"
                    placeholder="Number of Players"
                    type="number"
                  />
                  
                   <Input
                      s={2}
                onChange={this.handleInputChange}
                defaultChecked
                name="gender"
                type="checkbox"
                // defaultValue="coed"
                // value={this.state.gender}
                label="Co-Ed"

              />
              <Input
              onChange={this.handleInputChange}
              s={2}
                name="gender"
                type="checkbox"
                // defaultValue="male"
                // value={this.state.gender}
                label="Male Only"
              />
              <Row>
              <Input
                onChange={this.handleInputChange}
                s={3}
                name="gender"
                type="checkbox"
                // defaultValue="female"
                //value={this.state.gender}
                label="Female Only"
              />
              
              </Row>
                  <Input
                    className="center"
                    s={4}
                    offset="s10"
                    value={this.state.date}
                    onChange={this.handleInputChange}
                    name="date"
                    placeholder="Date *"
                    type="date"
                  />
                  <Input
                    className="center"
                    s={3}
                    offset="s10"
                    value={this.state.time}
                    onChange={this.handleInputChange}
                    name="time"
                    placeholder="Time"
                    type="time"
                  />

                  <Input
                    className="center"
                    s={3}
                    offset="s8"
                    value={this.state.city}
                    onChange={this.handleInputChange}
                    name="city"
                    placeholder="City *"
                  />
                  <Row>
                    <Input
                      className="center"
                      s={2}
                      offset="s8"
                      value={this.state.state}
                      onChange={this.handleInputChange}
                      name="state"
                      placeholder="State *"
                    />
                  </Row>
                  <Row>
                    <Input
                      className="center"
                      s={12}
                      value={this.state.description}
                      onChange={this.handleInputChange}
                      name="description"
                      placeholder="Let other players know more about your game! (Optional)"
                      type="textarea"
                    />
                  </Row>
                  <Row>
                    <FormBtn
                      className="center"
                      disabled={!(this.state.author && this.state.authorEmail && this.state.title && this.state.sport && this.state.state && this.state.city )}
                      onClick={this.handleFormSubmit}
                    >
                      Create
                    </FormBtn>
                  </Row>
                </Row> </Modal>
            </SideNavItem>

            <SideNavItem className="center" subheader>
              Filter Current Games
            </SideNavItem>
            {/* FILTER DATE */}
            <SideNavItem>
              <Input
                s={12}
                label="Date"
                name="on"
                type="date"
                onChange={function(e, value) {}}
              />
            </SideNavItem>

            {/* FILTER SPORT-AUTOPOPULATE FROM DB */}
            <SideNavItem>
              <Row>
                <Input s={12} type="select" label="Select Sport">
                  {this.state.games.map(game => {
                    return <option value={game.sport}>{game.sport}</option>;
                  })}
                </Input>
              </Row>
            </SideNavItem>
            {/* FILTER LOCATION- AUTOPOPULATE FROM DB */}
            <SideNavItem>
              <Row>
                <Input s={12} type="select" label="Select Location">
                  {this.state.games.map(game => {
                    return <option value={game.city}>{game.city}</option>;
                  })}
                </Input>
              </Row> </SideNavItem>
            <Row className="center">
              <Input
                s={4}
                onChange={this.handleInputChange}
                defaultChecked
                name="gender"
                type="checkbox"
                // defaultValue="coed"
                // value={this.state.gender}
                label="Co-Ed"

              />
              <Input
              onChange={this.handleInputChange}
                s={4}

                name="gender"
                type="checkbox"
                // defaultValue="male"
                // value={this.state.gender}
                label="Male Only"
              />
              <Input
                onChange={this.handleInputChange}
                s={4}
                name="gender"
                type="checkbox"
                // defaultValue="female"
                // value={this.state.gender}
                label="Female Only"
              />
            </Row>
            <SideNavItem />
            {/* {/* DROP DOWN UPCOMING GAMES */}
            <SideNavItem>
              <Collapsible>
                <CollapsibleItem header="Upcoming Games" icon="arrow_drop_down">
                  <Collection>
                    {/* THIS WILL DISPLAY JOINED UPCOMING GAMES */}
                    {this.state.games.map(game => {
                      // {game._id === game.authorId}
                      return (
                        <CollectionItem value={game._id} header={game.title}>
                          <Modal className="center"
                            header={game.title}
                            trigger={
                              <Button className="white" flat waves="teal">
                                {game.title}
                              </Button>
                            }>
                            <div className="center description">
                      <h6>Description:</h6>
                      <p id='gameDescription'>{game.description}</p>
                    </div>
                    <Table className='center gameInfo'>
                        <thead>
                          <tr>
                            <th data-field="id" className='center'>Sport</th>
                            <th data-field="name" className='center'>Date</th>
                            <th data-field="name" className='center'>Time</th>
                            <th data-field="price" className='center'>Male | Female | Co-Ed</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <td className='center'>{game.sport}</td>
                            <td className='center'>{game.date}</td>
                            <td className='center'>{game.time} </td>
                            <td className='center'>{game.gender}</td>
                          </tr>
                        </tbody>
                      </Table>

                      <Row className='center icons'>
                        <Col s={3}>
                          <Modal
                              header='Attendees'
                              trigger={<i className="material-icons">people</i>}>
                              <Row>
                                <Col s={12}>
                                
                                {/* creates author chip in attendees section */}
                                  <Chip>
                                    <img src={game.authorPhoto} alt='UserImage' />
                                    {game.author}
                                  </Chip>
                                  
                                  {/* creates chips for players if there are players added to game */}

                                  {game.players ? game.players.map(element => {
                                    return(
                                      <Chip>
                                        <img src={element.photo} alt='UserImage' />
                                        {element.email}
                                      </Chip>
                                      )
                                  }) : console.log('You have no players')}

                                </Col>
                              </Row>
                            </Modal>
                          <p>{game.playerNumber} spots left!</p>
                        </Col>
                        <Col s={3}>
                          <Modal
                              header='Location'
                              trigger={<i className="material-icons">location_on</i>}>
                              <div className='container'>
                                <Row>
                                  <SimpleMap lat={game.lat} lng={game.lng}></SimpleMap>
                                </Row>
                              </div>
                            </Modal>
                          <p>Location</p>
                        </Col>
                        <Col s={3}>
                          <Modal
                            header='Contact Event Author'
                            trigger={<i className="material-icons">email</i>}>
                            <Row>
                                <Row>
                                <Input placeholder="Your Name" s={12} label={this.state.userID} />
                                </Row>
                                <Row>
                                  <Input placeholder="Input message here" s={12} type='textarea' />
                                </Row>
                                <Row className='center'>
                                  <Button>Send</Button>
                                </Row>
                            </Row>
                          </Modal>
                          <p>Contact</p>
                        </Col>
                        <Col s={3}>
                          <Modal
                              header='Share'
                              trigger={<i className="material-icons">share</i>}>
                              <Row>
                                  <Row>
                                    <Input placeholder="Email"  s={6} label="Your Email" />
                                    <Input placeholder="Recipient" s={6}  label="Recipient Email" />
                                  </Row>
                                  <Row>
                                    <Input placeholder="Input message here" s={12} type='textarea' />
                                  </Row>
                                  <Row className='center'>
                                    <Button>Share</Button>
                                  </Row>
                              </Row>
                            </Modal>
                          <p>Share</p>
                        </Col>
                      </Row>
                          </Modal>
                        </CollectionItem>
                      );
                    })}
                  </Collection>
                </CollapsibleItem>
              </Collapsible>
            </SideNavItem>

            <br />
           
            {/* {/* DROP DOWN CREATED GAMES */}
            <SideNavItem>
              <Collapsible>
                <CollapsibleItem header="Created Games" icon="arrow_drop_down">
                  <Collection>
                    {/* THIS WILL DISPLAY JOINED CREATED GAMES */}
                    {this.state.games.map(game => {
                      // {game.author}
                      return (
                        <CollectionItem value={game._id} header={game.title}>
                          <Modal className="center"
                            header={game.title}
                            trigger={
                              <Button className="white" flat waves="teal">
                                {game.title}
                              </Button>
                            }>
                            <div className="center description">
                      <h6>Description:</h6>
                      <p id='gameDescription'>{game.description}</p>
                    </div>
                    <Table className='center gameInfo'>
                        <thead>
                          <tr>
                            <th data-field="id" className='center'>Sport</th>
                            <th data-field="name" className='center'>Date</th>
                            <th data-field="name" className='center'>Time</th>
                            <th data-field="price" className='center'>Male | Female | Co-Ed</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <td className='center'>{game.sport}</td>
                            <td className='center'>{game.date}</td>
                            <td className='center'>{game.time} </td>
                            <td className='center'>{game.gender}</td>
                          </tr>
                        </tbody>
                      </Table>

                      <Row className='center icons'>
                        <Col s={3}>
                          <Modal
                              header='Attendees'
                              trigger={<i className="material-icons">people</i>}>
                              <Row>
                                <Col s={12}>
                                
                                {/* creates author chip in attendees section */}
                                  <Chip>
                                    <img src={game.authorPhoto} alt='UserImage' />
                                    {game.author}
                                  </Chip>
                                  
                                  {/* creates chips for players if there are players added to game */}

                                  {game.players ? game.players.map(element => {
                                    return(
                                      <Chip>
                                        <img src={element.photo} alt='UserImage' />
                                        {element.email}
                                      </Chip>
                                      )
                                  }) : console.log('You have no players')}

                                </Col>
                              </Row>
                            </Modal>
                          <p>{game.playerNumber} spots left!</p>
                        </Col>
                        <Col s={3}>
                          <Modal
                              header='Location'
                              trigger={<i className="material-icons">location_on</i>}>
                              <div className='container'>
                                <Row>
                                  <SimpleMap lat={game.lat} lng={game.lng}></SimpleMap>
                                </Row>
                              </div>
                            </Modal>
                          <p>Location</p>
                        </Col>
                        <Col s={3}>
                          <Modal
                            header='Contact Event Author'
                            trigger={<i className="material-icons">email</i>}>
                            <Row>
                                <Row>
                                <Input placeholder="Your Name" s={12} label={this.state.userID} />
                                </Row>
                                <Row>
                                  <Input placeholder="Input message here" s={12} type='textarea' />
                                </Row>
                                <Row className='center'>
                                  <Button>Send</Button>
                                </Row>
                            </Row>
                          </Modal>
                          <p>Contact</p>
                        </Col>
                        <Col s={3}>
                          <Modal
                              header='Share'
                              trigger={<i className="material-icons">share</i>}>
                              <Row>
                                  <Row>
                                    <Input placeholder="Email"  s={6} label="Your Email" />
                                    <Input placeholder="Recipient" s={6}  label="Recipient Email" />
                                  </Row>
                                  <Row>
                                    <Input placeholder="Input message here" s={12} type='textarea' />
                                  </Row>
                                  <Row className='center'>
                                    <Button>Share</Button>
                                  </Row>
                              </Row>
                            </Modal>
                          <p>Share</p>
                        </Col>
                      </Row>
                          </Modal>
                        </CollectionItem>
                      );
                    })}
                  </Collection>
                </CollapsibleItem>
              </Collapsible>
            </SideNavItem>
            <br />
            <SideNavItem className="center">
              <Button flat onClick={this.props.auth.logout}>
                Logout
              </Button>
            </SideNavItem>
          </SideNav>
        </Col>
      </Row>
    );
  }
}
           


export default Games;