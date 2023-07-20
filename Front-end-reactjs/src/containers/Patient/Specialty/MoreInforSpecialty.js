import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './MoreInforSpecialty.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import { getAllSpecialty } from '../../../services/userService';
import { withRouter } from 'react-router';
class MoreInforSpecialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSpecialty: [],
            searchKeyword: '',
        }
    }

    async componentDidMount() {
        let res = await getAllSpecialty();
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

    }

    handleViewDetailSpecialty = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${item.id}`)
        }
    }

    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }
    }

    handleSearchSpecialty = (event) => {
        let searchKeyword = event.target.value
        this.setState({
            searchKeyword
        })

    }

    render() {

        let { dataSpecialty, searchKeyword } = this.state;
        return (
            <>
                <HomeHeader />
                <div className='more-infor-specialty-container'>
                    <div className='more-infor-specialty-all'>
                        <i className="fas fa-home" onClick={() => this.returnToHome()} ></i>
                        / <FormattedMessage id="patient.more-infor-specialty.all-specialty" /></div>
                    <div className='more-infor-specialty-header'>
                        <div className='header-title'>
                        <FormattedMessage id="patient.more-infor-specialty.specialty" />
                        </div>
                        <div className='header-search'>
                            <input
                                type='text'
                                placeholder='Tìm kiếm'
                                onChange={(event) => this.handleSearchSpecialty(event)}
                            />
                            <i className="fas fa-search"></i>
                        </div>
                    </div>
                    <div className='more-infor-specialty-body'>
                        {dataSpecialty && dataSpecialty.length > 0 &&
                            dataSpecialty.filter((item) => item.name.toLowerCase().includes(searchKeyword.toLocaleLowerCase())).map((item, index) => {
                                return (
                                    <div className='more-infor-specialty-child' key={index}
                                        onClick={() => this.handleViewDetailSpecialty(item)}
                                    >
                                        <div className='specialty-image'
                                            style={{ backgroundImage: `url(${item.image})` }}
                                        />
                                        <div className='specialty-name' >{item.name}</div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MoreInforSpecialty));
