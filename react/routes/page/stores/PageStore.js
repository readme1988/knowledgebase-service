import axios from 'axios';
import { observable, action, computed, toJS } from 'mobx';
import { store, Choerodon } from '@choerodon/boot';
import FileSaver from 'file-saver';

const FileUploadTimeout = 300000;

@store('PageStore')
class PageStore {
  @observable apiGetway = '';

  @observable orgId = '';

  @action initCurrentMenuType(data) {
    const { type, id, organizationId } = data;
    this.apiGetway = `/knowledge/v1/${type}s/${id}`;
    this.orgId = organizationId;
  }

  // 空间数据
  @observable workSpace = {};

  @action setWorkSpace(data) {
    this.workSpace = data;
  }

  @action setWorkSpaceByCode(code, data) {
    this.workSpace = {
      ...this.workSpace,
      [code]: {
        ...this.workSpace[code],
        data,
      },
    };
  }

  @computed get getWorkSpace() {
    return toJS(this.workSpace);
  }

  // 空间code
  @observable spaceCode = false;

  @computed get getSpaceCode() {
    return this.spaceCode;
  }

  @action setSpaceCode(data) {
    this.spaceCode = data;
  }

  @action setSpaceCodeBySpaceId(spaceId) {
    let flag = false;
    if (this.workSpace) {
      Object.keys(this.workSpace).forEach((key) => {
        if (!flag && this.workSpace[key].data && this.workSpace[key].data.items[spaceId]) {
          flag = true;
          this.spaceCode = key;
        }
      });
    }
  }

  @computed get getCurrentSpace() {
    return this.workSpaceMap[this.spaceCode];
  }

  @action setCurrentSpace(data) {
    this.workSpaceMap = {
      ...this.workSpaceMap,
      [this.spaceCode]: data,
    };
  }

  // 当前选中空间
  @observable selectId = false;

  @action setSelectId(data) {
    this.selectId = data;
  }

  @computed get getSelectId() {
    return toJS(this.selectId);
  }

  // 当前选中空间
  @observable mode = 'view';

  @action setMode(data) {
    this.mode = data;
  }

  @computed get getMode() {
    return toJS(this.mode);
  }

  // 文档
  @observable doc = false;

  // 设置文档、附件、评论及空间code
  @action setDoc(data) {
    if (data) {
      const spaceId = data.workSpace.id;
      let flag = false;
      if (this.workSpace) {
        Object.keys(this.workSpace).forEach((key) => {
          if (!flag && this.workSpace[key].data && this.workSpace[key].data.items[spaceId]) {
            flag = true;
            this.spaceCode = key;
          }
        });
      }
      this.doc = data;
      this.fileList = data.pageAttachments;
      this.commentList = data.pageComments;
    } else {
      this.doc = false;
      this.fileList = [];
      this.commentList = [];
    }
  }

  @computed get getDoc() {
    return toJS(this.doc);
  }

  // 附件
  @observable fileList = [];

  @action setFileList(data) {
    this.fileList = data;
  }

  @action setFileListByUid(uid, file) {
    this.fileList = [
      {
        ...file[0],
        uid,
      },
      ...this.fileList.filter((item) => (!item.uid || item.uid !== uid)),
    ];
  }

  @computed get getFileList() {
    return toJS(this.fileList);
  }

  // 评论
  @observable commentList = [];

  @action setCommentList(data) {
    this.commentList = data;
  }

  @computed get getCommentList() {
    return toJS(this.commentList);
  }

  // 日志
  @observable log = [];

  @action setLog(data) {
    this.log = data;
  }

  @computed get getLog() {
    return toJS(this.log);
  }

  // 版本
  @observable version = [];

  @action setVersion(data) {
    this.version = data;
  }

  @computed get getVersion() {
    return toJS(this.version);
  }

  // 某个版本的文档
  @observable docVersion = {};

  @action setDocVersion(data) {
    this.docVersion = data;
  }

  @computed get getDocVersion() {
    return toJS(this.docVersion);
  }

