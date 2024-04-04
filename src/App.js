import React, { useEffect, useState } from "react";
import axios from "axios";

const getCountriesData = async () => {
  const response = await axios.get("https://restcountries.com/v3.1/all");
  return response.data;
};

const calcMean = (numbers) => {
  // Mean = (Sum of Population Density Values) / (Total Number of Values)
  let sum = 0;
  numbers.forEach((number) => {
    sum += number;
  });

  return sum / numbers.length;
};

const calcMedian = (numbers) => {
  // Median = Middle Value of Population Density Values
  numbers.sort((a, b) => a - b);
  let medianIndex = Math.floor(numbers.length / 2);
  return numbers[medianIndex];
};

const calcStandardDeviation = (numbers) => {
  // Standard Deviation = Square Root of (Sum of (Population Density - Mean)^2 / Total Number of Values)
  let mean = calcMean(numbers);
  let sumOfSquaredDifferences = 0;
  numbers.forEach((number) => {
    sumOfSquaredDifferences += Math.pow(number - mean, 2);
  });

  let standardDeviation = Math.sqrt(sumOfSquaredDifferences / numbers.length);
  return standardDeviation;
};

const App = () => {
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    getCountriesData().then((countriesData) => {
      const countries = countriesData.map((country) => ({
        name: country.name.common,
        population: country.population,
        area: country.area,
        unMember: country.unMember,
        currencies: country.currencies,
        populationDensity: country.population / country.area,
      }));

      setCountries(countries);
    });
  }, []);

  if (!countries) {
    return <div>Loading...</div>;
  }

  const populationDensityMean = calcMean(
    countries.map((country) => country.populationDensity)
  );
  const populationDensityMedian = calcMedian(
    countries.map((country) => country.populationDensity)
  );
  const populationDensityStandardDeviation = calcStandardDeviation(
    countries.map((country) => country.populationDensity)
  );

  const countUNMembers = countries.filter(
    (country) => country.unMember === true
  ).length;

  const countriesUsingEuro = countries.filter(
    (country) => country.currencies?.EUR
  ).length;

  return (
    <>
      <div className="container p-4 mx-auto prose">
        <h1>Population Details</h1>
        <table className="table-auto">
          <tbody>
            <tr>
              <td>Mean</td>
              <td>{populationDensityMean.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Median</td>
              <td>{populationDensityMedian.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Standard Deviation</td>
              <td>{populationDensityStandardDeviation.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Countries apart of the UN</td>
              <td>{countUNMembers}</td>
            </tr>
            <tr>
              <td>Countries using Euro</td>
              <td>{countriesUsingEuro}</td>
            </tr>
          </tbody>
        </table>
        <br />
        <table className="table-auto">
          <thead>
            <tr className="text-left">
              <th>Country Name</th>
              <th>Population</th>
              <th>Population density</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country) => (
              <tr key={country.name}>
                <td>{country.name}</td>
                <td>{country.population}</td>
                <td>{country.populationDensity.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default App;
