import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DetailHandbook.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import { getAllDetailHandbookById } from '../../../services/userService';
import _ from 'lodash';
import LikeAndShare from '../SocialPlugin/LikeAndShare';
class DetailHandbook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataDetailHandbook: {},
            imageHandbook:'',
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getAllDetailHandbookById({
                id: id,
            });
            this.setState({
                dataDetailHandbook: res.data,
                imageHandbook: res.data.image = new Buffer( res.data.image, 'base64').toString('binary'),
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

    }

    render() {
        let { dataDetailHandbook } = this.state;
        // let currentURL = process.env.REACT_APP_IS_LOCALHOST === 1 ? "" : window.location.href; 
        let currentURL= 'https://developers.facebook.com/docs/plugins/'
        return (
            <div className="detail-clinic-container">
                <HomeHeader />
                <div className='detail-handbook-container'>
                    <div className="description-handbook">
                        {dataDetailHandbook && !_.isEmpty(dataDetailHandbook) &&
                            <>
                                <div className='handbook-name'>{dataDetailHandbook.name}</div>
                                <div className='handbook-bg-image'
                                    style={{ backgroundImage: `url(${dataDetailHandbook && dataDetailHandbook.image ? dataDetailHandbook.image : ''})` }}
                                > 
                                </div>
                                <div
                                    className='handbook-body'
                                    dangerouslySetInnerHTML={{
                                        __html: dataDetailHandbook.descriptionHTML,
                                    }}
                                >
                                </div>
                                <div className='like-share-plugin'>
                                    <LikeAndShare
                                        dataHref={currentURL}
                                    />
                                </div>
                            </>
                        }
                    </div>
                </div>
                <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandbook);
