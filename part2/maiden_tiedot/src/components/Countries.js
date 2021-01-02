import Weather from './Weather'

const Show = ({changeFilter, countryName}) => {
    return (
      <span>
        <button onClick={() => changeFilter(countryName)}>show</button>
      </span>
    )
  }

const Countries = ({countries, filterValue, changeFilter}) => {

  const Filter = () => {
    if (countries.length > 10){
      return (
        <p>Too many matches, specify another filter</p>
      )
    } else if (countries.length === 0) {
        return (<p>No countries found</p>)    
    } else if (countries.length === 1) {
        return (
          <div>
            <form>
              <h1>{countries[0].name}</h1>
              <p>capital {countries[0].capital}</p>
              <p>population {countries[0].population}</p>
              <br/>
              <h2>languages</h2>
              <ul>
                {countries[0].languages.map((language, i) => (
                  <li key={i}>{language.name}</li>
                ))}
              </ul>
              <img alt='country flag' src={countries[0].flag} height='100px'/>
             {/* <Weather location={countries[0].name}/> */}
            </form>
          </div>
        )
    }else {
      return (
        countries.filter(country => country.name.includes(filterValue)).map((filteredCountries, i) => (
          <p key={i}>{filteredCountries.name}<Show changeFilter={changeFilter} countryName={filteredCountries.name}/></p>
      )))
    }
  }

  return (
    <div>
      <Filter />
    </div>
  )
}

export default Countries