  // 版本比较结果
  @observable docCompare = {};

  @action setDocCompare(data) {
    this.docCompare = data;
  }

  @computed get getDocCompare() {
    return toJS(this.docCompare);
  }

  // 分享配置
  @observable share = {};

  @action setShare(data) {
    this.share = data;
  }

  @computed get getShare() {
    return toJS(this.share);
  }

  // 空间
  @observable shareWorkSpace = {
    rootId: -1,
    items: {},
  };

  @action setShareWorkSpace(data) {
    this.shareWorkSpace = data;
  }

  @computed get getShareWorkSpace() {
    return toJS(this.shareWorkSpace);
  }

  // 分享文档
  @observable shareDoc = false;

  @action setShareDoc(data) {
    this.shareDoc = data;
  }

  @computed get getShareDoc() {
    return toJS(this.shareDoc);
  }

  // 分享附件
  @observable shareAttachment = [];

  @action setShareAttachment(data) {
    this.shareAttachment = data;
  }

  @computed get getShareAttachment() {
    return toJS(this.shareAttachment);
  }

  // 文档移动树形结构
  @observable moveTree = [];

  @action setMoveTree(data) {
    this.moveTree = data;
  }

  @computed get getMoveTree() {
    return toJS(this.moveTree);
  }

  // 搜索结果
  @observable searchList = [];

  @action setSearchList(data) {
    this.searchList = data;
  }

  @computed get getSearchList() {
    return this.searchList;
  }

  @observable catalogVisible = false;

  @action setCatalogVisible(data) {
    this.catalogVisible = data;
  }

  @computed get getCatalogVisible() {
    return this.catalogVisible;
  }

  @observable searchVisible = false;

  @action setSearchVisible(data) {
    this.searchVisible = data;
  }

  @computed get getSearchVisible() {
    return this.searchVisible;
  }

  // Modal弹窗控制

  // 分享Modal
  @observable shareVisible = false;

  @action setShareVisible(data) {
    this.shareVisible = data;
  }

  @computed get getShareVisible() {
    return this.shareVisible;
  }

  // 导入Modal
  @observable importVisible = false;

  @action setImportVisible(data) {
    this.importVisible = data;
  }

  @computed get getImportVisible() {
    return this.importVisible;
  }

  // 移动Modal
  @observable moveVisible = false;

  @action setMoveVisible(data) {
    this.moveVisible = data;
  }

  @computed get getMoveVisible() {
    return this.moveVisible;
  }

  // 草稿Modal
  @observable draftVisible = false;

  @action setDraftVisible(data) {
    this.draftVisible = data;
  }

  @computed get getDraftVisible() {
    return this.draftVisible;
  }

  // ----- import -----
  // title
  @observable importTitle = false;

  @action setImportTitle(data) {
    this.importTitle = data;
  }

  @computed get getImportTitle() {
    return this.importTitle;
  }

  // doc
  @observable importDoc = false;

  @action setImportDoc(data) {
    this.importDoc = data;
  }

  @computed get getImportDoc() {
    return this.importDoc;
  }

  // workSpaceSelect
  @observable importWorkSpace = false;

  @action setImportWorkSpace(data) {
    this.importWorkSpace = data;
  }

  @computed get getImportWorkSpace() {
    return this.importWorkSpace;
  }

  // import Mode
  @observable importMode = false;

  @action setImportMode(data) {
    this.importMode = data;
  }

  @computed get getImportMode() {
    return this.importMode;
  }

  // fullScreen
  @observable fullScreen = false;

  @action setFullScreen(data) {
    this.fullScreen = data;
  }

  @computed get getFullScreen() {
    return this.fullScreen;
  }

  /**
   * 加载可选空间
   */
  loadWorkSpaceSelect = (type) => axios.get(`${this.apiGetway}/work_space/all_tree?organizationId=${this.orgId}`).then((res) => {
    if (res && !res.failed) {
      if (type && res[type] && res[type].data) {
        this.setImportWorkSpace(res[type].data);
      } else {
        this.setImportWorkSpace(false);
      }
    }
  }).catch((e) => {
    Choerodon.prompt('加载失败！');
  });


