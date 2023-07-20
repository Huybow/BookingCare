import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageSpecialty.scss';
import MarkdownIt from 'markdown-it';
import { CRUD_ACTIONS } from '../../../utils';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from '../../../utils';
import { creatNewSpecialty } from '../../../services/userService';
import { toast } from 'react-toastify';
import TableManageSpecialty from './TableManageSpecialty';
import * as actions from '../../../store/actions/index';
import Lightbox from 'react-image-lightbox';


const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageSpecialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            action: '',
            specialtyId: '',
            previewImgURL: '',
            isOpen: false
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listSpecialty !== this.props.listSpecialty) {
            this.setState({
                name: '',
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

    handleSaveNewSpecialty = async () => {
        let { action } = this.state;
        if (action === CRUD_ACTIONS.CREATE) {
            let res = await creatNewSpecialty(this.state)
            if (res && res.errCode === 0) {
                toast.success("Add new specialty succeed!");
                this.setState({
                    name: '',
                    imageBase64: '',
                    descriptionHTML: '',
                    descriptionMarkdown: '',
                    previewImgURL: ''
                })
            } else {
                toast.error("Add new specialty failed!");
                console.log('check res:', res);
            }
            this.props.fetchSpecialtyRedux();
        }if (action === CRUD_ACTIONS.EDIT) {
            this.props.editSpecialtyRedux({
                id: this.state.specialtyId,
                name: this.state.name,
                imageBase64: this.state.imageBase64,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown,
            })
        } 


    }

    handleEditSpecialtyFromParent = (specialty) => {
        this.setState({
            name: specialty.name,
            imageBase64: '',
            descriptionHTML: specialty.descriptionHTML,
            descriptionMarkdown: specialty.descriptionMarkdown,
            action: CRUD_ACTIONS.EDIT,
            specialtyId: specialty.id,
            previewImgURL: specialty.image
        })
       
    }

    render() {

        return (
            <>
                <div className='manage-specialty-container'>
                    <div className='manage-specialty-title'><FormattedMessage id="admin.manage-specialty.title"></FormattedMessage></div>
                    <div className='add-new-specialty row'>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id="admin.manage-specialty.name"></FormattedMessage></label>
                            <input className='form-control' type='text' value={this.state.name}
                                onChange={(event) => this.handleOnChangeInput(event, 'name')}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id="admin.manage-specialty.image"></FormattedMessage></label>
                            <div className='preview-img-container'>
                                <input id='previewImg' type='file' hidden
                                    onChange={(event) => this.handleOnchangeImage(event)}
                                />
                                <label className='label-upload' htmlFor='previewImg'><FormattedMessage id="admin.manage-specialty.uploadimage"></FormattedMessage> <i className="fas fa-upload"></i>
                                    </label>
                                    <div className='preview-image'
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => this.openPreviewImage()}
                                    >
                                    </div>
                            </div>
                            
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
                            <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn-save-specialty'}
                                onClick={() => this.handleSaveNewSpecialty()}
                            ><FormattedMessage id="admin.manage-specialty.btn-save"></FormattedMessage></button>
                        </div>
                        <div className='col-12 mb-5'>
                            <TableManageSpecialty
                                handleEditSpecialtyFromParentKey={this.handleEditSpecialtyFromParent}
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
        listSpecialty: state.admin.allSpecialty
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchSpecialtyRedux: () => dispatch(actions.fetchAllSpecialtyStart()),
        editSpecialtyRedux: (data) => dispatch(actions.editSpecialty(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
