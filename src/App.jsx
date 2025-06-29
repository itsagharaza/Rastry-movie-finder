import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import './App.css'

const App = () => {

  const [darkMode, setDarkMode] = useState(false)

  // States for user input, results, and error
  const [movieName, setMovieName] = useState("")
  const [results, setResults] = useState([])
  const [error, setError] = useState("")

  // Fetch movies based on user input
  const searchMovies = async () => {
    if (!movieName.trim()) {
      setError("Please enter a movie title to begin your search.")
      return
    }
    try {
      const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${movieName}`)
      setResults(res.data)
      console.log(res.data)
      setError("")
    } catch (error) {
      setError("Oops! An error occurred while fetching results.")
    }
  }

  return (
    <div className={`container ${darkMode ? "dark" : ""}`}>
      <div className="search-box">
        <input
          type="text"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
          placeholder='Type a movie title and hit search..'
        />
        <button onClick={searchMovies}>Search</button>

        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {error && <h4>{error}</h4>}

      <div className="results">
        {results.map((item) => (
          <div className="result-card" key={item.show.id}>
            <img src={item.show.image?.medium} alt={item.show.name} />
            <h3>{item.show.name}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
