package io.choerodon.kb.api.controller.v1;

import com.github.pagehelper.PageInfo;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.choerodon.core.annotation.Permission;
import io.choerodon.core.enums.ResourceType;
import io.choerodon.core.iam.InitRoleCode;
import io.choerodon.kb.api.vo.RecycleVO;
import io.choerodon.kb.api.vo.SearchDTO;
import io.choerodon.kb.app.service.RecycleService;

/**
 * @author: 25499
 * @date: 2020/1/3 10:23
 * @description:
 */
@RestController
@RequestMapping(value = "/v1/organizations/{organization_id}/recycle")
public class RecycleOrganizationController {
    @Autowired
    private RecycleService recycleService;


    @Permission(type = ResourceType.ORGANIZATION, roles = {InitRoleCode.ORGANIZATION_ADMINISTRATOR, InitRoleCode.ORGANIZATION_MEMBER})
    @ApiOperation(value = "分页查询回收站")
    @PostMapping(value = "/page_by_options")
    public ResponseEntity<PageInfo<RecycleVO>> pageByOptions(@ApiParam(value = "组织Id", required = true)
                                                             @PathVariable(value = "organization_id") Long organizationId,
                                                             @SortDefault Pageable pageable,
                                                             @RequestBody(required = false) SearchDTO searchDTO
                                                             ) {
        return new ResponseEntity<>(recycleService.pageList(null,organizationId, pageable, searchDTO), HttpStatus.OK);
    }

    @Permission(type = ResourceType.ORGANIZATION, roles = {InitRoleCode.ORGANIZATION_ADMINISTRATOR, InitRoleCode.ORGANIZATION_MEMBER})
    @ApiOperation(value = "从回收站还原工作空间及页面（管理员权限）")
    @PutMapping(value = "/restore/{id}")
    public ResponseEntity restoreWorkSpaceAndPage(@ApiParam(value = "组织id", required = true)
                                                  @PathVariable(value = "organization_id") Long organizationId,
                                                  @ApiParam(value = "类型", required = true)
                                                  @RequestParam String type,
                                                  @PathVariable(value = "id") Long id) {
        recycleService.restoreWorkSpaceAndPage(organizationId, null, type,id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Permission(type = ResourceType.ORGANIZATION, roles = {InitRoleCode.ORGANIZATION_ADMINISTRATOR, InitRoleCode.ORGANIZATION_MEMBER})
    @ApiOperation(value = "从回收站彻底删除工作空间及页面（管理员权限）")
    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity deleteWorkSpaceAndPage(@ApiParam(value = "组织id", required = true)
                                                 @PathVariable(value = "organization_id") Long organizationId,
                                                 @ApiParam(value = "类型", required = true)
                                                 @RequestParam String type,
                                                 @PathVariable(value = "id") Long id) {
        recycleService.deleteWorkSpaceAndPage(organizationId, null, type,id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
