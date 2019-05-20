package io.choerodon.kb.api.controller.v1;

import io.choerodon.base.annotation.Permission;
import io.choerodon.base.enums.ResourceType;
import io.choerodon.core.iam.InitRoleCode;
import io.choerodon.kb.api.dao.PageVersionDTO;
import io.choerodon.kb.api.dao.PageVersionInfoDTO;
import io.choerodon.kb.app.service.PageVersionService;
import io.choerodon.kb.infra.common.BaseStage;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author shinan.chen
 * @since 2019/5/17
 */
@RestController
@RequestMapping("/v1/organizations/{organization_id}/page_version")
public class PageVersionOrganizationController {

    @Autowired
    private PageVersionService pageVersionService;

    @Permission(type = ResourceType.ORGANIZATION, roles = {InitRoleCode.ORGANIZATION_ADMINISTRATOR, InitRoleCode.ORGANIZATION_MEMBER})
    @ApiOperation(value = "查询页面的版本列表")
    @GetMapping("/list")
    public ResponseEntity<List<PageVersionDTO>> listQuery(@ApiParam(value = "组织id", required = true)
                                                          @PathVariable("organization_id") Long organizationId,
                                                          @ApiParam(value = "页面id", required = true)
                                                          @RequestParam Long pageId) {
        return new ResponseEntity<>(pageVersionService.queryByPageId(organizationId, null, pageId), HttpStatus.OK);
    }

    @Permission(type = ResourceType.PROJECT, roles = {InitRoleCode.PROJECT_OWNER, InitRoleCode.PROJECT_MEMBER})
    @ApiOperation(value = "查询版本内容")
    @GetMapping(value = "/{version_id}")
    public ResponseEntity<PageVersionInfoDTO> queryById(@ApiParam(value = "组织id", required = true)
                                                        @PathVariable("organization_id") Long organizationId,
                                                        @ApiParam(value = "版本id", required = true)
                                                        @PathVariable("version_id") Long versionId,
                                                        @ApiParam(value = "页面id", required = true)
                                                        @RequestParam Long pageId) {
        return new ResponseEntity<>(pageVersionService.queryById(organizationId, null, pageId, versionId), HttpStatus.OK);
    }

}