  /**
   * 加载完整空间
   * @param id 默认展开文档id
   * @param type 显示类型
   */
  loadWorkSpaceAll = (id, type) => axios.get(`${this.apiGetway}/work_space/all_tree?organizationId=${this.orgId}${id ? `&expandWorkSpaceId=${id}` : ''}`).then((res) => {
    if (res && !res.failed) {
      if (type && res[type]) {
        this.setWorkSpace({
          [type]: res[type],
        });
      } else {
        this.setWorkSpace(res);
      }
    }
    return res;
  }).catch((e) => {
    Choerodon.prompt('加载失败！');
  });

  /**
   * 创建空间
   * @param vo
   */
  createWorkSpace = (vo) => axios.post(`${this.apiGetway}/work_space?organizationId=${this.orgId}`, vo).then((res) => {
    if (res && !res.failed) {
      return res;
    } else {
      Choerodon.prompt(res.message);
      return false;
    }
  }).catch(() => {
    Choerodon.prompt('创建失败！');
    return false;
  });

  /**
   * 创建文档
   * @param vo
   */
  createDoc = (vo) => axios.post(`${this.apiGetway}/page?organizationId=${this.orgId}`, vo).then((res) => {
    if (res && !res.failed) {
      return res;
    } else {
      Choerodon.prompt(res.message);
      return false;
    }
  }).catch(() => {
    Choerodon.prompt('创建失败！');
    return false;
  });

  /**
   * 加载文档
   * @param id
   * @param searchValue
   */
  loadDoc = (id, searchValue) => axios.get(`${this.apiGetway}/work_space/${id}?organizationId=${this.orgId}${searchValue ? `&searchStr=${searchValue}` : ''}`).then((res) => {
    if (res && !res.failed) {
      this.setDoc(res);
      if (res.hasDraft) {
        this.setDraftVisible(true);
      } else {
        this.setDraftVisible(false);
      }
    }
    return res;
  }).catch((e) => {
    Choerodon.prompt('加载知识文档失败！');
  });

  /**
   * 编辑文档
   * @param id
   * @param doc
   */
  editDoc = (id, doc, searchText) => axios.put(`${this.apiGetway}/work_space/${id}?organizationId=${this.orgId}${searchText ? `&searchStr=${searchText}` : ''}`, doc).then((res) => {
    if (res && !res.failed) {
      this.setDraftVisible(false);
      this.setDoc(res);
      if (doc.title) {
        const spaceData = this.workSpace[this.spaceCode].data;
        const newWorkSpace = {
          ...spaceData,
          items: {
            ...spaceData.items,
            [id]: {
              ...spaceData.items[id],
              data: {
                title: doc.title,
              },
            },
          },
        };
        this.setWorkSpaceByCode(this.spaceCode, newWorkSpace);
      }
      Choerodon.prompt('保存成功！');
    }
  }).catch((e) => {
    Choerodon.prompt('保存失败！');
  });

  /**
   * 自动保存
   * @param id
   * @param doc
   */
  autoSaveDoc = (id, doc) => {
    axios.put(`${this.apiGetway}/page/auto_save?organizationId=${this.orgId}&pageId=${id}`, doc).then((res) => {
      this.setDraftVisible(true);
      Choerodon.prompt('自动保存成功！');
    }).catch(() => {
      Choerodon.prompt('自动保存失败！');
    });
  };

  /**
   * 加载草稿文档
   * @param id
   */
  loadDraftDoc = (id) => axios.get(`${this.apiGetway}/page/draft_page?organizationId=${this.orgId}&pageId=${id}`).then((res) => {
    if (res && !res.failed) {
      this.setDoc({
        ...this.doc,
        pageInfo: {
          ...this.doc.pageInfo,
          content: String(res),
        },
      });
      this.setDraftVisible(true);
    }
    return res;
  }).catch(() => {
    Choerodon.prompt('加载知识文档失败！');
  });

