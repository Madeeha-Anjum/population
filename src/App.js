import { useEffect, useState } from "react";
import axios from "axios";

const PopulationDetails = ({ populationData }) => {
  return (
    <div>
      <h1>Population Details</h1>
      <table>
        <thead>
          <tr>
            <th>Country</th>
            <th>Population</th>
          </tr>
        </thead>
        <tbody>
          {!populationData && (
            <tr>
              <td colSpan="2">Loading...</td>
            </tr>
          )}

          {populationData.populationData.map((country) => {
            return (
              <tr key={country.name.common}>
                <td>{country.name.common}</td>
                <td>{country.population}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const Population = () => {
  const [populationData, setPopulationData] = useState(null);

  const getPopulationData = async () => {
    const response = await axios.get("https://restcountries.com/v3.1/all");

    return response.data;
  };

  useEffect(() => {
    getPopulationData().then((data) => {
      setPopulationData(data);
    });
  }, []);

  return (
    <>
      <PopulationDetails populationData={{ populationData }} />;
    </>
  );
};

const App = () => {
  return (
    <div>
      <Population />
    </div>
  );
};

export default App;
