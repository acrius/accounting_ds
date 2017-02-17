import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {Table, TableBody,
        TableHeader, TableHeaderColumn,
        TableRow, TableRowColumn} from 'material-ui/Table';

import * as waybillsActions from '../actions/WaybillsActions.js'

class WaybillsListItem extends Component {
  render() {
    return (
      <TableRow key={this.props.index} selectable={true}>
        <TableRowColumn columnNumber={1}>{this.props.waybill.id}</TableRowColumn>
        <TableRowColumn columnNumber={2}>{this.props.waybill.date}</TableRowColumn>
        <TableRowColumn columnNumber={3}>{this.props.waybill.driver.name}</TableRowColumn>
        <TableRowColumn columnNumber={4}>{this.props.waybill.car.name}</TableRowColumn>
        <TableRowColumn columnNumber={5}>{this.props.waybill.mileage_begin}</TableRowColumn>
        <TableRowColumn columnNumber={6}>{this.props.waybill.mileage_end}</TableRowColumn>
        <TableRowColumn columnNumber={7}>{this.props.waybill.departure_time}</TableRowColumn>
        <TableRowColumn columnNumber={8}>{this.props.waybill.return_time}</TableRowColumn>
        <TableRowColumn columnNumber={9}>{this.props.waybill.consumption_fact}</TableRowColumn>
        <TableRowColumn columnNumber={10}>{this.props.waybill.consumption_norm}</TableRowColumn>
      </TableRow>
    );
  }
}

class WaybillsList extends Component {
  constructor(props) {
    if (!('filters' in props)) {
      props['filters'] = {};
    }
    super(props);
  }
  componentDidMount() {
    this.props.actions.getWaybills();
  }
  render() {
    const waybills = this.props.waybills.filter((waybill) => {
      let filterStatus = true;
      for (field in this.props.filters) {
        filterStatus =  waybill[field] == this.props.filters[field] ? filterStatus : false;
      }
      return filterStatus
    });

    return (
      <Table fixedHeader={true}>
        <TableHeader displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}>
          <TableRow>
            <TableHeaderColumn colSpan="10" tooltip="Путевые листы" style={{textAlign: 'center'}}>
              Путевые листы
            </TableHeaderColumn>
          </TableRow>
          <TableRow>
            <TableHeaderColumn columnNumber={1}>№</TableHeaderColumn>
            <TableHeaderColumn columnNumber={2}>Дата</TableHeaderColumn>
            <TableHeaderColumn columnNumber={3}>Водитель</TableHeaderColumn>
            <TableHeaderColumn columnNumber={4}>Автомобиль</TableHeaderColumn>
            <TableHeaderColumn columnNumber={5}>Пробег при выезде</TableHeaderColumn>
            <TableHeaderColumn columnNumber={6}>Пробег при заезде</TableHeaderColumn>
            <TableHeaderColumn columnNumber={7}>Время выезда</TableHeaderColumn>
            <TableHeaderColumn columnNumber={8}>Время заезда</TableHeaderColumn>
            <TableHeaderColumn columnNumber={9}>Расход по факту</TableHeaderColumn>
            <TableHeaderColumn columnNumber={10}>Расход по норме</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} deselectOnClickaway={true}
            showRowHover={true}
            stripedRows={true}>
          {waybills.map((waybill, index) => (<WaybillsListItem waybill={waybill} key={index} />))}
        </TableBody>
      </Table>
    );
  }
}

function mapStateToProps(state) {
  return {
    waybills: state.waybills.waybills,
    fetching: state.waybills.fetching,
    error: state.waybills.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(waybillsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WaybillsList)
