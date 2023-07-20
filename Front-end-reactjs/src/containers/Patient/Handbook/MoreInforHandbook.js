import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import './MoreInforHandbook.scss';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllHandbook } from '../../../services/userService';
import { withRouter } from 'react-router';
class MoreInforHandbook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataHandbook: []
        }
    }

    async componentDidMount() {
        let res = await getAllHandbook();
        if (res && res.errCode === 0) {
            this.setState({
                dataHandbook: res.data ? res.data : []
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }

    }

    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }
    }

    handleViewDetailHandbook = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-handbook/${item.id}`)
        }
    }

    render() {
        let { dataHandbook } = this.state;

        let setting = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };

        let settingPopular = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
        };
        return (
            <>
                <HomeHeader />
                <div className='more-infor-handbook-container'>
                    <div className='more-infor-handbook-all'>
                        <i className="fas fa-home" onClick={() => this.returnToHome()} ></i>
                        / Cẩm nang</div>
                    <div className='more-infor-handbook-header'>
                        <div className='header-title'>
                            Bài viết mới nhất
                        </div>
                        <div className='header-search'>
                            <input type='text' placeholder='Tìm kiếm' />
                            <i className="fas fa-search"></i>
                        </div>
                    </div>
                    <div className='more-infor-handbook-body'>
                        <Slider {...setting}>
                            {dataHandbook && dataHandbook.length > 0 &&
                                dataHandbook.map((item, index) => {
                                    return (
                                        <div className='handbook-new'>
                                            <div className='handbook-new-child' key={index}
                                                onClick={() => this.handleViewDetailHandbook(item)}
                                            >
                                                <div className='handbook-new-block'>
                                                    <div className='handbook-new-image'
                                                        style={{ backgroundImage: `url(${item.image})` }}>
                                                    </div>
                                                    <div className='handbook--new-name'>{item.name}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                        <div className='handbook-outstanding'>
                            <div className='handbook-outstanding-title'>Bài viết nổi bật</div>
                            <Slider {...settingPopular}>
                                {dataHandbook && dataHandbook.length > 0 &&
                                    dataHandbook.map((item, index) => {
                                        return (
                                            <div className='handbook-outstanding-child' key={index}
                                                onClick={() => this.handleViewDetailHandbook(item)}
                                            >
                                                <div className='handbook-outstanding-block'>
                                                    <div className='handbook-outstanding-image'
                                                        style={{ backgroundImage: `url(${item.image})` }}
                                                    ></div>
                                                    <div className='handbook--outstanding-name'>{item.name}</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>
                        </div>
                        <div className='handbook-category'>
                            <div className='handbook-category-title'>
                                <span>Danh mục cẩm nang</span>
                                <button className='btn-moreinfor'>Xem thêm</button>
                            </div>
                            <div className='handbook-category-body'>
                                <div className='handbook-category-child'>
                                    <div className='handbook-category-block'>
                                        <div className='handbook-category-image xuongkhop'></div>
                                        <div className='handbook--category-name'>Cơ xương khớp</div>
                                    </div>
                                </div>
                                <div className='handbook-category-child'>
                                    <div className='handbook-category-block'>
                                        <div className='handbook-category-image thankinh'></div>
                                        <div className='handbook--category-name'>Thần kinh</div>
                                    </div>
                                </div>
                                <div className='handbook-category-child'>
                                    <div className='handbook-category-block'>
                                        <div className='handbook-category-image timmach'></div>
                                        <div className='handbook--category-name'>Tim mạch</div>
                                    </div>
                                </div>
                                <div className='handbook-category-child'>
                                    <div className='handbook-category-block'>
                                        <div className='handbook-category-image tieuhoa'></div>
                                        <div className='handbook--category-name'>Tiêu hóa</div>
                                    </div>
                                </div>
                                <div className='handbook-category-child'>
                                    <div className='handbook-category-block'>
                                        <div className='handbook-category-image cotsong'></div>
                                        <div className='handbook--category-name'>Cột sống</div>
                                    </div>
                                </div>
                                <div className='handbook-category-child'>
                                    <div className='handbook-category-block'>
                                        <div className='handbook-category-image taimuihong'></div>
                                        <div className='handbook--category-name'>Tai mũi họng</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='bookingcare-create-handbook'>
                            <div className='bookingcare-create-handbook-title'>BookingCare tạo ra nội dung như thế nào?</div>
                            <div className='bookingcare-create-handbook-body'>
                                <div className='bookingcare-create-handbook-child'>
                                    <div className='bookingcare-create-handbook-image thamvan'>
                                    </div>
                                    <div className='bookingcare-create-handbook-name'>Tham vấn y khoa với bác sĩ chuyên môn</div>
                                </div>
                                <div className='bookingcare-create-handbook-child'>
                                    <div className='bookingcare-create-handbook-image noidung'></div>
                                    <div className='bookingcare-create-handbook-name'>Nội dung xác thực</div>
                                </div>
                                <div className='bookingcare-create-handbook-child'>
                                    <div className='bookingcare-create-handbook-image capnhat'></div>
                                    <div className='bookingcare-create-handbook-name'>Cập nhật thường xuyên</div>
                                </div>
                                <div className='bookingcare-create-handbook-child'>
                                    <div className='bookingcare-create-handbook-image thamkhao'></div>
                                    <div className='bookingcare-create-handbook-name'>Tham khảo nguồn tin cậy</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div >
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

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(MoreInforHandbook));
