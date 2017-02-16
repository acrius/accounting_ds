import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {Table, TableBody,
        TableHeader, TableHeaderColumn,
        TableRow, TableRowColumn} from 'material-ui/Table';

import * as carsActions from '../actions/CarsActions.js'

class CarsListItem extends Component {
  render() {
    console.log(this.props.car);
    return (
      <TableRow key={this.props.index} selectable={true}>
        <TableRowColumn>{this.props.car.id}</TableRowColumn>
        <TableRowColumn>{this.props.car.name}</TableRowColumn>
        <TableRowColumn>{this.props.car.car_type.name}</TableRowColumn>
        <TableRowColumn>{this.props.car.registration_number}</TableRowColumn>
        <TableRowColumn>{this.props.car.consumption_norm_distance}</TableRowColumn>
        <TableRowColumn>{this.props.car.consumption_norm_hours}</TableRowColumn>
      </TableRow>
    );
  }
}

class CarsList extends Component {
  componentDidMount() {
    this.props.actions.getCars();
  }
  render() {
    return (
      <Table selectable={true}
          multiSelectable={true}>
        <TableHeader displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}>
          <TableRow>
              <TableHeaderColumn colSpan="6" tooltip="Super Header" style={{textAlign: 'center'}}>
                Автомобили
              </TableHeaderColumn>
            </TableRow>
          <TableRow>
            <TableHeaderColumn>№</TableHeaderColumn>
            <TableHeaderColumn>Наименование</TableHeaderColumn>
            <TableHeaderColumn>Тип автомобиля</TableHeaderColumn>
            <TableHeaderColumn>Регистрационный номер</TableHeaderColumn>
            <TableHeaderColumn>Расход по норме(на л/100км)</TableHeaderColumn>
            <TableHeaderColumn>Расход по норме(на л/ч)</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} deselectOnClickaway={true}
            showRowHover={true}
            stripedRows={true}>
          {this.props.cars.map((car, index) => (<CarsListItem car={car} key={index} />))}
        </TableBody>
      </Table>
    );
  }
}

function mapStateToProps(state) {
  return {
    cars: state.cars.cars,
    carTypes: state.cars.carTypes,
    fetching: state.cars.fetching,
    error: state.cars.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(carsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CarsList)
