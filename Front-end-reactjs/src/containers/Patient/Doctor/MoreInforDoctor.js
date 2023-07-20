import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './MoreInforDoctor.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router';
class MoreInforDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctors: [],
            searchKeyword: ''
        }
    }

    async componentDidMount() {
        this.props.loadTopDoctors();
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux
            })
        }   

    }

    handleViewDetailDoctor = (doctor) => {
        if(this.props.history) {
            this.props.history.push(`/detail-doctor/${doctor.id}`)
        }
    }

    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }
    }

    handleSearchDoctor = (event) => {
        let searchKeyword = event.target.value
        this.setState({
            searchKeyword
        })

    }


    render() {
        let  { arrDoctors, searchKeyword }= this.state;
        let { language } = this.props;
        return (
            <>
                <HomeHeader/>
                <div className='more-infor-doctor-container'>
                    <div className='more-infor-doctor-all'>
                        <i className="fas fa-home" onClick={() => this.returnToHome()} ></i>
                        / <FormattedMessage id="patient.more-infor-doctor.all-doctor" /></div>
                    <div className='more-infor-doctor-header'>
                        <div className='header-title'>
                        <FormattedMessage id="patient.more-infor-doctor.doctor-list" />
                        </div>
                        <div className='header-search'>
                            <input 
                                type='text' 
                                placeholder='Tìm kiếm' 
                                onChange={(event) => this.handleSearchDoctor(event)}
                            />
                            <i className="fas fa-search"></i>
                        </div>
                    </div>
                    <div className='more-infor-doctor-body'>
                        {arrDoctors && arrDoctors.length > 0 &&
                           arrDoctors.filter((item) => (
                                    item.firstName.toLowerCase().includes(searchKeyword.toLocaleLowerCase()) 
                                    || item.lastName.toLowerCase().includes(searchKeyword.toLocaleLowerCase()) 
                                    || item.positionData.valueVi.toLowerCase().includes(searchKeyword.toLocaleLowerCase()) 
                                    || item.positionData.valueEn.toLowerCase().includes(searchKeyword.toLocaleLowerCase()) 
                                )).map((item, index) => {
                                let imageBase64 = '';
                                if (item.image) {
                                    imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                }
                                let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                                let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                                return (
                                    <div className='more-infor-doctor-child' key={index}
                                        onClick={() => this.handleViewDetailDoctor(item)}
                                    >
                                        <div className='doctor-image'
                                            style={{ backgroundImage: `url(${imageBase64})` }}
                                        />
                                        <div className='doctor-name' >
                                            <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                            <div className='doctor-specialty'>{item.Doctor_Infor.specialtyTypeData.name}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
                <HomeFooter/>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        topDoctorsRedux: state.admin.topDoctors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MoreInforDoctor));
