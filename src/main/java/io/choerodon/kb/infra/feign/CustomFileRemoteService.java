package io.choerodon.kb.infra.feign;

import io.choerodon.kb.infra.feign.fallback.CustomFileRemoteServiceFallback;
import org.hzero.common.HZeroService;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

/**
 * @author superlee
 * @since 2020-05-22
 */
@FeignClient(
        value = "choerodon-file",
        fallback = CustomFileRemoteServiceFallback.class
)
public interface CustomFileRemoteService {

    @PostMapping({"/choerodon/v1/{organizationId}/delete-by-url"})
    ResponseEntity deleteFileByUrl(@PathVariable("organizationId") Long organizationId,
                                   @RequestParam("bucketName") String bucketName,
                                   @RequestBody List<String> urls);
}
