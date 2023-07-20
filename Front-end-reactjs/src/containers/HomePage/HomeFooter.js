import React, { Component } from 'react';
import { connect } from 'react-redux';
import bookingcare from '../../assets/specialty/bookingcare.svg'
import './HomeFooter.scss';
import { changeLanguageApp } from '../../store/actions/appActions';
import { FormattedMessage } from 'react-intl';
class HomeFooter extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }
    render() {
        return (
            <>
                <div className='home-footer'>
                    <div className='home-footer-content'>
                        <div className='left-content'> 
                            <img className='footer-logo' src={bookingcare}/>
                            <span className='hf-name'><FormattedMessage id="homefooter.name" /></span>
                            <p className='hf-address'>
                                <span> <i className="fas fa-map-marker-alt"></i> <FormattedMessage id="homefooter.address-hn" />
                                </span>
                                <span> <i className="fas fa-check"></i> <FormattedMessage id="homefooter.certificate-business" />
                                </span>
                            </p>
                        </div>
                        <div className='contact-content'>
                            <ul className='customer-care'>
                                <li><FormattedMessage id="homefooter.contact" /></li>
                                <li><FormattedMessage id="homefooter.medical-directory" /></li>
                                <li><FormattedMessage id="homefooter.business-health" /></li>
                                <li><FormattedMessage id="homefooter.business-package" /></li>
                                <li><FormattedMessage id="homefooter.question" /></li>
                                <li><FormattedMessage id="homefooter.rules" /></li>
                                <li><FormattedMessage id="homefooter.privacy-policy" /></li>
                                <li><FormattedMessage id="homefooter.support-process" /></li>
                            </ul>
                        </div>
                        <div className='right-content'>
                            <div className='right-body'>
                                <div className='right-title'>
                                <FormattedMessage id="homefooter.headquarters-hn" />
                                </div>
                                <p className='right-address'>
                                <FormattedMessage id="homefooter.address-hn" />
                                </p>
                            </div>
                            <div className='right-body'>
                                <div className='right-title'>
                                <FormattedMessage id="homefooter.headquarters-hcm" />
                                </div>
                                <p className='right-address'>
                                <FormattedMessage id="homefooter.address-hcm" />
                                </p>
                            </div>
                            <div className='right-body'>
                                <div className='right-title'>
                                <FormattedMessage id="homefooter.customer-support" />
                                </div>
                                <p className='right-address'>
                                    support@bookingcare.vn (7h30 - 18h)
                                </p>
                            </div>
                            <div className='right-body'>
                                <div className='right-title'>
                                    Hotline
                                </div>
                                <p className='right-address'>
                                    024-7301-2468 (7h30 - 18h)
                                </p>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className='copy-right'>
                    <p>&copy; 2023 Tran Trong Huy <a target='_blank' href='https://www.facebook.com/profile.php?id=100017179446576'>&#9829; Click here! &#9829;  </a></p>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
