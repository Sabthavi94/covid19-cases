import logo from './logo.svg';
import './App.css';
import React from 'react';
import CountryList from './components/CountryList/CountryList';
import Searchbox from './components/SearchBox/Seacrchbox';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      countries:[],
      stats:[],
      searchField:""
    }
  }

//this method belongs to react so it knows this which belongs to component
  async componentDidMount(){
    const response = await fetch('https://api.covid19api.com/countries')
    const countries = await response.json()
    this.setState({countries})
    this.state.countries.forEach(async country =>{
      const response = await fetch(`https://api.covid19api.com/total/country/${country.Slug}`)
      const data= await response.json()
      // console.log(data)
      if(data.length)
      this.setState(prevState => (
        {stats:prevState.stats.concat({...data[data.length-1], CountryCode:country.ISO2})} //??
      ))
    })
  }

  // this method doesn't belong to React so it has no idea about this keyword so we want to bind this method in constructor
  // if it is arrow function it will give flexibility whether which class arrow function refers to
  // handleChange(e){
  //   this.setState({searchField:e.target.value});
  // }

  render(){
    const {stats,searchField}= this.state
    const filteredCountries = stats.filter(country =>(
      country.Country.toLowerCase().includes(searchField.toLowerCase())
    ))
    return (
      <div className="App">
          <Searchbox placeholder="Enter Country Name..." handleChange={(e) => this.setState({searchField:e.target.value})}/>
          <CountryList stats={filteredCountries}/>
      </div>
    );
  }
}

export default App;
