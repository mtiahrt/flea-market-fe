import "./App.css";
import bricking from "./images/brickwall.gif";
import blueprints from "./images/blueprints.gif";
import worker from "./images/en-construction.gif";
import MyComponent from "./MyComponent";
import { useQuery, gql } from "@apollo/client";
import styled from "styled-components";

const myQuery = gql`
  query {
    saleItemsList {
      manufacturerName
      name
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(myQuery);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div className="App">
      <StyledApp>
        <header>
          <h1>Comming Soon!</h1>
          <h2>gretchenkelly shop</h2>
          <img alt="this is a" className="blue-prints" src={blueprints}></img>
          <img alt="my pic" className="bricking" src={bricking}></img>
          <img alt="this" className="worker" src={worker} />
          <MyComponent />
          {data.saleItemsList.map(({ manufacturerName, name }) => (
            <div>
              <p>{manufacturerName}</p>
              <p>{name}</p>
            </div>
          ))}
        </header>
      </StyledApp>
    </div>
  );
}
const StyledApp = styled.div`
  p {
    color: whitesmoke;
    font-weight: 200;
    font-size: 30px;
  }
`;
export default App;
