package io.choerodon.kb.api.controller.v1;

import javax.validation.Valid;
import java.util.List;
import com.github.pagehelper.PageInfo;
import io.choerodon.core.annotation.Permission;
import io.choerodon.core.enums.ResourceType;
import io.choerodon.core.iam.InitRoleCode;
import io.choerodon.kb.api.vo.*;
import io.choerodon.kb.app.service.DocumentTemplateService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * @author zhaotianxin
 * @since 2020/1/2
 */
@RestController
@RequestMapping("/v1/projects/{project_id}/document_template")
public class DocumentTemplateController {
    @Autowired
    private DocumentTemplateService documentTemplateService;

    @Permission(type = ResourceType.PROJECT, roles = {InitRoleCode.PROJECT_OWNER})
    @ApiOperation("创建模板文件")
    @PostMapping(value = "/create")
    public ResponseEntity<DocumentTemplateInfoVO> create(
            @ApiParam(value = "项目ID", required = true)
            @PathVariable(value = "project_id") Long projectId,
            @ApiParam(value = "组织id", required = true)
            @RequestParam Long organizationId,
            @ApiParam(value = "页面信息", required = true)
            @RequestBody @Valid PageCreateWithoutContentVO pageCreateVO){
        return new ResponseEntity<>(documentTemplateService.createTemplate(projectId,organizationId,pageCreateVO), HttpStatus.OK);
    }

    @Permission(type = ResourceType.PROJECT, roles = {InitRoleCode.PROJECT_OWNER})
    @ApiOperation(value = "更新项目下工作空间节点页面")
    @PutMapping(value = "/{id}")
    public ResponseEntity<DocumentTemplateInfoVO> updateWorkSpaceAndPage(@ApiParam(value = "项目id", required = true)
                                                                  @PathVariable(value = "project_id") Long projectId,
                                                                  @ApiParam(value = "组织id", required = true)
                                                                  @RequestParam Long organizationId,
                                                                  @ApiParam(value = "工作空间目录id", required = true)
                                                                  @PathVariable Long id,
                                                                  @ApiParam(value = "应用于全文检索时，对单篇文章，根据检索内容高亮内容")
                                                                  @RequestParam(required = false) String searchStr,
                                                                  @ApiParam(value = "空间信息", required = true)
                                                                  @RequestBody @Valid PageUpdateVO pageUpdateVO) {
        return new ResponseEntity<>(documentTemplateService.updateTemplate(organizationId, projectId, id, searchStr, pageUpdateVO), HttpStatus.CREATED);
    }

    @Permission(type = ResourceType.PROJECT, roles = {InitRoleCode.PROJECT_OWNER,InitRoleCode.PROJECT_MEMBER})
    @ApiOperation(value = "查询模板列表")
    @PostMapping(value = "/template_list")
    public ResponseEntity<PageInfo<DocumentTemplateInfoVO>> listTemplate(@ApiParam(value = "项目id", required = true)
                                                                         @PathVariable(value = "project_id") Long projectId,
                                                                         @ApiParam(value = "组织id", required = true)
                                                                     @RequestParam Long organizationId,
                                                                         @RequestParam Long baseId,
                                                                         @SortDefault Pageable pageable,
                                                                         @RequestBody(required = false) SearchVO searchVO) {
        return new ResponseEntity<>(documentTemplateService.listTemplate(organizationId,projectId,baseId,pageable,searchVO), HttpStatus.OK);
    }
}
