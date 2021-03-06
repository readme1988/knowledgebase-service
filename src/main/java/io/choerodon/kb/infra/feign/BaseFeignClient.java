package io.choerodon.kb.infra.feign;

import io.choerodon.kb.infra.feign.fallback.BaseFeignClientFallback;
import io.choerodon.kb.infra.feign.vo.OrganizationDTO;
import io.choerodon.kb.infra.feign.vo.UserDO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Zenger on 2019/4/30.
 */
@FeignClient(value = "base-service", fallback = BaseFeignClientFallback.class)
public interface BaseFeignClient {

    @PostMapping(value = "/v1/users/ids")
    ResponseEntity<List<UserDO>> listUsersByIds(@RequestBody Long[] ids,
                                                @RequestParam(name = "only_enabled") Boolean onlyEnabled);

    /**
     * 查询用户所在组织列表，根据into字段判断能否进入
     *
     * @param userId
     * @return
     */
    @GetMapping(value = "/v1/users/{user_id}/organizations")
    ResponseEntity<List<OrganizationDTO>> listOrganizationByUserId(@PathVariable(name = "user_id") Long userId);
}

