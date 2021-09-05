import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";

const Title = styled.h2`
  color: #444;
  margin-bottom: 2rem;
`;

const Link = styled(RouterLink)`
  color: #6a1b9a;
  font-weight: 600;
  text-decoration: none;
  padding: 0 1rem 0 0;
  display: block;

  :hover {
    text-decoration: underline;
  }
`;

const TableHeaderItem = styled.th`
  color: #444;
`;

const UsersPage = () => {
  const users = useSelector(state => state.users);

  return (
    <div>
      <Title>Users</Title>
      <table>
        <thead>
          <tr>
            <th></th>
            <TableHeaderItem>Blogs created</TableHeaderItem>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
