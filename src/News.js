import React, { Component } from 'react'

const URL = 'https://newsapi.org/v2';
const APIKEY = 'YOUR API KEY HERE';

export default class News extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      selectedItem: null
    }
  }

  componentDidMount() {
    const criteria = 'top-headlines?category=business';
    const address = URL + '/' + criteria + '&apikey=' + APIKEY;
    fetch(address)
      .then(res => res.json())
      .then ((result) => {
        console.log('ok');
        this.setState({
          error: null,
          items: result.articles,
          isLoaded: true
        })
      }, (error) => {
        this.setState({
          error,
          items: [],
          isLoaded: true
        })
      })
  }

  render() {
    const { error, isLoaded, items } = this.state;

    if (error) {
      return <p>{error.message}</p>;
    }
    else if (!isLoaded) {
      return <p>Loading...</p>;
    }
    else {
      return (
        <div>
          {items.map(item => (
            <div key={item.title}>
              <h3>{item.title}</h3>
              <img src={item.urlToImage}></img>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      )
    }
  }
}
