import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageSpecialty.scss';
import * as actions from '../../../store/actions'
class TableManageSpecialty extends Component {

    constructor(props) {
        super(props)
        this.state = {
            specialtyRedux: []
        }
    }

    async componentDidMount() {
        this.props.fetchSpecialtyRedux();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listSpecialty !== this.props.listSpecialty) {
            this.setState({
                specialtyRedux: this.props.listSpecialty
            })
        }

    }

    handleDeleteSpecialty = (specialty) => {
        this.props.deleteSpecialtyRedux(specialty.id)
    }

    handleEditSpecialty = (specialty) => {
        this.props.handleEditSpecialtyFromParentKey(specialty)
    }

    render() {
        let arrSpecialty = this.state.specialtyRedux;
        return (
            <table id='TableManageSpecialty'>
                <tbody>
                    <tr>
                        <th>STT</th>
                        <th><FormattedMessage id="admin.manage-specialty.name"></FormattedMessage></th>
                        <th><FormattedMessage id="admin.manage-specialty.action"></FormattedMessage></th>
                    </tr>
                    {arrSpecialty && arrSpecialty.length > 0 &&
                        arrSpecialty.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        <button className='btn-edit' onClick={() => this.handleEditSpecialty(item)} ><i className="fas fa-pencil-alt"></i></button>
                                        <button className='btn-delete' onClick={() => this.handleDeleteSpecialty(item)} ><i className="fas fa-trash"></i></button>
                                    </td>

                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        );
    }

}

const mapStateToProps = state => {
    return {
        listSpecialty: state.admin.allSpecialty
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchSpecialtyRedux: () => dispatch(actions.fetchAllSpecialtyStart()),
        deleteSpecialtyRedux: (id) => dispatch(actions.deleteSpecialty(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageSpecialty);
