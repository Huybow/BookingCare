import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './TableManageHandbook.scss';
import * as actions from '../../../store/actions'
class TableManageHandbook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            handbookRedux: []
        }
    }

    async componentDidMount() {
        this.props.fetchHandbookRedux();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (prevProps.listHandbook !== this.props.listHandbook) {
            this.setState({
                handbookRedux: this.props.listHandbook
            })
        }

    }

    handleDeleteHandbook = (handbook) => {
        this.props.deleteHandbookRedux(handbook.id)
    }

    handleEditHandbook = (handbook) => {
        this.props.handleEditHandbookFromParentKey(handbook)
    }

    render() {
        let arrHandbook = this.state.handbookRedux;
        return (
            <>
            <table id='TableManageHandbook'>
                <tbody>
                    <tr>
                        <th>STT</th>
                        <th><FormattedMessage id="admin.manage-handbook.name"></FormattedMessage></th>
                        <th><FormattedMessage id="admin.manage-handbook.author-name"></FormattedMessage></th>
                        <th><FormattedMessage id="admin.manage-handbook.action"/></th>
                    </tr>
                    {arrHandbook && arrHandbook.length > 0 &&
                        arrHandbook.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.author}</td>
                                    <td>
                                        <button className='btn-edit' onClick={() => this.handleEditHandbook(item)}  ><i className="fas fa-pencil-alt"></i></button>
                                        <button className='btn-delete' onClick={() => this.handleDeleteHandbook(item)} ><i className="fas fa-trash"></i></button>
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
        language: state.app.language,
        listHandbook: state.admin.allHandbook
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchHandbookRedux: () => dispatch(actions.fetchAllHandbookStart()),
        deleteHandbookRedux: (id) => dispatch(actions.deleteHandbook(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageHandbook);
