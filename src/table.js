import Table from 'react-bootstrap/Table';

function DarkExample({dateTime,image, name, genre, venue}) {
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Date/Time</th>
          <th>Icon</th>
          <th>Event</th>
          <th>Genre</th>
          <th>Venue</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{dateTime}</td>
          <td><img src={image}></img></td>
          <td>{name}</td>
          <td>{genre}</td>
          <td>{venue}</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default DarkExample;