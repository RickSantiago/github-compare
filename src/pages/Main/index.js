import React, { Component } from 'react';
import { Container, Form } from '../Main/styles';
import CompareList from '../../components/CompareList';

import logo from '../../assets/logo.png';
import api from '../../services/api';
import moment from 'moment';

export default class Main extends Component {

  state = {
    repositoryInput: '',
    repositoryError: false,
    repositories: [],
  };

  handleAddRepository = async (e) => {

    e.preventDefault();

    this.setState({ loading: true });

    try {
      const { data: repository } = await api.get(`/repos/${this.state.repositoryInput}`);

      repository.lastCommit = moment(repository.pushed_at).fromNow();

      this.setState({
        loading: false,
        repositoryInput: '',
        repositories: [...this.state.repositories,repository ],
        repositoryError: false,
      });

      console.log(repository);
    }
    catch (err) {
     this.setState({repositoryError: true})
    }
    finally {
      this.setState({loading : false});
    }

  };

  render() {
    return (
      <Container>
        <img src={logo} alt="Github Compare" />

        <Form withError={this.state.repositoryError} onSubmit={this.handleAddRepository}>
          <input type="text"
            placeholder="usuario/repositorio"
            value={this.state.repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })} />
          <button type="submit">{this.state.loading ? <i className="fa fa-spinner fa-pulse" /> : "Ok"}</button>
        </Form>

        <CompareList repositories={this.state.repositories} />
      </Container>
    );
  }

}

