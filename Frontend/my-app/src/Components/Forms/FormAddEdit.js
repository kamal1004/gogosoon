import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddEditForm extends React.Component {
  state = {
    id: 0,
    Name: '',
    age : '',
    email: '',
    number: ''
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    e.preventDefault()
    fetch('http://localhost:5000/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Name: this.state.Name,
        age: this.state.age,
        email: this.state.email,
        number: this.state.number
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          this.props.addItemToState(item[0])
          this.props.toggle()

        } else {
          alert("User Created Sucessfully")
        }
      })
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault()
    fetch('http://localhost:5000/users/'+this.state.id, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Name: this.state.Name,
        age: this.state.age,
        email: this.state.email,
        number: this.state.number
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          this.props.addItemToState(item[0])
          this.props.toggle()

        } else {
          alert("User Update Sucessfully")
        }
      })
      .catch(err => console.log(err))
  }


  componentDidMount(){

    if(this.props.item){
      const {  id, Name, age, email, number } = this.props.item
      this.setState({ id,  Name, age, email, number })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="first"> Name</Label>
          <Input type="text" name="Name" id="Name" onChange={this.onChange} value={this.state.Name === null ? '' : this.state.Name} />
        </FormGroup>
        <FormGroup>
          <Label for="last"> Age </Label>
          <Input type="text" name="age" id="age" onChange={this.onChange} value={this.state.age === null ? '' : this.state.age}  />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" onChange={this.onChange} value={this.state.email === null ? '' : this.state.email}  />
        </FormGroup>
        <FormGroup>
          <Label for="phone">Number</Label>
          <Input type="text" name="number" id="number" onChange={this.onChange} value={this.state.number === null ? '' : this.state.number}  />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm
