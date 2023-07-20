import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageClinic.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CRUD_ACTIONS, CommonUtils } from '../../../utils';
import { creatNewClinic } from '../../../services/userService';
import { toast } from 'react-toastify';
import TableManageClinic from './TableManageClinic';
import * as actions from '../../../store/actions/index';
import Lightbox from 'react-image-lightbox';


const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageClinic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            action: '',
            clinicId:'',
            previewImgURL: '',
            isOpen: false
        }
    }

    async componentDidMount() {
       
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listClinic !== this.props.listClinic) {
            this.setState({
                name: '',
                address: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL: ''
            })
        }

    }

    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html,
        })
    }

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let imageUrl = URL.createObjectURL(file);
            this.setState({
                imageBase64: base64,
                previewImgURL: imageUrl
            })
        }
        
    }

    openPreviewImage = () => {
        if (!this.state.previewImgURL) return 
            this.setState({
                isOpen: true
             })     
    }

    handleSaveNewClinic = async () => {
        let { action } = this.state;
        if (action === CRUD_ACTIONS.CREATE) {
            let res = await creatNewClinic(this.state)
            if (res && res.errCode === 0) {
                toast.success("Add new clinic succeed!");  
            } else {
                toast.error("Add new clinic failed!");
                console.log('check res:', res);
            }
            this.props.fetchClinicRedux();
        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editClinicRedux({
                id: this.state.clinicId,
                address: this.state.address,
                name: this.state.name,
                imageBase64: this.state.imageBase64,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown,
            })
        }
        

    }

    handleEditClinicFromParent = (clinic) => {
        this.setState({
            clinicId: clinic.id,
            name: clinic.name,
            imageBase64:'',
            address: clinic.address,
            descriptionHTML: clinic.descriptionHTML,
            descriptionMarkdown: clinic.descriptionMarkdown,
            action: CRUD_ACTIONS.EDIT,
            previewImgURL: clinic.image
        })
       
    }

    render() {

        return (
            <>
                <div className='manage-clinic-container'>
                    <div className='manage-clinic-title'><FormattedMessage id="admin.manage-clinic.title"></FormattedMessage></div>
                    <div className='add-new-clinic row'>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id="admin.manage-clinic.name"></FormattedMessage></label>
                            <input className='form-control' type='text' value={this.state.name}
                                onChange={(event) => this.handleOnChangeInput(event, 'name')}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id="admin.manage-clinic.image"></FormattedMessage></label>
                            <div className='preview-img-container'>
                                <input id='previewImg' type='file' hidden
                                    onChange={(event) => this.handleOnchangeImage(event)}
                                />
                                <label className='label-upload' htmlFor='previewImg'><FormattedMessage id="admin.manage-clinic.uploadimage"></FormattedMessage> <i className="fas fa-upload"></i>
                                    </label>
                                    <div className='preview-image'
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => this.openPreviewImage()}
                                    >
                                    </div>
                            </div>
                        </div>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id="admin.manage-clinic.address"></FormattedMessage></label>
                            <input className='form-control' type='text' value={this.state.address}
                                onChange={(event) => this.handleOnChangeInput(event, 'address')}
                            />
                        </div>

                        <div className='col-12'>
                            <MdEditor
                                style={{ height: '300px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange}//truyen props
                                value={this.state.descriptionMarkdown}
                            />
                        </div>
                        <div className='col-12'>
                            <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn-save-clinic'}
                                onClick={() => this.handleSaveNewClinic()}
                            ><FormattedMessage id="admin.manage-clinic.btn-save"></FormattedMessage></button>
                        </div>
                        <div className='col-12'>
                            <TableManageClinic 
                                handleEditClinicFromParentKey={this.handleEditClinicFromParent}
                                action={this.state.action}
                            />
                        </div>
                    </div>
                </div>
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        listClinic: state.admin.allClinic
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchClinicRedux: () => dispatch(actions.fetchAllClinicStart()),
        editClinicRedux: (data) => dispatch(actions.editClinic(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
