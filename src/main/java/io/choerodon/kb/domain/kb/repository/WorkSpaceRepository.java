package io.choerodon.kb.domain.kb.repository;

import java.util.List;

import io.choerodon.kb.infra.dataobject.PageDetailDO;
import io.choerodon.kb.infra.dataobject.WorkSpaceDO;

/**
 * Created by Zenger on 2019/4/29.
 */
public interface WorkSpaceRepository {

    WorkSpaceDO inset(WorkSpaceDO workSpaceDO);

    WorkSpaceDO update(WorkSpaceDO WorkSpaceDO);

    List<WorkSpaceDO> workSpaceListByParentIds(Long resourceId, List<Long> parentIds, String type);

    List<WorkSpaceDO> workSpaceListByParentId(Long resourceId, Long parentId, String type);

    void updateByRoute(String type, Long resourceId, String odlRoute, String newRoute);

    Boolean hasChildWorkSpace(String type, Long resourceId, Long parentId);

    String queryMaxRank(String type, Long resourceId, Long parentId);

    String queryMinRank(String type, Long resourceId, Long parentId);

    String queryRank(String type, Long resourceId, Long id);

    String queryLeftRank(String type, Long resourceId, Long parentId, String rightRank);

    String queryRightRank(String type, Long resourceId, Long parentId, String leftRank);

    WorkSpaceDO selectById(Long id);

    PageDetailDO queryDetail(Long id);

    PageDetailDO queryReferenceDetail(Long id);

    void deleteByRoute(String route);
}