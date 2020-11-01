import React from 'react';
import PropTypes from 'prop-types';
import { UserShape } from '../../shapes/UserShape';
import './TodoForm.scss';

export class TodoForm extends React.PureComponent {
  state = {
    title: '',
    userName: '',
    titleError: false,
    userNameError: false,
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      [`${name}Error`]: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, userName } = this.state;
    const { addTodo, users } = this.props;
    const titleError = !title.trim();
    const userNameError = !userName;

    if (userNameError || titleError) {
      this.setState({
        titleError,
        userNameError,
      });

      return;
    }

    const selectedUser = users.find(user => user.name === userName);

    addTodo(title, selectedUser);

    this.setState({
      title: '',
      userName: '',
      titleError: false,
      userNameError: false,
    });
  }

  render() {
    const { users } = this.props;
    const {
      title,
      userName,
      titleError,
      userNameError,
    } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
        className="form"
      >
        <div className="form__title">
          <input
            type="text"
            placeholder="Todo..."
            className="form__input"
            name="title"
            value={title}
            onChange={this.handleChange}
          />
          {titleError
            && <p className="form__error">Please enter the title</p>}
        </div>

        <div className="form__user">
          <select
            name="userName"
            value={userName}
            onChange={this.handleChange}
            className="form__select"
          >
            <option value="">
              Choose name
            </option>
            {
              users.map(user => (
                <option value={user.name} key={user.id}>
                  {user.name}
                </option>
              ))
            }
          </select>
          {userNameError
            && <p className="form__error">Please choose a user</p>}
        </div>
        <button
          type="submit"
          className="form__button"
        >
          Add todo
        </button>
      </form>
    );
  }
}

TodoForm.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape(UserShape).isRequired,
  ).isRequired,
  addTodo: PropTypes.func.isRequired,
};
