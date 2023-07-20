import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageClinic.scss';
import * as actions from '../../../store/actions'
class TableManageClinic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            clinicRedux: []
        }
    }

    async componentDidMount() {
        this.props.fetchClinicRedux();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listClinic !== this.props.listClinic) {
            this.setState({
                clinicRedux: this.props.listClinic
            })
        }
    }

    handleDeleteClinic = (clinic) => {
        this.props.deleteClinicRedux(clinic.id)
    }

    handleEditClinic = (clinic) => {
        this.props.handleEditClinicFromParentKey(clinic)
    }

    render() {
        let arrClinic = this.state.clinicRedux;
        return (
            <>
                <table id='TableManageClinic'>
                    <tbody>
                        <tr>
                            <th>STT</th>
                            <th><FormattedMessage id="admin.manage-clinic.name"></FormattedMessage></th>
                            <th><FormattedMessage id="admin.manage-clinic.address"></FormattedMessage></th>
                            <th><FormattedMessage id="admin.manage-clinic.action"></FormattedMessage></th>
                        </tr>
                        {arrClinic && arrClinic.length > 0 &&
                        arrClinic.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className='btn-edit' onClick={() => this.handleEditClinic(item)} ><i className="fas fa-pencil-alt"></i></button>
                                        <button className='btn-delete' onClick={() => this.handleDeleteClinic(item)} ><i className="fas fa-trash"></i></button>
                                    </td>

                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        listClinic: state.admin.allClinic
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchClinicRedux: () => dispatch(actions.fetchAllClinicStart()),
        deleteClinicRedux: (id) => dispatch(actions.deleteClinic(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageClinic);
