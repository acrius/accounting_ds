import React, {Component} from 'react';
import {Card} from 'material-ui';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';

import {getIndividualsData} from '../../main/actions/IndividualsActions.js';
import {getCarsData} from '../actions/CarsActions.js';

import WaybillsList from '../containers/Waybills.js';

export default class WaybillsWorkspace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectable: false,
      autocomplete_drivers: [],
      selectedDriver: null,
      autocomplete_cars: [],
      selectedCar: null,
      filters: {}
    };
  }

  componentDidMount() {
    getIndividualsData().then((individuals) => {
      let autocomplete_drivers = [];
      individuals.forEach((individual) => autocomplete_drivers.push({text: individual.name, value: individual.id}));
      this.setState({autocomplete_drivers: autocomplete_drivers});
    });
    getCarsData().then((cars) => {
      let autocomplete_cars = [];
      cars.forEach((car) => autocomplete_cars.push({text: car.name, value: car.id}));
      this.setState({autocomplete_cars: autocomplete_cars});
    })
  }

  selectDriver = (chosenRequest, index) =>{
    if (index >= 0){
      this.setSleceted('selectedDriver', index)
        .then(() => this.setSelectable());
    }
  }

  setSleceted = (key, index) =>
    new Promise((resolve, reject) => {
      let newState = {};
      newState[key] = index;
      this.setState(newState);
      resolve();
    });

  setSelectable = () => {
    let filters = {};
    if (this.state.selectedDriver) {
      filters['driver_id'] = this.state.selectedDriver;
    }
    if (this.state.selectedCar) {
      filters['car_id'] = this.state.selectedCar;
    }
    this.setState({
      filters: filters,
      selectable: filters ? true : false
    });
  }

  render() {
    return (
            <div>
              <Card>
                <Toolbar>
                  <ToolbarGroup>
                    <AutoComplete id='waybillsSelectDriverField'
                      floatingLabelText='Введите Ф.И.О. водителя'
                      dataSource={this.state.autocomplete_drivers}
                      openOnFocus={true}
                      filter={AutoComplete.caseInsensitiveFilter}
                      onNewRequest={this.selectDriver}/>
                    <AutoComplete id='waybillsSelectCarField'
                      floatingLabelText='Введите автомобиль'
                      dataSource={this.state.autocomplete_cars}
                      openOnFocus={true}
                      filter={AutoComplete.caseInsensitiveFilter}/>
                  </ToolbarGroup>
                  <ToolbarGroup>
                    <RaisedButton label='Убрать отбор' primary={this.state.selection}/>
                  </ToolbarGroup>
                </Toolbar>
              </Card>
              <Card>
                <WaybillsList filters={this.state.filters}/>
              </Card>
            </div>);
  }
}
