package io.choerodon.kb.infra.persistence.impl;

import org.springframework.stereotype.Service;

import io.choerodon.core.exception.CommonException;
import io.choerodon.kb.domain.kb.repository.PageRepository;
import io.choerodon.kb.infra.dataobject.PageDO;
import io.choerodon.kb.infra.mapper.PageMapper;

/**
 * Created by Zenger on 2019/4/29.
 */
@Service
public class PageRepositoryImpl implements PageRepository {

    private PageMapper pageMapper;

    public PageRepositoryImpl(PageMapper pageMapper) {
        this.pageMapper = pageMapper;
    }

    @Override
    public PageDO selectById(Long id) {
        return pageMapper.selectByPrimaryKey(id);
    }

    @Override
    public PageDO insert(PageDO pageDO) {
        if (pageMapper.insert(pageDO) != 1) {
            throw new CommonException("error.page.insert");
        }
        return pageMapper.selectByPrimaryKey(pageDO.getId());
    }

    @Override
    public PageDO update(PageDO pageDO) {
        if (pageMapper.updateByPrimaryKey(pageDO) != 1) {
            throw new CommonException("error.page.update");
        }
        return pageMapper.selectByPrimaryKey(pageDO.getId());
    }

    @Override
    public void delete(Long id) {
        if (pageMapper.deleteByPrimaryKey(id) != 1) {
            throw new CommonException("error.page.delete");
        }
    }
}
