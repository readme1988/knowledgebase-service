package io.choerodon.kb.api.controller.v1;

import io.choerodon.core.annotation.Permission;
import io.choerodon.core.enums.ResourceType;
import io.choerodon.core.iam.InitRoleCode;
import io.choerodon.kb.api.vo.PageAttachmentVO;
import io.choerodon.kb.app.service.PageAttachmentService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * Created by Zenger on 2019/4/30.
 */
@RestController
@RequestMapping(value = "/v1/projects/{project_id}/page_attachment")
public class PageAttachmentProjectController {

    private PageAttachmentService pageAttachmentService;

    public PageAttachmentProjectController(PageAttachmentService pageAttachmentService) {
        this.pageAttachmentService = pageAttachmentService;
    }

    @Permission(type = ResourceType.PROJECT, roles = {InitRoleCode.PROJECT_MEMBER, InitRoleCode.PROJECT_OWNER})
    @ApiOperation("页面上传附件")
    @PostMapping
    public ResponseEntity<List<PageAttachmentVO>> create(@ApiParam(value = "项目ID", required = true)
                                                         @PathVariable(value = "project_id") Long projectId,
                                                         @ApiParam(value = "组织id", required = true)
                                                         @RequestParam Long organizationId,
                                                         @ApiParam(value = "页面ID", required = true)
                                                         @RequestParam Long pageId,
                                                         HttpServletRequest request) {
        return new ResponseEntity<>(pageAttachmentService.create(organizationId, projectId, pageId, ((MultipartHttpServletRequest) request).getFiles("file")), HttpStatus.CREATED);
    }

    @Permission(type = ResourceType.PROJECT, roles = {InitRoleCode.PROJECT_MEMBER, InitRoleCode.PROJECT_OWNER})
    @ApiOperation(value = "查询页面附件")
    @GetMapping(value = "/list")
    public ResponseEntity<List<PageAttachmentVO>> queryByList(
            @ApiParam(value = "项目ID", required = true)
            @PathVariable(value = "project_id") Long projectId,
            @ApiParam(value = "组织id", required = true)
            @RequestParam Long organizationId,
            @ApiParam(value = "页面id", required = true)
            @RequestParam Long pageId) {
        return new ResponseEntity<>(pageAttachmentService.queryByList(organizationId, projectId, pageId), HttpStatus.OK);
    }

    @Permission(type = ResourceType.PROJECT, roles = {InitRoleCode.PROJECT_MEMBER, InitRoleCode.PROJECT_OWNER})
    @ApiOperation("页面删除附件")
    @DeleteMapping(value = "/{id}")
    public ResponseEntity delete(@ApiParam(value = "项目ID", required = true)
                                 @PathVariable(value = "project_id") Long projectId,
                                 @ApiParam(value = "组织id", required = true)
                                 @RequestParam Long organizationId,
                                 @ApiParam(value = "附件ID", required = true)
                                 @PathVariable Long id) {
        pageAttachmentService.delete(organizationId, projectId, id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Permission(type = ResourceType.PROJECT, roles = {InitRoleCode.PROJECT_MEMBER, InitRoleCode.PROJECT_OWNER})
    @ApiOperation("页面批量删除附件")
    @PostMapping(value = "/batch_delete")
    public ResponseEntity batchDelete(@ApiParam(value = "项目ID", required = true)
                                      @PathVariable(value = "project_id") Long projectId,
                                      @ApiParam(value = "组织id", required = true)
                                      @RequestParam Long organizationId,
                                      @ApiParam(value = "附件ID", required = true)
                                      @RequestBody List<Long> ids) {
        pageAttachmentService.batchDelete(organizationId, projectId, ids);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Permission(type = ResourceType.PROJECT, roles = {InitRoleCode.PROJECT_MEMBER, InitRoleCode.PROJECT_OWNER})
    @ApiOperation("上传附件，直接返回地址")
    @PostMapping(value = "/upload_for_address")
    public ResponseEntity<List<String>> uploadForAddress(@ApiParam(value = "项目ID", required = true)
                                                         @PathVariable(value = "project_id") Long projectId,
                                                         HttpServletRequest request) {
        return new ResponseEntity<>(pageAttachmentService.uploadForAddress(
                ((MultipartHttpServletRequest) request).getFiles("file")), HttpStatus.CREATED);
    }

    @Permission(type = ResourceType.PROJECT, roles = {InitRoleCode.PROJECT_MEMBER, InitRoleCode.PROJECT_OWNER})
    @ApiOperation("根据文件名获取附件地址，用于编辑文档中快捷找到附件地址")
    @GetMapping(value = "/query_by_file_name")
    public ResponseEntity<PageAttachmentVO> queryByFileName(@ApiParam(value = "项目ID", required = true)
                                                            @PathVariable(value = "project_id") Long projectId,
                                                            @ApiParam(value = "组织id", required = true)
                                                            @RequestParam Long organizationId,
                                                            @ApiParam(value = "文件名", required = true)
                                                            @RequestParam String fileName) {
        return new ResponseEntity<>(pageAttachmentService.queryByFileName(organizationId, projectId, fileName), HttpStatus.OK);
    }
}