  /**
   * 删除草稿
   * @param id
   */
  deleteDraftDoc = (id) => axios.delete(`${this.apiGetway}/page/delete_draft?organizationId=${this.orgId}&pageId=${id}`).then(() => {
    this.setDraftVisible(false);
  });

  /**
   * 创建者删除文档，后端进行创建人校验
   * @param id
   */
  deleteDoc = (id) => axios.delete(`${this.apiGetway}/work_space/delete_my/${id}?organizationId=${this.orgId}`);

  /**
   * 管理员删除文档，后端进行权限校验
   * @param id
   */
  adminDeleteDoc = (id) => axios.delete(`${this.apiGetway}/work_space/${id}?organizationId=${this.orgId}`);

  /**
   * 移动空间
   * @param id 移动到空间id
   * @param vo
   */
  moveWorkSpace = (id, vo) => axios.post(`${this.apiGetway}/work_space/to_move/${id}?organizationId=${this.orgId}`, vo).then((res) => {
    if (res && res.failed) {
      Choerodon.prompt(res.message);
    }
  }).catch(() => {
    Choerodon.prompt('移动失败！');
    return false;
  });

  /**
   * 设置默认编辑模式
   * @param vo 评论
   */
  editDefaultMode = (vo) => axios.post(`${this.apiGetway}/user_setting?organizationId=${this.orgId}`, vo);

  /**
   * 创建评论
   * @param vo 评论
   */
  createComment = (vo) => axios.post(`${this.apiGetway}/page_comment?organizationId=${this.orgId}`, vo).then((res) => {
    if (res && res.failed) {
      Choerodon.prompt(res.message);
    } else {
      this.setCommentList([
        res,
        ...this.commentList,
      ]);
    }
  }).catch(() => {
    Choerodon.prompt('评论失败！');
    return false;
  });

  /**
   * 编辑评论
   * @param id
   * @param vo
   */
  editComment = (id, vo) => axios.put(`${this.apiGetway}/page_comment/${id}?organizationId=${this.orgId}`, vo).then((res) => {
    this.setCommentList([
      res,
      ...this.commentList.filter((c) => c.id !== res.id),
    ]);
  }).catch(() => {
    Choerodon.prompt('加载评论失败！');
  });

  /**
   * 删除评论
   * @param id
   */
  deleteComment = (id) => axios.delete(`${this.apiGetway}/page_comment/delete_my/${id}?organizationId=${this.orgId}`).then((res) => {
    this.setCommentList([
      ...this.commentList.filter((c) => c.id !== id),
    ]);
  }).catch(() => {
    Choerodon.prompt('删除评论失败！');
  });

  /**
   * admin删除评论，校验权限
   * @param id
   */
  adminDeleteComment = (id) => axios.delete(`${this.apiGetway}/page_comment/${id}?organizationId=${this.orgId}`).then((res) => {
    this.setCommentList([
      ...this.commentList.filter((c) => c.id !== id),
    ]);
  }).catch(() => {
    Choerodon.prompt('删除评论失败！');
  });

  /**
   * 加载附件
   * @param id
   */
  loadAttachment = (id) => axios.get(`${this.apiGetway}/page_attachment/list?pageId=${id}&organizationId=${this.orgId}`).then((res) => {
    this.setAttachment(res.map((file) => ({
      ...file,
      uid: file.id,
    })));
  }).catch(() => {
    Choerodon.prompt('加载附件失败！');
  });

  /**
   * 上传附件
   * @param data
   * @param config
   */
  uploadFile = (data, config) => {
    const {
      pageId, versionId,
    } = config;
    const axiosConfig = {
      headers: { 'content-type': 'multipart/form-data' },
      timeout: FileUploadTimeout,
    };
    if (data.get('file')) {
      return axios.post(
        `${this.apiGetway}/page_attachment?pageId=${pageId}&versionId=${versionId}&organizationId=${this.orgId}`,
        data,
        axiosConfig,
      ).then((res) => {
        this.setFileListByUid(config.uid, res);
        Choerodon.prompt('附件上传成功！');
      });
    }
  };

