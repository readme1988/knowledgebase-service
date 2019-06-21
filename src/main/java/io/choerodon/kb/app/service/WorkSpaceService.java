package io.choerodon.kb.app.service;

import io.choerodon.kb.api.dao.MoveWorkSpaceDTO;
import io.choerodon.kb.api.dao.PageCreateDTO;
import io.choerodon.kb.api.dao.PageDTO;
import io.choerodon.kb.api.dao.PageUpdateDTO;

import java.util.Map;

/**
 * Created by Zenger on 2019/4/30.
 */
public interface WorkSpaceService {

    PageDTO create(Long resourceId, PageCreateDTO pageCreateDTO, String type);

    PageDTO queryDetail(Long id);

    PageDTO update(Long resourceId, Long id, PageUpdateDTO pageUpdateDTO, String type);

    void delete(Long resourceId, Long id, String type, Boolean isAdmin);

    void moveWorkSpace(Long resourceId, Long id, MoveWorkSpaceDTO moveWorkSpaceDTO, String type);

    Map<String, Object> queryAllTree(Long resourceId, Long expandWorkSpaceId, String type);
}
