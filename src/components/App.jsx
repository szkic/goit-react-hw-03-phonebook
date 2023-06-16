import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addNewName = (name, number) => {
    const { contacts } = this.state;

    const contactNames = contacts.map(contact => {
      return contact.name;
    });

    if (contactNames.includes(name))
      return alert(`${name} is alredy in contacts`);

    this.setState(prevState => ({
      contacts: [...prevState.contacts, { id: nanoid(), name, number }],
    }));
  };

  componentDidMount() {
    this.setState(JSON.parse(localStorage.getItem('state')));
  }

  componentDidUpdate(prevProps) {
    if (this.state.contacts !== prevProps.contacts) {
      localStorage.setItem('state', JSON.stringify(this.state));
    }
  }

  showFilteredContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(con =>
      con.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  deleteContact = id => {
    const { contacts } = this.state;

    this.setState({
      contacts: contacts.filter(contact => contact.id !== id),
    });
  };

  handleFilterChange = newValue => {
    this.setState({
      filter: newValue,
    });
  };

  render() {
    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addNewName} />

        <h2 className={css.title}>Contacts</h2>
        <Filter onChange={this.handleFilterChange} />
        <ContactList
          contacts={this.showFilteredContacts()}
          onClick={this.deleteContact}
        />
      </div>
    );
  }
}
