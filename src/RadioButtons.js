import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Button } from 'reactstrap';
import { BrowserRouter as Router, Link} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import { MoreInfoRender } from './MoreInfo';


// Radio Buttons for Color Gradient

class RadioColorGradient extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      element: 'None',
      elementContainer: document.getElementById('elements')
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      element: event.target.value
    });
  }

  // Don't need this in the end. Can just update map with handleChange()
  handleSubmit(event) {
    alert(`You are choosing the element ${this.state.element}.`);
  }

  render() {
    return (

      <div class="element-container">
      <Container>
        <Row>
          <Col>
              <h1>Select Element</h1>
          </Col>
        </Row>
        <Row>
            <Col xs='2'>
              <label>
                <input type="radio" value="None" checked={this.state.element === "None"} onChange={this.handleChange}/>
              None
              </label>
              <label>
                <input type="radio" value="Ca" checked={this.state.element === "Ca"} onChange={this.handleChange} />
              Ca%
              </label>
              <label>
                <input type="radio" value="K" checked={this.state.element === "K"} onChange={this.handleChange}/>
              K%
              </label>
              <label>
                <input type="radio" value="Mg" checked={this.state.element === "Mg"} onChange={this.handleChange}/>
              Mg%
              </label>
              <label>
                <input type="radio" value="N" checked={this.state.element === "N"} onChange={this.handleChange}/>
              N%
              </label>
              <label>
                <input type="radio" value="P" checked={this.state.element === "P"} onChange={this.handleChange}/>
              P%
              </label>
            </Col>
            <Col xs='2'>
              <label>
                <input type="radio" value="S" checked={this.state.element === "S"} onChange={this.handleChange}/>
              S
              </label>
              <label>
                <input type="radio" value="Al" checked={this.state.element === "Al"} onChange={this.handleChange}/>
              Al
              </label>
              <label>
                <input type="radio" value="As" checked={this.state.element === "As"} onChange={this.handleChange}/>
              As
              </label>
              <label>
                <input type="radio" value="B" checked={this.state.element === "B"} onChange={this.handleChange}/>
              B
              </label>
              <label>
                <input type="radio" value="Ba" checked={this.state.element === "Ba"} onChange={this.handleChange}/>
              Ba
              </label>
              <label>
                <input type="radio" value="Cd" checked={this.state.element === "Cd"} onChange={this.handleChange}/>
              Cd
              </label>
            </Col>
            <Col xs='2'>
              <label>
                <input type="radio" value="Co" checked={this.state.element === "Co"} onChange={this.handleChange}/>
              Co
              </label>
              <label>
                <input type="radio" value="Cr" checked={this.state.element === "Cr"} onChange={this.handleChange}/>
              Cr
              </label>
              <label>
                <input type="radio" value="Cu" checked={this.state.element === "Cu"} onChange={this.handleChange}/>
              Cu
              </label>
              <label>
                <input type="radio" value="Fe" checked={this.state.element === "Fe"} onChange={this.handleChange}/>
              Fe
              </label>
              <label>
                <input type="radio" value="Mn" checked={this.state.element === "Mn"} onChange={this.handleChange}/>
              Mn
              </label>
              <label>
                <input type="radio" value="Mo" checked={this.state.element === "Mo"} onChange={this.handleChange}/>
              Mo
              </label>
            </Col>
            <Col xs='2'>
              <label>
                <input type="radio" value="Na" checked={this.state.element === "Na"} onChange={this.handleChange}/>
              Na
              </label>
              <label>
                <input type="radio" value="Ni" checked={this.state.element === "Ni"} onChange={this.handleChange}/>
              Ni
              </label>
              <label>
                <input type="radio" value="Pb" checked={this.state.element === "Pb"} onChange={this.handleChange}/>
              Pb
              </label>
              <label>
                <input type="radio" value="Se" checked={this.state.element === "Se"} onChange={this.handleChange}/>
              Se
              </label>
              <label>
                <input type="radio" value="Si" checked={this.state.element === "Si"} onChange={this.handleChange}/>
              Si
              </label>
              <label>
                <input type="radio" value="Sr" checked={this.state.element === "Sr"} onChange={this.handleChange}/>
              Sr
              </label>
            </Col>
            <Col xs='2'>
              <label>
                <input type="radio" value="Ti" checked={this.state.element === "Ti"} onChange={this.handleChange}/>
              Ti
              </label>
              <label>
                <input type="radio" value="V" checked={this.state.element === "V"} onChange={this.handleChange}/>
              V
              </label>
              <label>
                <input type="radio" value="Zn" checked={this.state.element === "Zn"} onChange={this.handleChange}/>
              Zn
              </label>
              <label>
                <input type="radio" value="Cl" checked={this.state.element === "Cl"} onChange={this.handleChange}/>
              Cl
              </label>
              <label>
                <input type="radio" value="Br" checked={this.state.element === "Br"} onChange={this.handleChange}/>
              Br
              </label>
              <label>
                <input type="radio" value="Rb" checked={this.state.element === "Rb"} onChange={this.handleChange}/>
              Rb
              </label>
            </Col>
            <Col xs='2'>
              <label>
                <input type="radio" value="Cu.Zn" checked={this.state.element === "Cu.Zn"} onChange={this.handleChange}/>
              CuZn
              </label>
              <label>
                <input type="radio" value="Fe.Ti" checked={this.state.element === "Fe.Ti"} onChange={this.handleChange}/>
              FeTi
              </label>
              <label>
                <input type="radio" value="F" checked={this.state.element === "F"} onChange={this.handleChange}/>
              F
              </label>
            </Col>
            </Row>
            <Row>
            <Col>
            <button onClick={this.handleSubmit}>Add Map Gradient</button>
            </Col>
          </Row>
        </Container>
        </div>
    );
  }

}

export {RadioColorGradient};