  /**
   * 删除附件
   * @param id
   */
  deleteFile = (id) => {
    axios.delete(`${this.apiGetway}/page_attachment/${id}?organizationId=${this.orgId}`).then((res) => {
      if (res && res.failed) {
        Choerodon.prompt('删除失败');
      } else {
        this.setFileList(this.fileList.filter((file) => file.id !== id));
        Choerodon.prompt('删除成功');
      }
    }).catch(() => {
      Choerodon.prompt('删除失败，请稍后重试');
    });
  };

  /**
   * 批量删除附件
   * @param list
   */
  batchDeleteFile = (list) => axios.post(`${this.apiGetway}/page_attachment/batch_delete?organizationId=${this.orgId}`, list).then((res) => {
    if (res && res.failed) {
      Choerodon.prompt('删除失败，请重试');
    } else {
      this.setFileList(this.fileList.filter((file) => list.indexOf(file.id) === -1));
    }
  }).catch(() => {
    Choerodon.prompt('删除失败，请稍后重试');
  });


  /**
   * 加载日志
   * @param id
   */
  loadLog = (id) => axios.get(`${this.apiGetway}/page_log/${id}?organizationId=${this.orgId}`).then((res) => {
    this.setLog(res);
  }).catch(() => {
    Choerodon.prompt('加载日志失败！');
  });

  /**
   * 加载版本
   * @param id
   */
  loadVersion = (id) => axios.get(`${this.apiGetway}/page_version/list?organizationId=${this.orgId}&pageId=${id}`).then((res) => {
    this.setVersion(res);
  }).catch(() => {
    Choerodon.prompt('加载版本失败！');
  });

  /**
   * 比较版本
   * @param firstVersionId
   * @param secondVersionId
   * @param id
   */
  compareVersion = (firstVersionId, secondVersionId, id) => axios.get(`${this.apiGetway}/page_version/compare?organizationId=${this.orgId}&firstVersionId=${firstVersionId}&secondVersionId=${secondVersionId}&pageId=${id}`).then((res) => {
    if (!res.failed) {
      this.setDocCompare(res);
    } else {
      this.setDocCompare(res);
    }
  }).catch(() => {
    Choerodon.prompt('加载版本失败！');
  });

  /**
   * 回滚
   * @param versionId
   * @param id
   */
  rollbackVersion =
    (versionId, id) => axios.get(`${this.apiGetway}/page_version/rollback?organizationId=${this.orgId}&versionId=${versionId}&pageId=${id}`)
      .catch(() => {
        Choerodon.prompt('回滚版本失败！');
      });

  /**
   * 查看某个版本
   * @param versionId
   * @param id
   */
  loadDocByVersion = (versionId, id) => axios.get(`${this.apiGetway}/page_version/${versionId}?organizationId=${this.orgId}&pageId=${id}`).then((res) => {
    if (!res.failed) {
      this.setDocVersion(res);
    } else {
      this.setDocVersion(res);
    }
  }).catch(() => {
    Choerodon.prompt('加载版本失败！');
  });

  /**
   * 导出pdf
   * @param id
   * @param fileName
   */
  exportPdf = (id, fileName) => axios.get(`${this.apiGetway}/page/export_pdf?pageId=${id}&organizationId=${this.orgId}`, { responseType: 'arraybuffer', headers: { 'Access-Control-Allow-Origin': '*' } }).then((data) => {
    // data为arraybuffer格式，判断已经无效
    if (data && !data.failed) {
      const blob = new Blob([data], { type: 'application/pdf' });
      FileSaver.saveAs(blob, `${fileName}.pdf`);
      Choerodon.prompt('导出成功');
    } else {
      Choerodon.prompt('网络错误，请重试。');
    }
  });

