import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [input, setInput] = useState("");
  const [keyFilter] = useState(["name", "capital"]); //สร้างเพื่อให้สามารถ search ได่้ 2 properties

  const fetchData = async () => {
    try {
      const result = await axios.get("https://restcountries.com/v2/all");
      setCountries(result.data);
    } catch (error) {
      alert(`Something went wrong :${error}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filterCountries = (countries) => {
    return countries.filter((country) => {
      return keyFilter.some((key) => {
        return (
          country[key]?.toString().toLowerCase().indexOf(input.toLowerCase()) >
          -1
        );
      });
    });
  };

  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  return (
    <div className="w-screen">
      <main className="w-[96%] min-h-screen my-0 mx-auto flex flex-col justify-center items-center">
        <label htmlFor="search-countries" />
        <input
          type="text"
          className="border border-slate-400 my-5 p-5 w-full shadow-md rounded-md outline-none"
          placeholder="Search countries or capital"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <section className=" h-auto grid grid-cols-4 gap-10 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {filterCountries(countries).map((item) => {
            return (
              <div
                className="border px-3 w-[300px] h-[350px] flex flex-col justify-evenly shadow-md"
                key={item.name}
              >
                <img
                  src={item.flag}
                  alt={item.name}
                  className="object-cover max-w-[250px] h-[150px] border"
                />
                <h1 className="text-2xl font-bold">{item.name}</h1>
                <div>
                  population:{" "}
                  <span className="text-gray-500">
                    {formatNumber(item.population)}
                  </span>{" "}
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
