import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);

  const fetchData = async () => {
    try {
      const result = await axios.get("https://restcountries.com/v2/all");
      setCountries(result.data);
    } catch (error) {
      console.error(`Something went wrong :${error}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(countries);
  return (
    <div className="w-screen">
      <main className="border border-black w-[96%] min-h-screen my-0 mx-auto flex flex-col justify-center items-stretch">
        <label htmlFor="search-countries" />
        <input
          type="text"
          className="border border-slate-700 my-5 p-5 w-full shadow-md rounded-xl"
          placeholder="Search countries or capital"
        />
        <section className="border h-auto grid grid-cols-4 gap-10 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {countries.map((item, index) => {
            return (
              <div
                className="border px-3 w-[300px] h-[350px] flex flex-col justify-evenly shadow-md"
                key={index}
              >
                <img
                  src={item.flag}
                  alt={item.name}
                  className="object-cover max-w-[250px] border"
                />
                <h1 className="text-2xl font-bold">{item.name}</h1>
                <div>
                  population:{" "}
                  <span className="text-gray-500">{item.population}</span>{" "}
                  people
                </div>
                <div>ภูมิภาค: {item.region}</div>
                <div>Capital: {item.capital}</div>
              </div>
            );
          })}
        </section>
      </main>
    </div>
  );
}

export default App;
