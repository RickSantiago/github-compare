import React from 'react';
import { Container, Repository } from './styles';

const CompareList = ({ repositories }) => (

  <Container>
    {repositories.map(repository => (
      <Repository>
        <header>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <strong>{repository.name}</strong>
          <small>{repository.owner.login}</small>
        </header>

        <ul>
          <li>
            {repository.stargazers_count} <smal>stars</smal>
          </li>
          <li>
            {repository.forks_count} <smal>forks</smal>
          </li>
          <li>
            {repository.open_issues_count} <smal>issues</smal>
          </li>
          <li>
            {repository.pushed_at} <smal>last commit</smal>
          </li>

        </ul>

      </Repository>
    ))}


  </Container>

);

export default CompareList;
