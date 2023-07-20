import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import './ManageHandbook.scss';
import { CommonUtils, CRUD_ACTIONS } from '../../../utils';
import { creatNewHandbook } from '../../../services/userService';
import { toast } from 'react-toastify';
import TableManageHandbook from './TableManageHandbook';
import * as actions from '../../../store/actions/index';
import Lightbox from 'react-image-lightbox';

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageHandbook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            author: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            action: '',
            handbookId: '',
            previewImgURL: '',
            isOpen: false
        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listHandbook !== this.props.listHandbook) {
            this.setState({
                name: '',
                author: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL: ''
            })
        }

    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html,
        })
    }

    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
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

    handleSaveNewHandbook = async () => {
        let { action } = this.state;
        let res = await creatNewHandbook(this.state)
        if (action === CRUD_ACTIONS.CREATE) {
            if (res && res.errCode === 0) {
                toast.success("Add new handbook succeed!");
            } else {
                toast.error("Add new handbook failed!");
                console.log('check res:', res);
            }
            this.props.fetchHandbookRedux();
        }
       
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editHandbookRedux({
                id: this.state.handbookId,
                author: this.state.author,
                name: this.state.name,
                imageBase64: this.state.imageBase64,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown,
            })
        }
    }

    handleEditHandbookFromParent = (handbook) => {
        this.setState({
            handbookId: handbook.id,
            name: handbook.name,
            imageBase64:'',
            author: handbook.author,
            descriptionHTML: handbook.descriptionHTML,
            descriptionMarkdown: handbook.descriptionMarkdown,
            action: CRUD_ACTIONS.EDIT,
            previewImgURL: handbook.image
        })
       
    }


    render() {

        return (
            <>
                <div className='manage-handbook-container'>
                    <div className='manage-handbook-title'><FormattedMessage id="admin.manage-handbook.title"></FormattedMessage></div>
                    <div className='add-new-handbook row'>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id="admin.manage-handbook.name"></FormattedMessage></label>
                            <input className='form-control' type='text' value={this.state.name}
                                onChange={(event) => this.handleOnChangeInput(event, 'name')}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id="admin.manage-handbook.image"></FormattedMessage></label>
                            <div className='preview-img-container'>
                                <input id='previewImg' type='file' hidden
                                    onChange={(event) => this.handleOnchangeImage(event)}
                                />
                                <label className='label-upload' htmlFor='previewImg'><FormattedMessage id="admin.manage-handbook.uploadimage"></FormattedMessage> <i className="fas fa-upload"></i>
                                    </label>
                                    <div className='preview-image'
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => this.openPreviewImage()}
                                    >
                                    </div>
                            </div>
                        </div>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id="admin.manage-handbook.author-name"></FormattedMessage></label>
                            <input className='form-control' type='text' value={this.state.author}
                                onChange={(event) => this.handleOnChangeInput(event, 'author')}
                            />
                        </div>
                        <div className='col-12'>
                            <MdEditor
                                style={{ height: '300px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.descriptionMarkdown}
                            />
                        </div>
                        <div className='col-12'>
                            <button className='btn-save-handbook'
                                onClick={() => this.handleSaveNewHandbook()}
                            ><FormattedMessage id="admin.manage-handbook.btn-save"></FormattedMessage></button>
                        </div>
                        <div className='col-12'>
                            <TableManageHandbook
                                handleEditHandbookFromParentKey={this.handleEditHandbookFromParent}
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
        listHandbook: state.admin.allHandbook
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchHandbookRedux: () => dispatch(actions.fetchAllHandbookStart()),
        editHandbookRedux: (data) => dispatch(actions.editHandbook(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageHandbook);
