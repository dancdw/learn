import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// 08. 表单

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: '', selectValue: 'coconut', isGoing: true, numberOfGuests: 2};
  }

  // 文本输入
  handleChange(event) {
    this.setState({value: event.target.value.toUpperCase()});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  // 列表元素
  handleSelectChange(event) {
    this.setState({selectValue: event.target.value});
  }

  // 处理多个表单元素
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>
          Pick your favorite La Croix flavor:
          <select value={this.state.selectValue} onChange={this.handleSelectChange.bind(this)}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <label>
          Name:
          <textarea value={this.state.value} onChange={this.handleChange.bind(this)} />
        </label>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange.bind(this)} />
        </label>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange.bind(this)} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange.bind(this)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

ReactDOM.render(
  <NameForm />,
  document.getElementById('root')
);