import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './MoreInforClinic.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import { getAllClinic } from '../../../services/userService';
import { withRouter } from 'react-router';
class MoreInforClinic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataClinic: [],
            searchKeyword: ''
        }
    }

    async componentDidMount() {
        let res = await getAllClinic();
        if (res && res.errCode === 0) {
            this.setState({
                dataClinic: res.data ? res.data : []
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

    }

    handleViewDetailClinic = (clinic) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${clinic.id}`)
        }
    }

    returnToHome = () => {
        if(this.props.history) {
            this.props.history.push(`/home`)
        }
    }

    handleSearchClinic = (event) => {
        let searchKeyword = event.target.value
        this.setState({
            searchKeyword
        })

    }

    render() {
        let { dataClinic, searchKeyword } = this.state;
        console.log(dataClinic);
        return (
            <>
                <HomeHeader />
                <div className='more-infor-clinic-container'>
                    <div className='more-infor-clinic-all'>
                        <i className="fas fa-home" onClick={() => this.returnToHome()} ></i>
                        /  <FormattedMessage id="patient.more-infor-clinic.all-clinic" /></div>
                    <div className='more-infor-clinic-header'>
                        <div className='header-left'>
                        <FormattedMessage id="patient.more-infor-clinic.clinic" />
                        </div>
                        <div className='header-right'>
                            <div className='header-right-search'>
                                <input type='text' placeholder='Tìm kiếm' 
                                    onChange={(event) => this.handleSearchClinic(event)}
                                />
                                <i className="fas fa-search"></i>
                            </div>
                        </div>

                    </div>
                    <div className='more-infor-clinic-body'>
                        {dataClinic && dataClinic.length > 0 &&
                            dataClinic.filter((item) => item.name.toLowerCase().includes(searchKeyword.toLocaleLowerCase())).map((item, index) => {
                                return (
                                    <div className='more-infor-clinic-child' key={index} 
                                        onClick={() => this.handleViewDetailClinic(item)}
                                    >
                                        <div className='clinic-item'>
                                            <div className='clinic-image'
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            />
                                            <div className='clinic-name' >{item.name}</div>
                                        </div>
                                    </div>
                                )
                            })

                        }

                    </div>
                </div>
                <HomeFooter />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MoreInforClinic));
