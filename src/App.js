import React from 'react';

import { MDBDataTable } from 'mdbreact';
import './App.css';

const columns = require('./columns.json')


const applySetResult = (result) => (prevState) => {
  var myRecords = result.records.map( (item, id) => {
    var { fields } = item
    return {
      id: (id + 1).toString(),
      tco_libelle: fields.tco_libelle ? fields.tco_libelle : '',
      dea_fermeture: fields.dea_fermeture ? fields.dea_fermeture : '',
      dea_numero_rue_livraison_dea_rue_livraison: fields.dea_numero_rue_livraison_dea_rue_livraison ? fields.dea_numero_rue_livraison_dea_rue_livraison : '',
      code_postal: fields.code_postal ? fields.code_postal : '',
      ville: fields.ville ? fields.ville : '',
      coord_geo: fields.coord_geo ? fields.coord_geo : ''
    }
  })
  return ({
    rows: myRecords
  })

};

const getUrl = (row) => 
// console.log(`https://data.ratp.fr/api/records/1.0/search/?dataset=liste-des-commerces-de-proximite-agrees-ratp&lang=en&sort=code_postal&start=${startAtRecord}&rows=${row}`)
  `https://data.ratp.fr/api/records/1.0/search/?dataset=liste-des-commerces-de-proximite-agrees-ratp&lang=en&sort=code_postal&rows=${row}`;


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [],
      rows: []
    };
  }

  componentDidMount = () => {
    this.fetchShops(1012)
    this.setState({
      columns: columns
    })
  }


  fetchShops = (row, startAtRecord) => 
    fetch(getUrl(row, startAtRecord))
      .then(response => response.json())
      .then(result => {
        this.onSetResult(result)
      });

  onSetResult = (result) => this.setState(applySetResult(result))

  render() {
    var { columns, rows } = this.state
    const data = {
      columns,
      rows
    }
    return (
      <div>
        <MDBDataTable
          striped
          bordered
          hover
          data={data}
        />
      </div>
    );
  }
}

export default App;
