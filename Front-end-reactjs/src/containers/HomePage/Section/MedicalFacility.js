import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalFacility.scss'
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import { getAllClinic } from '../../../services/userService';
import { withRouter } from 'react-router';
class MedicalFacility extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataClinic: []
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

    handleViewMoreInforClinic = () => {
        if (this.props.history) {
            this.props.history.push(`/more-infor-clinic`)
        }
    }

    render() {
        let { dataClinic } = this.state;
        return (
            <div className='section-share section-medical-facility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id="homepage.clinic-popular" /></span>
                        <button className='btn-section' onClick={() => this.handleViewMoreInforClinic()}><FormattedMessage id="homepage.more-infor"

                        /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {dataClinic && dataClinic.length > 0 &&
                                dataClinic.map((item, index) => {
                                    return (
                                        <div className='section-customize clinic-child' key={index}
                                            onClick={() => this.handleViewDetailClinic(item)}
                                        >
                                            <div className='customize-border'>
                                                <div className='outer-bg'>
                                                    <div className='bg-image section-medical-facility'
                                                        style={{ backgroundImage: `url(${item.image})` }}
                                                    />
                                                </div>
                                                <div className='clinic-name' >{item.name}</div>
                                            </div>
                                        </div>
                                    )

                                })
                            }

                        </Slider>
                    </div>

                </div>
            </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