  queryShareMsg = (id) => axios.get(`${this.apiGetway}/work_space_share?work_space_id=${id}&organizationId=${this.orgId}`).then((data) => {
    if (data && !data.failed) {
      this.setShare(data);
    } else {
      Choerodon.prompt('网络错误，请重试。');
    }
  });

  updateShare = (id, spaceId, vo) => axios.put(`${this.apiGetway}/work_space_share/${id}?organizationId=${this.orgId}`, vo).then((res) => {
    if (res && !res.failed) {
      this.setShare(res);
    } else {
      this.queryShareMsg(spaceId);
      Choerodon.prompt('网络错误，请重试。');
    }
  }).catch(() => {
    Choerodon.prompt('修改失败！');
  });

  importWord = (data) => {
    const axiosConfig = {
      headers: { 'content-type': 'multipart/form-data' },
      timeout: FileUploadTimeout,
    };
    return axios.post(`${this.apiGetway}/page/import_word?organizationId=${this.orgId}`, data, axiosConfig);
  };

  /**
   * 分享-查询空间
   * @param token
   */
  getSpaceByToken = token => axios.get(`/knowledge/v1/work_space_share/tree?token=${token}`).then((data) => {
    if (data && !data.failed) {
      this.setShareWorkSpace(data);
    } else {
      Choerodon.prompt('请求失败');
      this.setShareWorkSpace({
        noAccess: true,
      });
    }
  });

  getDocByToken = (id, token) => axios.get(`/knowledge/v1/work_space_share/page?work_space_id=${id}&token=${token}`).then((data) => {
    if (data && !data.failed) {
      this.setShareDoc(data);
    } else {
      Choerodon.prompt('请求失败');
    }
  });

  getAttachmentByToken = (id, token) => axios.get(`/knowledge/v1/work_space_share/page_attachment?page_id=${id}&token=${token}`).then((data) => {
    if (data && !data.failed) {
      this.setAttachment(data.map((file) => ({
        ...file,
        uid: file.id,
      })));
    } else {
      Choerodon.prompt('请求失败');
    }
  });

  exportPdfByToken = (id, fileName, token) => axios.get(`/knowledge/v1/work_space_share/export_pdf?pageId=${id}&token=${token}`, { responseType: 'arraybuffer', headers: { 'Access-Control-Allow-Origin': '*' } }).then((data) => {
    // data为arraybuffer格式，判断已经无效
    if (data && !data.failed) {
      const blob = new Blob([data], { type: 'application/pdf' });
      FileSaver.saveAs(blob, `${fileName}.pdf`);
      Choerodon.prompt('导出成功');
    } else {
      Choerodon.prompt('网络错误，请重试。');
    }
  });

  queryMoveTree = () => axios.get(`${this.apiGetway}/work_space?organizationId=${this.orgId}`).then((data) => {
    if (data && !data.failed) {
      const tree = [{
        children: data,
        id: 0,
        name: '全部',
        route: '',
      }];
      this.setMoveTree(tree);
    } else {
      Choerodon.prompt('请求失败');
    }
  });

  querySearchList = (str) => axios.get(`${this.apiGetway}/page/full_text_search?organizationId=${this.orgId}&searchStr=${str}`).then((data) => {
    if (data && !data.failed) {
      this.setSearchList(data);
    } else {
      Choerodon.prompt('请求失败');
      this.setSearchList([]);
    }
  }).catch(() => {
    Choerodon.prompt('请求失败');
    this.setSearchList([]);
  });

  // 最近活动
  @observable recentUpdate = false;

  @action setRecentUpdate(data) {
    this.recentUpdate = data;
  }

  @computed get getRecentUpdate() {
    return toJS(this.recentUpdate);
  }

  queryRecentUpdate = () => axios.get(`${this.apiGetway}/work_space/recent_update_list?organizationId=${this.orgId}`).then((data) => {
    if (data && !data.failed) {
      this.setRecentUpdate(data);
    } else {
      this.setRecentUpdate(false);
      Choerodon.prompt('请求失败');
    }
  });
}

export default PageStore;
