// import logo from "./logo.svg";

import { useEffect, useState } from "react";
import "./App.css";
import SearchForm from "./components/SearchForm";

function App() {
  const [data, setData] = useState([]);
  const popularSearch = "http://hn.algolia.com/api/v1/search?";
  const [params, setParams] = useState([]);
  // additional state variables can be declared here

  useEffect(() => {
    // fetch data based on SearchForm component
    console.log(`useEffect triggered`);
    console.log(`params: `, params);
    let fullUrl = popularSearch + params.join("&");
    if (params && params.length > 0) {
      fullUrl += "&hitsPerPage=35";
    } else {
      fullUrl += "hitsPerPage=35";
    }
    console.log("full Url: ", fullUrl);
    fetch(fullUrl)
      .then((response) => response.json())
      .then((data) => setData(data.hits))
      .then(console.log(data));
    // END fetch data
  }, [params]);

  // the data variable will contain the posts that need to be used
  // other child components can consume the data array and render data in a consistent format.
  // the above useEffect hook is responsible for fetching the data based on the SearchForm component

  // other components should use the data variable (and use [data] in the dependency array if using a useEffect hook)

  return (
    <div className="App">
      <SearchForm params={params} setParams={setParams} />
      <h1>Results</h1>
      <ul>
        {data.map((results) => {
          return <li key={results.created_at}>{results.title}</li>;
        })}
      </ul>
      {/* this <ul> element should be replaced by the ListArticles component*/}
    </div>
  );
}

export default App;
