import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {Table, TableBody,
        TableHeader, TableHeaderColumn,
        TableRow, TableRowColumn} from 'material-ui/Table';

import * as individualsActions from '../actions/IndividualsActions.js'

class IndividualsListItem extends Component {
  render() {
    return (
      <TableRow key={this.props.index} selectable={true}>
        <TableRowColumn>{this.props.individual.id}</TableRowColumn>
        <TableRowColumn>{this.props.individual.name}</TableRowColumn>
        <TableRowColumn>{this.props.individual.driver_license}</TableRowColumn>
      </TableRow>
    );
  }
}

class IndividualsList extends Component {
  componentDidMount() {
    this.props.actions.getIndividuals();
  }
  render() {

    console.log(this.props.individuals);

    return (
      <Table selectable={true}
          multiSelectable={true}>
        <TableHeader displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}>
          <TableRow>
              <TableHeaderColumn colSpan="3" tooltip="Super Header" style={{textAlign: 'center'}}>
                Сотрудники
              </TableHeaderColumn>
            </TableRow>
          <TableRow>
            <TableHeaderColumn>№</TableHeaderColumn>
            <TableHeaderColumn>Ф.И.О.</TableHeaderColumn>
            <TableHeaderColumn>Номер водительского удостоверения</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} deselectOnClickaway={true}
            showRowHover={true}
            stripedRows={true}>
          {this.props.individuals.map((individual, index) => (<IndividualsListItem individual={individual} key={index} />))}
        </TableBody>
      </Table>
    );
  }
}

function mapStateToProps(state) {
  return {
    individuals: state.individuals.individuals,
    fetching: state.individuals.fetching,
    error: state.individuals.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(individualsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IndividualsList)
